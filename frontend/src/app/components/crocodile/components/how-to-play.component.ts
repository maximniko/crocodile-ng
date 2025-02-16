import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {routeCreator} from "../crocodile.routes";
import {TwaService} from "../../../services/telegram/twa.service";
import {Localisation} from "../../../services/localisation";

@Component({
  standalone: true,
  styles:`
    * {
      color: #e5efff;
    }
    .rule {
      display: block;
      color: yellow;
    }
  `,
  template: `
    <main class="bg-purple">
      <div class="container pt-5">
        <div class="row py-3">
          <div class="col">
            <h2 class="h2 text-center">{{ l.messages.Description ?? 'Description' }}</h2>
            <p class="fs-5 fs-md-4">{{ l.messages.DescriptionContent ?? 'This is a game of "pantomime". To cope with all the tasks you need to have good control over your own body and facial expressions. This is an ideal game for any company. The main thing is to gather friends or family, turn on your imagination, ingenuity and artistry. And an incredibly fun pastime is guaranteed!' }}</p>
            <h2 class="h2 text-center">{{ l.messages.RulesOfTheGame ?? 'Rules of the game' }}</h2>
            <p class="fs-5 fs-md-4"><span class="rule">{{ l.messages.RulesOfTheGameYouCanTitle ?? 'By showing the word you can:' }}</span> {{ l.messages.RulesOfTheGameYouCanContent ?? "move any part of your body, even your ears; take any pose, even standing on your head; answer the guessers' questions with gestures; draw with gestures on the wall or other flat surface; point to your clothes, jewelry, and other things that you had with you when you went to show the word; show the phrase in several stages, breaking it down into separate words." }}</p>
            <p class="fs-5 fs-md-4"><span class="rule">{{ l.messages.RulesOfTheGameYouCantTitle ?? 'When showing a word, you may NOT:' }}</span> {{ l.messages.RulesOfTheGameYouCantContent ?? "talk, intentionally make any sounds (except for expressing emotions); point to any objects except those you have with you, take them in your hands, use them; pronounce words silently, with your lips only; show individual letters; draw (even if you had a pen or pencil with you) and generally leave visible marks on any surface; show a word in parts or syllables." }}</p>
            <h2 class="h2 text-center">{{ l.messages.GameVariants ?? 'Game Variations' }}</h2>
            <p class="fs-5 fs-md-4"><span class="rule">{{ l.messages.EveryManForHimself ?? 'Every man for himself' }}</span> {{ l.messages.EveryManForHimselfDesc ?? 'The player shows the words from his card. Each correctly guessed word brings points, which are indicated on the card next to each word. The player with the most points wins.' }}</p>
            <p class="fs-5 fs-md-4"><span class="rule">{{ l.messages.TeamPlay ?? 'Team play' }}</span> {{ l.messages.TeamPlayDesc ?? 'Individual play is suitable for the first acquaintance with \"Crocodile\", but the real interest and fun is revealed when teams play. By competing team against team, you not only develop team spirit, but also learn to understand your playing partners at a glance. If you have more than six people in your company, it is recommended to split into two, three or even more teams.' }}</p>
          </div>
        </div>
      </div>
    </main>
  `
})
export class HowToPlayComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        private twa: TwaService,
        protected l: Localisation,
    ) {
        this.goBack = this.goBack.bind(this)
    }

    ngOnInit(): void {
        this.twa.backButtonOnClick(this.goBack)
    }

    ngOnDestroy(): void {
        this.twa.offBackButton(this.goBack, false)
    }

    goBack() {
        this.router.navigate([routeCreator.main()])
    }
}
