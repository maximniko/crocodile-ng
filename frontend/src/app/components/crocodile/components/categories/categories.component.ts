import {Component} from '@angular/core';
import {AsyncPipe, NgClass} from '@angular/common';
import {CategoriesService} from '../../services/categories/categories.service';
import {TwaService} from '../../../../services/telegram/twa.service';
import {Category} from '../../services/categories/category.interface';

@Component({
  standalone: true,
  template: `
    @for (item of categories.categoriesSubject | async; track item.title; let idx = $index) {
      @let selected = categories.isSelected(item);
      <button class="d-flex btn btn-lg" [ngClass]="{
          'btn-success': selected,
          'btn-secondary': !selected,
      }" (click)="toggle(item)">
        <div class="my-auto">{{ idx + 1 }}</div>
        <div class="m-auto">{{ item.title }}</div>
      </button>
    }
  `,
  host: {class: 'd-flex flex-column gap-1'},
  imports: [NgClass, AsyncPipe]
})
export class CategoriesComponent {

  constructor(
    protected categories: CategoriesService,
    private twa: TwaService,
  ) {
  }

  toggle(item: Category) {
    this.twa.hapticFeedbackImpactOccurred(
      this.categories.isSelected(item) ? "soft" : "heavy"
    )
    this.categories.toggle(item)
  }
}
