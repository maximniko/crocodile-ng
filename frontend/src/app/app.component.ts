import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/_layout/header/header.component';
import {FooterComponent} from './components/_layout/footer/footer.component';

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
  host: {}
})
export class AppComponent {
}
