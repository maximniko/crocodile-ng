import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {routeCreator} from '../../crocodile/crocodile.routes';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [RouterLink]
})
export class HeaderComponent {
  protected readonly routeCreator = routeCreator;
}
