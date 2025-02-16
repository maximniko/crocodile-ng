import {Injectable} from "@angular/core";
import {TwaService} from './telegram/twa.service';
import {Subject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class Localisation {
  messages: Messages = {}
  loaded = new Subject<boolean>();

  constructor(
    private twa: TwaService,
    private http: HttpClient,
  ) {
    this.load()
  }

  load() {
    const locale = this.twa.getUserLanguageCode() ?? 'en'

    this.http.get<Messages>(`assets/messages/${locale}.json`)
      .subscribe({
        next: (messages: Messages) => {
          this.messages = messages
          this.loaded.next(true)
        },
        error: (e: HttpErrorResponse) => {
          this.http.get<Messages>(`assets/messages/en.json`)
            .subscribe({
              next: (messages: Messages) => {
                this.messages = messages
                this.loaded.next(true)
              },
              error: (e) => this.twa.showAlert("Can\'t find data for your language. Available languages de, en, fr, pt, ru."),
              // complete: () => console.info('complete ru')
            })
        },
        // complete: () => console.info(`complete ${locale}`)
      })
  }
}

type Messages = {
  [key in Key]?: string | undefined;
}

export type Key =
  "CrocodileGame"
  | "Save"
  | "Reset"
  | "Loading"
  | "NextPlayer"
  | "Start"
  | "show"
  | "Round"
  | "RoundEnded"
  | "SeeTheResults"
  | "Play"
  | "PlayAgain"
  | "ToMain"
  | "Step"
  | "Player"
  | "Players"
  | "SelectPlayers"
  | "Categories"
  | "Add"
  | "ChooseCategories"
  | "ThereIsNothing"
  | "Crocodile"
  | "CrocodileSub"
  | "HowToPlay"
  | "Description"
  | "DescriptionContent"
  | "RulesOfTheGame"
  | "RulesOfTheGameYouCanTitle"
  | "RulesOfTheGameYouCanContent"
  | "RulesOfTheGameYouCantTitle"
  | "RulesOfTheGameYouCantContent"
  | "GameVariants"
  | "EveryManForHimself"
  | "EveryManForHimselfDesc"
  | "TeamPlay"
  | "TeamPlayDesc"
  | "errRequired"
  | "errMinlength"
  | "errMaxlength"
  | "errMin"
  | "errMax"
  | "errEmail"
  | "errPattern"
  | "errInvalidPhone"
  | "errInvalidType"
