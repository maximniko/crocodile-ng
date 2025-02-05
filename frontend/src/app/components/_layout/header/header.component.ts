import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {routeCreator} from '../../crocodile/crocodile.routes';
import {Localisation} from '../../../services/localisation';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <nav class="navbar navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" [routerLink]="routeCreator.main()">{{ l.messages.CrocodileGame ?? 'Crocodile Game' }}</a>
      </div>
    </nav>
  `,
  imports: [RouterLink]
})
export class HeaderComponent {
  constructor(protected l: Localisation) {}
  protected readonly routeCreator = routeCreator;
}
