import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {routeCreator} from '../../crocodile.routes';
import {PlayersService} from '../../services/players/players.service';
import {CategoriesService} from '../../services/categories/categories.service';
import {Player} from '../../services/players/player.interface';
import {NgClass} from '@angular/common';
import {Word} from '../../services/words/word.interface';
import {RouterLink} from '@angular/router';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse, NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem
} from '@ng-bootstrap/ng-bootstrap';
import {TwaService} from '../../../../services/telegram/twa.service';

@Component({
  standalone: true,
  styles: `
    .text-gold {
      color: #ffd63f;
    }

    .text-silver {
      color: #e4e4e4;
    }

    .text-blonze {
      color: #cda132;
    }
  `,
  template: `
    @if (state == State.LOADING) {
      Loading
    } @else if (state == State.NEXT_PLAYER) {
      <h2 class="text-center">Следующий игрок</h2>
      <h1 class="text-center">{{ currentPlayer.name }}</h1>
      <button class="btn btn-lg btn-warning d-inline-flex" (click)="playing()">Старт!</button>
    } @else if (state == State.PLAYING) {
      <h1 class="text-center">{{ currentPlayer.name }}, показывай</h1>
      <div class="d-flex flex-column gap-1 h-100">
        @for (word of currentGamePlayer.currentWords; track word.title; let idx = $index) {
          @let isSelected = isWordSelected(word);
          <button class="d-flex btn btn-lg" [ngClass]="{
          'btn-success': isSelected,
          'btn-secondary': !isSelected,
      }" (click)="toggleWord(word)">
            <div class="my-auto">{{ idx + 1 }}</div>
            <div class="m-auto">{{ word.title }}</div>
            <div class="sm-auto">{{ word.level }}</div>
          </button>
        }
      </div>
      @let isLastPlayer = isLastPlayerInRound();
      <button class="overflow-hidden btn btn-lg btn-warning"
              (click)="isLastPlayer ? endRound() : nextPlayer()">
        @if (isLastPlayer) {
          Раунд!
        } @else {
          След игрок!
        }
      </button>
    } @else if (state == State.END_ROUND) {
      Раунд {{ round }} завершен!
      <div class="d-flex">
        <button class="btn btn-lg btn-outline-primary" (click)="toResult()">Смотреть результаты!</button>
        <button class="btn btn-lg btn-success" (click)="nextPlayer()">Играть ещё!</button>
      </div>
    } @else if (state == State.TO_RESULT) {
      <div ngbAccordion>
        @for (gamePlayerResult of gamePlayerResults; track gamePlayerResult.gamePlayer.player.name; let idx = $index) {
          <div ngbAccordionItem>
            <h2 ngbAccordionHeader>
              <button ngbAccordionButton>
                <div class="d-flex w-100">
                  @let starsCount = 3 - idx;
                  <span class="ms-2 me-auto" [ngClass]="{
                  'text-gold': starsCount == 3,
                  'text-silver': starsCount == 2,
                  'text-bronze': starsCount == 1,
                  'text-secondary': starsCount < 1,
                  }"><b>{{ gamePlayerResult.gamePlayer.player.name }}</b></span>
                  <div>
                    <span class="me-2" [ngClass]="{
                  'text-gold': starsCount == 3,
                  'text-silver': starsCount == 2,
                  'text-bronze': starsCount == 1,
                  'text-secondary': starsCount < 1,
                  }" [innerHTML]="stars(starsCount)"></span>
                    <span class="badge text-bg-danger rounded-pill">{{ gamePlayerResult.sum }}</span>
                  </div>
                </div>
              </button>
            </h2>
            <div ngbAccordionCollapse>
              <div ngbAccordionBody>
                <ng-template>
                  <ul class="list-group">
                    @if (gamePlayerResult.gamePlayer.successWords.length) {
                      @for (word of gamePlayerResult.gamePlayer.successWords; track word.title) {
                        <li class="list-group-item d-flex justify-content-between">
                          <div class="ms-2 me-auto">{{ word.title }}</div>
                          <span class="badge text-bg-primary rounded-pill">{{ word.level }}</span>
                        </li>
                      }
                    } @else {
                    }
                  </ul>
                </ng-template>
              </div>
            </div>
          </div>
        }
      </div>
      <div class="d-flex">
        <a class="btn btn-lg btn-outline-primary w-100" [routerLink]="routeCreator.main()">На главную</a>
        <button class="btn btn-lg btn-success w-100" (click)="nextPlayer()">Играть ещё!</button>
      </div>
    }
  `,
  host: {class: 'd-flex flex-column gap-5'},
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
  protected round: number = 1
  protected state: State = State.LOADING // 0 - show next player, 1 - do play, 2 - to play or to results
  private currentPlayerNo = 0
  private gameWordsProvider: GameWordsProvider
  protected gamePlayers: GamePlayer[] = []
  protected gamePlayerResults: GamePlayerResult[] = []

  constructor(
    protected playersService: PlayersService,
    private twa: TwaService
  ) {
    this.gameWordsProvider = new GameWordsProvider(inject(CategoriesService))
  }

  ngOnInit() {
    this.twa.requestFullscreen()
    this.initGamePlayers()
  }

  ngOnDestroy() {
    this.twa.exitFullscreen()
    this.initGamePlayers()
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
      this.resetCurrentWords()
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
    console.log(this.gamePlayers)
  }

  protected get currentPlayer(): Player {
    return this.currentGamePlayer.player;
  }

  protected get currentGamePlayer(): GamePlayer {
    return this.gamePlayers[this.currentPlayerNo];
  }

  protected toggleWord(word: Word) {
    const index = this.gamePlayers[this.currentPlayerNo].successWords.indexOf(word),
      notExists = index == -1

    if (notExists) {
      this.gamePlayers[this.currentPlayerNo].successWords.push(word)
    } else {
      this.gamePlayers[this.currentPlayerNo].successWords.splice(index, 1)
    }
    this.twa.hapticFeedbackImpactOccurred(notExists ? "soft" : "heavy")
  }

  protected isWordSelected(word: Word) {
    return this.gamePlayers[this.currentPlayerNo].successWords.includes(word)
  }

  protected stars(count: number): string {
    if (count > 0) {
      return Array(count).fill('&#9733;').join('')
    }

    return ''
  }

  private resetCurrentWords() {
    this.gamePlayers.forEach((player: GamePlayer) => {
      player.currentWords = this.gameWordsProvider.nextWords(5)
    })
  }

  private initGamePlayers() {
    this.gamePlayers = this.playersService.players.map<GamePlayer>((player: Player) => {
      return {
        player: player,
        successWords: [] as Word[],
        currentWords: this.gameWordsProvider.nextWords(5),
      }
    })
    this.state = State.NEXT_PLAYER
  }

  protected readonly routeCreator = routeCreator;
  protected readonly State = State;
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
  player: Player
  successWords: Word[]
  currentWords: Word[]
}

interface GamePlayerResult {
  gamePlayer: GamePlayer,
  sum: number,
}
