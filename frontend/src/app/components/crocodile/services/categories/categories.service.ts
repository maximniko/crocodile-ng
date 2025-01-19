import {Injectable} from '@angular/core';
import {Category, CompactCategory} from './category.interface';
import {BehaviorSubject} from 'rxjs';
import {TwaService} from '../../../../services/telegram/twa.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Word} from '../words/word.interface';
import {getRandom} from '../../../../extensions/Array';

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

    this.http.get<CompactCategory[]>(`assets/categories/${locale}.json`)
      .subscribe({
        next: (items: CompactCategory[]) => {
          this.categories = this.toCategories(items)
          this.selected = Array.of<Category>(...this.categories)
        },
        error: (e: HttpErrorResponse) => {
          this.http.get<CompactCategory[]>(`assets/categories/ru.json`)
            .subscribe({
                next: (items: CompactCategory[]) => {
                  this.categories = this.toCategories(items)
                  this.selected = Array.of<Category>(...this.categories)
                  console.log('Inited selected', this.selected)
                },
                error: (e) => this.twa.showAlert("Can\'t data for your language"),
                // complete: () => console.info('complete ru')
              },
            )
        },
        // complete: () => console.info(`complete ${locale}`)
      })
  }

  private toCategories(compactCategories: CompactCategory[]): Category[] {
    return compactCategories.map<Category>((c: CompactCategory) => {
      return {
        title: c.title,
        words: c.words.flatMap<Word>((items: string[], k: number) => {
          return items.map((v: string) => {
              return {
                title: v,
                level: k + 1
              }
            }
          )
        })
      }
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

  getRandomWord(): Word {
    return getRandom(getRandom(this.selected).words)
  }
}
