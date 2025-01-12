import {Injectable} from '@angular/core';
import {Player} from './player.interface';
import {BehaviorSubject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PlayersService {

  constructor() {
    this.loadPlayers()
  }

  playersSubject = new BehaviorSubject<Player[]>([]);

  private _players: Player[] = [];

  get players(): Player[] {
    return this._players
  }

  set players(newValue: Player[]) {
    this._players = newValue;
    this.playersSubject.next(newValue);
  }

  loadPlayers(): void {
    const players = localStorage.getItem(STORAGE_KEY_PLAYERS)

    if (!players) {
      return
    }

    this.players = JSON.parse(players) as Player[]
  }

  savePlayers(players: Player[]) {
    localStorage.setItem(STORAGE_KEY_PLAYERS, JSON.stringify(players));
    this.players = players
  }
}

const STORAGE_KEY_PLAYERS = 'players';
