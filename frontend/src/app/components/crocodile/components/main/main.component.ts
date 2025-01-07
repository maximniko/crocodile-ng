import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {routeCreator} from '../../crocodile.routes';

@Component({
  standalone: true,
  template: `
    <div class="justify-content-around d-flex">
      <div class="d-flex justify-content-center w-100">
        <div class="m-auto">
          Шаг 1
        </div>
      </div>
      <div class="d-flex justify-content-center w-100">
        <a [routerLink]="routeCreator.players()" class="btn btn-outline-secondary">
          Игроки
        </a>
      </div>
    </div>
    <div class="justify-content-around d-flex flex-row-reverse">
      <div class="d-flex justify-content-center w-100">
        <div class="m-auto">
          Шаг 2
        </div>
      </div>
      <div class="d-flex justify-content-center w-100">
        <a [routerLink]="routeCreator.categories()" class="btn btn-outline-secondary">
          Категории
        </a>
      </div>
    </div>
    <a class="btn btn-outline-success">Play</a>
  `,
  host: {class: 'd-flex flex-column gap-5'},
  imports: [
    RouterLink
  ]
})
export class MainComponent {
  protected readonly routeCreator = routeCreator;
}
