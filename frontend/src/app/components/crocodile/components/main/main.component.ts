import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {routeCreator} from '../../crocodile.routes';
import {PlayersService} from '../../services/players/players.service';
import {AsyncPipe, NgClass} from '@angular/common';
import {CategoriesService} from '../../services/categories/categories.service';
import {TwaService} from '../../../../services/telegram/twa.service';
import {Localisation} from '../../../../services/localisation';

@Component({
  standalone: true,
  template: `
    @let emptyPlayers = this.emptyPlayers();
    <div class="vstack" [ngClass]="{
        'alert alert-success mb-0 text-success': emptyPlayers,
        'text-primary': !emptyPlayers,
    }">
      @if (emptyPlayers) {
        <div class="d-flex justify-content-center">
          <span class="text-center pb-1">{{ l.messages.SelectPlayers ?? 'Select players' }}</span>
        </div>
      }
      <div class="d-flex justify-content-around">
        <div class="d-flex ms-3">
          <div class="m-auto">
            {{ l.messages.Step ?? 'Step' }} 1
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <a [routerLink]="routeCreator.players()" class="btn btn-lg" [ngClass]="{
        'btn-outline-primary': !emptyPlayers,
        'btn-outline-success': emptyPlayers,
        }">
            {{ l.messages.Players ?? 'Players' }}
            @let items = this.playersService.playersSubject | async;
            @if (items?.length) {
              <span class="badge" [ngClass]="{
                'text-bg-success': emptyPlayers,
                'text-bg-primary': !emptyPlayers,
                }">{{ items?.length }}</span>
            }
          </a>
        </div>
      </div>
    </div>
    @let emptySelectedCategories = this.emptySelectedCategories();
    <div class="vstack" [ngClass]="{
        'alert alert-success mb-0 text-success': emptySelectedCategories,
        'text-primary': !emptySelectedCategories,
    }">
      @if (emptySelectedCategories) {
        <div class="d-flex justify-content-center">
          <span class="text-center pb-1">{{ l.messages.ChooseCategories ?? 'Choose categories' }}</span>
        </div>
      }
      <div class="d-flex justify-content-around flex-row-reverse">
        <div class="d-flex me-3">
          <div class="m-auto">
            {{ l.messages.Step ?? 'Step' }} 2
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <a [routerLink]="routeCreator.categories()" class="btn btn-lg" [ngClass]="{
        'btn-outline-primary': !emptySelectedCategories,
        'btn-outline-success': emptySelectedCategories,
        }">
            {{ l.messages.Categories ?? 'Categories' }}
            @if (this.categoriesService.selected.length) {
              <span class="badge" [ngClass]="{
                'text-bg-success': emptySelectedCategories,
                'text-bg-primary': !emptySelectedCategories,
                }">{{ this.categoriesService.selected.length }}</span>
            }
          </a>
        </div>
      </div>
    </div>
    @let canPlay = !this.emptyPlayers() && !this.emptySelectedCategories();
    <div class="d-flex justify-content-center">
      <a class="btn rounded-5 w-75" [routerLink]="routeCreator.game()" [ngClass]="{
          'disabled btn-outline-secondary': !canPlay,
          'btn-lg btn-outline-success': canPlay,
      }">{{ l.messages.Play ?? 'Play' }}</a>
    </div>
  `,
  host: {class: 'd-flex flex-column gap-5'},
  imports: [RouterLink, NgClass, AsyncPipe]
})
export class MainComponent implements OnInit {
  constructor(
    protected twa: TwaService,
    protected l: Localisation,
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
