import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TwaService} from './services/telegram/twa.service';
import {SymbolsComponent} from './components/_layout/symbols/symbols.component';
import {PlayersService} from './components/crocodile/services/players/players.service';
import {AnalyticsService} from './services/telegram/analytics.service';

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
    private analytics: AnalyticsService,
    private playersService: PlayersService
  ) {
  }

  ngOnInit() {
    try {
      this.analytics.init()
        .then(
          (value: void) => console.log(`analytics inited successful ${value}`),
          (reason) => console.log(`analytics inited unsuccessful ${reason}`)
        )
      this.twa.ready()
      this.twa.expand()
    } catch (e) {
      console.error((e as Error)?.message)
    }
  }

  ngOnDestroy() {
    this.playersService.savePlayers([])
  }
}
