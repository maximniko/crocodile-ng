import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from './category.interface';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class CategoriesService {

  constructor(
    private http: HttpClient
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

  loadCategories(): void {
    this.http.get<Category[]>(`${environment.apiUrl}/categories`)
      .subscribe(categories => this.categories = categories)
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
      (item: Category) => item.id == category.id
    ) !== undefined;
  }
}
