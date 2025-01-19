import {Injectable} from '@angular/core';
import {CategoriesService} from './categories.service';
import {Category} from './category.interface';

@Injectable({providedIn: 'root'})
export class CategoriesDevService extends CategoriesService {
  // override loadCategories(): void {
  //   of(categories)
  //     .subscribe(items => {
  //       this.categories = Array.of<Category>(...items)
  //       this.selected = Array.of<Category>(...items)
  //     })
  // }
}

const categories: Category[] = [
  {
    title: "title-1",
    words: []
  },
  {
    title: "title-2",
    words: []
  },
  {
    title: "title-3",
    words: []
  },
  {
    title: "title-4",
    words: []
  },
  {
    title: "title-5",
    words: []
  },
  {
    title: "title-6",
    words: []
  },
  {
    title: "title-7",
    words: []
  },
  {
    title: "title-8",
    words: []
  },
  {
    title: "title-9",
    words: []
  },
  {
    title: "title-10",
    words: []
  }
]
