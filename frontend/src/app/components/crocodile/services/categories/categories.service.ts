import {Injectable} from '@angular/core';
import {Category} from './category.interface';
import {BehaviorSubject} from 'rxjs';
import {TwaService} from '../../../../services/telegram/twa.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CategoriesService {

  constructor(
    private twa: TwaService,
    private http: HttpClient,
  ) {
    this.loadCategories()
  }

  categoriesSubject = new BehaviorSubject<Category[]>([]);

  private _categories: Category[] = [];
  private _selected: Category[] = [];

  get categories(): Category[] {
    return this._categories
  }

  set categories(newValue: Category[]) {
    this._categories = newValue;
    this.categoriesSubject.next(newValue);
  }

  get selected(): Category[] {
    return this._selected
  }

  set selected(newValue: Category[]) {
    this._selected = newValue;
  }

  loadCategories() {
    const locale = this.twa.getUserLanguageCode() ?? 'en'

    this.http.get<Category[]>(`assets/categories/${locale}.json`)
      .subscribe({
        next: (items: Category[]) => {
          this.categories = items
          this.selected = Array.of<Category>(...items)
        },
        error: (e: HttpErrorResponse) => {
          this.http.get<Category[]>(`assets/categories/ru.json`)
            .subscribe({
                next: (items: Category[]) => {
                  this.categories = items
                  this.selected = Array.of<Category>(...items)
                },
                error: (e) => this.twa.showAlert("Can\'t data for your language"),
                // complete: () => console.info('complete ru')
              },
            )
        },
        // complete: () => console.info(`complete ${locale}`)
      })
  }

  toggle(category: Category) {
    const index = this.selected.indexOf(category)

    if (index == -1) {
      this.selected.push(category)
    } else {
      this.selected.splice(index, 1)
    }
  }

  isSelected(category: Category): boolean {
    return this.selected.find(
      (item: Category) => item.title == category.title
    ) !== undefined;
  }
}
