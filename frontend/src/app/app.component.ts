import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/_layout/header/header.component';
import {FooterComponent} from './components/_layout/footer/footer.component';
import {TwaService} from './services/telegram/twa.service';
import {SymbolsComponent} from './components/_layout/symbols/symbols.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SymbolsComponent],
  template: `
    <main class="d-flex flex-column h-100 justify-content-between">
      <app-header/>
      <div class="overflow-auto container">
        <router-outlet></router-outlet>
      </div>
      <app-footer/>
    </main>
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
