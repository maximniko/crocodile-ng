import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {routeCreator} from '../../crocodile.routes';
import {PlayersService} from '../../services/players/players.service';
import {CategoriesService} from '../../services/categories/categories.service';
import {Player} from '../../services/players/player.interface';
import {NgClass} from '@angular/common';
import {Word} from '../../services/words/word.interface';
import {Router, RouterLink} from '@angular/router';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse, NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem
} from '@ng-bootstrap/ng-bootstrap';
import {TwaService} from '../../../../services/telegram/twa.service';
import {SoundService} from '../../../../services/sound.service';
import {Localisation} from '../../../../services/localisation';
import {symbols} from '../../../_layout/symbols/symbols';

@Component({
  standalone: true,
  styles: `
    .text-gold {
      color: #ffd63f;
    }

    .text-silver {
      color: #e4e4e4;
    }

    .text-bronze {
      color: #b57117;
    }
  `,
  template: `
    @if (state == State.LOADING) {
      {{ l.messages.Loading ?? 'Loading' }}
    } @else if (state == State.NEXT_PLAYER) {
      <div class="vstack gap-5">
        <div class="text-center h2">{{ l.messages.NextPlayer ?? 'Next player' }}</div>
        <div class="text-center h1">{{ currentPlayer.name }}</div>
        <button class="btn btn-lg btn-success" (click)="playing()">{{ l.messages.Start ?? 'Start!' }}</button>
      </div>
    } @else if (state == State.PLAYING) {
      <div class="d-flex flex-column gap-3 gap-md-5">
        <div class="d-flex justify-content-between mt-3">
          <div class="d-flex">
            <div class="m-auto h3">
              {{ currentPlayer.name }}, {{ l.messages.show ?? 'show the words' }}
            </div>
          </div>
          <div class="d-flex badge text-bg-warning">
            <div class="m-auto d-flex flex-column">
              <div class="position-relative">
                <svg width="1.6rem" height="1.6rem">
                  <use [attr.xlink:href]="'#' + symbols.arrowRepeat"/>
                </svg>
                <div class="m-auto fs-6 position-absolute w-100 top-0 bottom-0 h-100" style="line-height: 1.5rem">
                  {{ currentGamePlayer.countReplace }}
                </div>
              </div>
              <div class="position-relative">
                <svg width="1.6rem" height="1.6rem">
                  <use [attr.xlink:href]="'#' + symbols.trophyFill"/>
                </svg>
                <div class="text-white m-auto position-absolute w-100 top-0">
                  {{ currentRoundPoints }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column gap-1">
          @for (word of currentGamePlayer.currentWords; track word.title; let idx = $index) {
            @let isSelected = isWordSelected(word);
            <div class="btn-group">
              <button type="button"
                      class="btn btn-lg btn-warning p-0" [ngClass]="{
                      'disabled': currentGamePlayer.countReplace < 1
                      }"
                      (click)="replaceWord(word)">
                  <svg width="1.5rem" height="1.5rem">
                    <use [attr.xlink:href]="'#' + symbols.arrowRepeat"/>
                  </svg>
              </button>
              <button class="d-flex btn btn-lg w-75" [ngClass]="{
          'btn-success': isSelected,
          'btn-secondary': !isSelected,
      }" (click)="toggleWord(word)">
                <div class="d-flex w-100">
                  <div class="m-auto">{{ word.title }}</div>
                  <div class="sm-auto d-flex">
                    <div class="m-auto fs-5">+{{ word.level }}</div>
                    <div class="m-auto ms-1">
                      <svg width="1rem" height="1rem" class="text-warning">
                        <use [attr.xlink:href]="'#' + symbols.trophyFill"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          }
        </div>
        <div class="mb-3">
          @let isLastPlayer = isLastPlayerInRound();
          <button class="btn btn-lg btn-outline-success w-100" (click)="isLastPlayer ? endRound() : nextPlayer()">
            @if (isLastPlayer) {
              {{ l.messages.Round ?? 'Round!' }}
            } @else {
              {{ l.messages.NextPlayer ?? 'Next player!' }}
            }
          </button>
        </div>
      </div>
    } @else if (state == State.END_ROUND) {
      <div class="h2 text-center mb-3">
        {{ l.messages.RoundEnded ?? 'Round ended!' }}
      </div>
      <div class="btn-group btn-group-lg w-100">
        <button class="btn btn-outline-success"
                (click)="toResult()">{{ l.messages.SeeTheResults ?? 'See the results!' }}
        </button>
        <button class="btn btn-success" (click)="nextPlayer()">{{ l.messages.PlayAgain ?? 'Play again!' }}</button>
      </div>
    } @else if (state == State.TO_RESULT) {
      <div ngbAccordion class="mb-3">
        @for (gamePlayerResult of gamePlayerResults; track gamePlayerResult.gamePlayer.player.name; let idx = $index) {
          <div ngbAccordionItem>
            <h2 ngbAccordionHeader>
              <button ngbAccordionButton>
                @let starsCount = 3 - idx;
                <div class="d-flex w-100" [ngClass]="{
                  'text-gold': starsCount == 3,
                  'text-silver': starsCount == 2,
                  'text-bronze': starsCount == 1,
                  'text-secondary': starsCount < 1,
                  }">
                  <span class="ms-2 me-auto"><b>{{ gamePlayerResult.gamePlayer.player.name }}</b></span>
                  <div>
                    <span class="me-2" [innerHTML]="stars(starsCount)"></span>
                    <span class="badge text-bg-danger rounded-pill">{{ gamePlayerResult.sum }}</span>
                  </div>
                </div>
              </button>
            </h2>
            <div ngbAccordionCollapse>
              <div class="p-2" ngbAccordionBody>
                <ng-template>
                  <ul class="list-group">
                    @if (gamePlayerResult.gamePlayer.successWords.length) {
                      @for (word of gamePlayerResult.gamePlayer.successWords; track word.title) {
                        <li class="list-group-item list-group-item-action d-flex justify-content-between">
                          <div class="ms-2 me-auto">{{ word.title }}</div>
                          <span class="badge text-bg-primary rounded-pill">{{ word.level }}</span>
                        </li>
                      }
                    } @else {
                      <li class="list-group-item">
                        {{ l.messages.ThereIsNothing ?? 'There is nothing.' }}
                      </li>
                    }
                  </ul>
                </ng-template>
              </div>
            </div>
          </div>
        }
      </div>
      <div class="btn-group btn-group-lg w-100">
        <a class="btn btn-outline-success" [routerLink]="routeCreator.main()">{{ l.messages.ToMain ?? 'To main' }}</a>
        <button class="btn btn-success" (click)="nextPlayer()">{{ l.messages.PlayAgain ?? 'Play again!' }}</button>
      </div>
    }
  `,
  host: {class: 'h-100'},
  imports: [
    NgClass,
    RouterLink,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionButton,
    NgbAccordionBody,
    NgbAccordionCollapse,
    NgbAccordionDirective
  ]
})
export class GameComponent implements OnInit, OnDestroy {
  private countReplace = 3
  protected round: number = 1
  protected state: State = State.LOADING // 0 - show next player, 1 - do play, 2 - to play or to results
  private currentPlayerNo = 0
  private gameWordsProvider: GameWordsProvider
  protected gamePlayers: GamePlayer[] = []
  protected gamePlayerResults: GamePlayerResult[] = []

  constructor(
    protected playersService: PlayersService,
    private twa: TwaService,
    private sound: SoundService,
    private router: Router,
    protected l: Localisation
  ) {
    this.goBack = this.goBack.bind(this)
    this.gameWordsProvider = new GameWordsProvider(inject(CategoriesService))
  }

  ngOnInit() {
    this.twa.requestFullscreen()
    this.twa.backButtonOnClick(this.goBack)
    this.initGamePlayers()
  }

  ngOnDestroy() {
    this.twa.exitFullscreen()
    this.twa.offBackButton(this.goBack, false)
    this.initGamePlayers()
  }

  goBack(): void {
    this.router.navigate([routeCreator.main()])
  }

  protected get currentRoundPoints(): number {
    return this.currentGamePlayerSuccessWords
      .filter(
        word => this.currentGamePlayer.currentWords.findIndex(
          currentWord => currentWord.title == word.title
        ) != -1
      )
      .reduce<number>((acc, word: Word) => acc + word.level, 0)
  }

  protected isLastPlayerInRound(): boolean {
    return this.gamePlayers.length == this.currentPlayerNo + 1
  }

  protected playing() {
    this.state = State.PLAYING;
  }

  protected nextPlayer() {
    this.currentPlayerNo = (this.currentPlayerNo + 1) % this.gamePlayers.length
    if (this.currentPlayerNo == 0) {
      this.resetGamePlayers()
      this.round += 1
    }
    this.state = State.NEXT_PLAYER
  }

  protected toResult() {
    this.gamePlayerResults = this.gamePlayers.map<GamePlayerResult>((gamePlayer: GamePlayer) => {
      return {
        gamePlayer: gamePlayer,
        sum: gamePlayer.successWords
          .reduce<number>((acc, word) => {
            acc += word.level
            return acc
          }, 0),
      }
    }).sort((a, b) => b.sum - a.sum)
    this.state = State.TO_RESULT
  }

  protected endRound() {
    this.state = State.END_ROUND
  }

  protected get currentPlayer(): Player {
    return this.currentGamePlayer.player;
  }

  protected get currentGamePlayer(): GamePlayer {
    return this.gamePlayers[this.currentPlayerNo];
  }

  protected get currentGamePlayerSuccessWords(): Word[] {
    return this.currentGamePlayer.successWords;
  }
  protected get currentGamePlayerCurrentWords(): Word[] {
    return this.currentGamePlayer.currentWords;
  }

  protected toggleWord(word: Word) {
    const index = this.currentGamePlayerSuccessWords.indexOf(word),
      notExists = index == -1

    if (notExists) {
      this.currentGamePlayerSuccessWords.push(word)
      this.twa.hapticFeedbackNotificationOccurred("success")
      this.sound.playOn()
    } else {
      this.currentGamePlayerSuccessWords.splice(index, 1)
      this.twa.hapticFeedbackNotificationOccurred("warning")
      this.sound.playOff()
    }
  }

  protected replaceWord(word: Word) {
    const index = this.currentGamePlayerCurrentWords.indexOf(word),
      notExists = index == -1

    if (notExists) {
      return
    }
    this.currentGamePlayerCurrentWords[index] = this.gameWordsProvider.nextWords(1)[0]
    this.currentGamePlayer.countReplace -= 1
  }

  protected isWordSelected(word: Word) {
    return this.currentGamePlayerSuccessWords.includes(word)
  }

  protected stars(count: number): string {
    if (count > 0) {
      return Array(count).fill('&#9733;').join('')
    }

    return ''
  }

  private resetGamePlayers() {
    this.gamePlayers.forEach((player: GamePlayer) => {
      player.countReplace = this.countReplace
      player.currentWords = this.gameWordsProvider.nextWords(5)
    })
  }

  private initGamePlayers() {
    this.gamePlayers = this.playersService.players.map<GamePlayer>((player: Player) => {
      return {
        player: player,
        countReplace: this.countReplace,
        successWords: [] as Word[],
        currentWords: this.gameWordsProvider.nextWords(5),
      }
    })
    this.state = State.NEXT_PLAYER
  }

  protected readonly routeCreator = routeCreator;
  protected readonly State = State;
  protected readonly symbols = symbols;
}

enum State {
  LOADING, // show next player name
  NEXT_PLAYER, // show next player name
  PLAYING, // playing process
  END_ROUND, // end round screen (to next player | to result)
  TO_RESULT // show results (to main page | play again)
}

class GameWordsProvider {
  existingWords: Word[] = [];

  constructor(protected categoriesService: CategoriesService) {
  }

  private isWordExisted(word: Word): boolean {
    return this.existingWords.includes(word)
  }

  nextWords(count: number = 5): Word[] {
    const words: Word[] = []

    while (count > words.length) {
      const nextWord = this.categoriesService.getRandomWord()
      if (this.isWordExisted(nextWord) || words.includes(nextWord)) {
        continue
      }
      words.push(nextWord)
    }

    this.existingWords.push(...words)
    return words.sort((a: Word, b: Word) => a.level - b.level)
  }
}

interface GamePlayer {
  countReplace: number
  player: Player
  successWords: Word[]
  currentWords: Word[]
}

interface GamePlayerResult {
  gamePlayer: GamePlayer,
  sum: number,
}
