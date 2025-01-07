import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgClass} from '@angular/common';
import {CategoriesService} from '../../services/categories/categories.service';

@Component({
  standalone: true,
  template: `
    @for (item of categories.categoriesSubject | async; track item.id; let idx = $index) {
      @let selected = categories.isSelected(item);
      <button class="d-flex btn btn-lg" [ngClass]="{
          'btn-success': selected,
          'btn-secondary': !selected,
      }" (click)="categories.toggle(item)">
        <div class="my-auto">{{ idx + 1 }}</div>
        <div class="m-auto">{{ item.alias }}</div>
      </button>
    }
  `,
  host: {class: 'd-flex flex-column gap-1'},
  imports: [NgClass, AsyncPipe]
})
export class CategoriesComponent implements OnInit, OnDestroy {

  constructor(
    protected categories: CategoriesService
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
