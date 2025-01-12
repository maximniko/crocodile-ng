import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {routeCreator} from '../../crocodile.routes';
import {PlayersService} from '../../services/players/players.service';
import {AsyncPipe, NgClass} from '@angular/common';
import {CategoriesService} from '../../services/categories/categories.service';

@Component({
  standalone: true,
  template: `
    Play
  `,
  host: {class: 'd-flex flex-column gap-5'},
  imports: [RouterLink, NgClass, AsyncPipe]
})
export class GameComponent {
  private state = 0 // 0 - show next player, 1 - do play
  private currentPlayer = 0

  constructor(
    protected playersService: PlayersService,
    protected categoriesService: CategoriesService,
  ) {
  }

  protected readonly routeCreator = routeCreator;
}
