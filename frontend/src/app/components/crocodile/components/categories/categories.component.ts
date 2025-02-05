import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgClass} from '@angular/common';
import {CategoriesService} from '../../services/categories/categories.service';
import {TwaService} from '../../../../services/telegram/twa.service';
import {Category} from '../../services/categories/category.interface';
import {Router} from '@angular/router';
import {routeCreator} from '../../crocodile.routes';

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
export class CategoriesComponent implements OnInit, OnDestroy {

  constructor(
    protected categories: CategoriesService,
    private twa: TwaService,
    private router: Router,
  ) {
    this.goBack = this.goBack.bind(this)
  }

  ngOnInit(): void {
    this.twa.setMainButton({text: 'Сохранить', is_active: true, is_visible: true}, this.goBack)
    this.twa.backButtonOnClick(this.goBack)
  }

  ngOnDestroy(): void {
    this.twa.offMainButton(this.goBack)
    this.twa.offBackButton(this.goBack, false)
  }

  goBack(): void {
    this.router.navigate([routeCreator.main()])
  }

  toggle(item: Category) {
    this.twa.hapticFeedbackNotificationOccurred(
      this.categories.isSelected(item) ? "success" : "warning"
    )
    this.categories.toggle(item)
  }

}
