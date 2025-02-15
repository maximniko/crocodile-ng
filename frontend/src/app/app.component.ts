import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TwaService} from './services/telegram/twa.service';
import {SymbolsComponent} from './components/_layout/symbols/symbols.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SymbolsComponent, RouterOutlet],
  template: `
    <router-outlet/>
    <app-symbols/>
  `,
})
export class AppComponent implements OnInit {
  constructor(private twa: TwaService) {
  }

  ngOnInit() {
    this.twa.ready()
    this.twa.expand()
  }
}
