import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {routeCreator} from '../../crocodile.routes';
import {PlayersService} from '../../services/players/players.service';
import {AsyncPipe, NgClass} from '@angular/common';
import {CategoriesService} from '../../services/categories/categories.service';
import {Player} from '../../services/players/player.interface';

@Component({
  standalone: true,
  template: `
    Раунд {{ round }}
    @if(state == 0) {
      <h2 class="text-center">Следующий игрок</h2>
      <h1 class="text-center">{{ currentPlayer.name }}</h1>
      <button class="btn btn-lg btn-warning" (click)="play()">Старт!</button>
    } @else {
      <button class="overflow-hidden btn btn-lg btn-warning" (click)="done()">Всё!</button>
    }
  `,
  host: {class: 'd-flex flex-column gap-5'},
  imports: [RouterLink, NgClass, AsyncPipe]
})
export class GameComponent {
  protected round = 1 // 0 - show next player, 1 - do play, 2 - to play or to results
  protected state = 0 // 0 - show next player, 1 - do play
  private currentPlayerNo = 0

  constructor(
    protected playersService: PlayersService,
    protected categoriesService: CategoriesService,
  ) {
  }

  play() {
    this.state = 1
  }

  done() {
    this.state = 0
    this.currentPlayerNo = (this.currentPlayerNo + 1) % this.playersService.players.length
  }

  get currentPlayer(): Player {
    return this.playersService.players[this.currentPlayerNo];
  }

  protected readonly routeCreator = routeCreator;
}
