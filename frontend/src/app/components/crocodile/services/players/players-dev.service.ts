import {Injectable} from '@angular/core';
import {PlayersService} from './players.service';
import {of} from 'rxjs';
import {Category} from './player.interface';

@Injectable({providedIn: 'root'})
export class PlayersDevService extends PlayersService {
  override loadPlayers(): void {
    of(categories)
      .subscribe(items => {
        this.players = Array.of<Category>(...items)
        this.selected = Array.of<Category>(...items)
      })
  }
}

const categories: Category[] = [
  {
    id: 1,
    alias: "title-1",
  },
  {
    id: 2,
    alias: "title-2",
  },
  {
    id: 3,
    alias: "title-3",
  },
  {
    id: 4,
    alias: "title-4",
  },
  {
    id: 5,
    alias: "title-5",
  },
  {
    id: 6,
    alias: "title-6",
  },
  {
    id: 7,
    alias: "title-7",
  },
  {
    id: 8,
    alias: "title-8",
  },
  {
    id: 9,
    alias: "title-9",
  },
  {
    id: 10,
    alias: "title-10",
  }
]
