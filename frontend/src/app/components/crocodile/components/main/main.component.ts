import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {routeCreator} from '../../crocodile.routes';
import {PlayersService} from '../../services/players/players.service';
import {AsyncPipe, NgClass} from '@angular/common';
import {CategoriesService} from '../../services/categories/categories.service';
import {TwaService} from '../../../../services/telegram/twa.service';

@Component({
  standalone: true,
  template: `
    @let emptyPlayers = this.emptyPlayers();
    <div class="justify-content-around d-flex" [ngClass]="{
        'alert alert-success text-success': emptyPlayers,
        'text-primary': !emptyPlayers,
    }">
      <div class="d-flex justify-content-center w-100">
        <div class="m-auto">
          Шаг 1
        </div>
      </div>
      <div class="d-flex justify-content-center w-100">
        <a [routerLink]="routeCreator.players()" class="btn btn-lg" [ngClass]="{
        'btn-outline-primary': !emptyPlayers,
        'btn-outline-success': emptyPlayers,
        }">
          Игроки
          @let items = this.playersService.playersSubject | async;
          @if (items?.length) {
            <span class="badge text-bg-primary">{{ items?.length }}</span>
          }
        </a>
      </div>
    </div>
    @let emptySelectedCategories = this.emptySelectedCategories();
    <div class="justify-content-around d-flex flex-row-reverse" [ngClass]="{
        'alert alert-success text-success': emptySelectedCategories,
        'text-primary': !emptySelectedCategories,
    }">
      <div class="d-flex justify-content-center w-100">
        <div class="m-auto">
          Шаг 2
        </div>
      </div>
      <div class="d-flex justify-content-center w-100">
        <a [routerLink]="routeCreator.categories()" class="btn btn-lg" [ngClass]="{
        'btn-outline-primary': !this.emptySelectedCategories(),
        'btn-outline-success': this.emptySelectedCategories(),
        }">
          Категории
          @if (this.categoriesService.selected.length) {
            <span class="badge text-bg-primary">{{ this.categoriesService.selected.length }}</span>
          }
        </a>
      </div>
    </div>
    @let canPlay = !this.emptyPlayers() && !this.emptySelectedCategories();
    <div class="d-flex px-4">
      <a class="btn w-100" [routerLink]="routeCreator.game()" [ngClass]="{
          'disabled btn-outline-secondary': !canPlay,
          'btn-lg btn-outline-success': canPlay,
      }">Play</a>
    </div>
  `,
  host: {class: 'd-flex flex-column gap-5'},
  imports: [RouterLink, NgClass, AsyncPipe]
})
export class MainComponent implements OnInit {
  constructor(
    protected twa: TwaService,
    protected playersService: PlayersService,
    protected categoriesService: CategoriesService,
  ) {
  }

  ngOnInit() {
    this.twa.visibleBackButton(false)
  }

  protected emptyPlayers(): boolean {
    return this.playersService.players.length === 0
  }

  protected emptySelectedCategories(): boolean {
    return this.categoriesService.selected.length === 0
  }

  protected readonly routeCreator = routeCreator;
}
