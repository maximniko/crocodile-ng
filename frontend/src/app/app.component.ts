import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/_layout/header/header.component';
import {FooterComponent} from './components/_layout/footer/footer.component';
import {TwaService} from './services/telegram/twa.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <main class="d-flex flex-column h-100 justify-content-between">
      <app-header/>
      <div class="overflow-auto p-2">
        <router-outlet></router-outlet>
      </div>
      <app-footer/>
    </main>`,
})
export class AppComponent implements OnInit {
  constructor(private twa: TwaService) {
  }

  ngOnInit() {
    this.twa.ready()
    // this.twa.requestFullscreen()
  }
}
