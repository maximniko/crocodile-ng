import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {routeCreator} from '../../crocodile.routes';
import {TwaService} from '../../../../services/telegram/twa.service';
import {Localisation} from '../../../../services/localisation';

@Component({
  standalone: true,
  styles: `
    .title {
      position: relative;
      font-size: 3rem;
      text-align: center;
      z-index: 2;
      color: transparent;
      background: linear-gradient(#80f, green, #80f);
      background-clip: text;
      text-decoration: underline;
      font-family: sans-serif;
    }

    .sub-title {
      color: white;
      text-shadow: 1px 1px 4px black;
      text-align: center;
      position: relative;
      z-index: 2;
    }

    .how-to-play {
      position: relative;
      z-index: 3;
    }

    .btn-play {
      z-index: 4;
    }
  `,
  template: `
    <main class="h-100 overflow-hidden position-relative bg-purple">
      <div class="position-absolute h-100 w-100">
        <img src="assets/images/palm.svg" alt="palm" class="palm">
        <img src="assets/images/umbrella.svg" alt="umbrella" class="umbrella">
      </div>
      <div class="container d-flex flex-column justify-content-around h-100">
        <div>
          <h1 class="h1 title">{{ l.messages.Crocodile ?? 'Crocodile' }}</h1>
          <h4 class="h4 sub-title">{{ l.messages.CrocodileSub ?? 'game for the whole family' }}</h4>
        </div>
        <div class="ms-3">
          <a class="btn btn-lg btn-white btn-outline-secondary how-to-play mb-5" [routerLink]="routeCreator.howToPlay()">
            {{ l.messages.HowToPlay ?? 'How to play?' }}
          </a>
        </div>
        <div class="d-flex justify-content-center position-relative">
          <img src="assets/images/sand.svg" alt="sand" class="position-absolute">
          <a class="btn btn-lg btn-play btn-success my-3" [routerLink]="routeCreator.players()">{{ l.messages.Play ?? 'Play' }}</a>
        </div>
      </div>
    </main>
  `,
  imports: [RouterLink]
})
export class MainComponent implements OnInit {
  constructor(
    protected twa: TwaService,
    protected l: Localisation,
  ) {
  }

  ngOnInit() {
    this.twa.visibleBackButton(false)
  }

  protected readonly routeCreator = routeCreator;
}
