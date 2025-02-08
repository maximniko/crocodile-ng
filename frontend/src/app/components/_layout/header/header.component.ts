import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {routeCreator} from '../../crocodile/crocodile.routes';
import {Localisation} from '../../../services/localisation';
import {TwaService} from '../../../services/telegram/twa.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  styles: `
    .transition {
      opacity: 1;
      top:0;
      transition: all 0.8s ease-in-out;
    }
    .transition.hide {
      top: -60px;
      opacity: 0;
    }`,
  template: `
    <nav class="navbar navbar-dark bg-dark transition" [ngClass]="{
    'hide': isHide
    }">
      <div class="container">
        <a class="navbar-brand w-100 text-center me-0" [routerLink]="routeCreator.main()">{{ l.messages.CrocodileGame ?? 'Crocodile Game' }}</a>
      </div>
    </nav>
  `,
  imports: [RouterLink, NgClass]
})
export class HeaderComponent {
  hide: boolean = false;
  constructor(
    protected l: Localisation,
    private twa: TwaService
  ) {
  }

  protected get isHide(): boolean {
    return this.twa.isFullscreen()
  }

  protected readonly routeCreator = routeCreator;
}
