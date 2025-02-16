import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TwaService} from './services/telegram/twa.service';
import {SymbolsComponent} from './components/_layout/symbols/symbols.component';
import {PlayersService} from './components/crocodile/services/players/players.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SymbolsComponent, RouterOutlet],
  template: `
    <router-outlet/>
    <app-symbols/>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private twa: TwaService,
    private playersService: PlayersService
  ) {
  }

  ngOnInit() {
    this.twa.ready()
    this.twa.expand()
  }

  ngOnDestroy() {
    this.playersService.savePlayers([])
  }
}
