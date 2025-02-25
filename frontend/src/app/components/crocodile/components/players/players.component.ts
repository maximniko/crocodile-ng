import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {PlayersService} from '../../services/players/players.service';
import {Player} from '../../services/players/player.interface';
import {FocusOnShowDirective} from '../../../../directives/focus-on-show.directive';
import {Router} from '@angular/router';
import {routeCreator} from '../../crocodile.routes';
import {TwaService} from '../../../../services/telegram/twa.service';
import {Localisation} from '../../../../services/localisation';

@Component({
  standalone: true,
  template: `
    <main class="bg-purple h-100 position-relative">
      <div class="position-absolute h-100 w-100 overflow-hidden">
        <img src="assets/images/palm.svg" alt="palm" class="palm">
        <img src="assets/images/umbrella.svg" alt="umbrella" class="umbrella">
        <img src="assets/images/sand.svg" alt="sand" class="sand">
      </div>
      <div class="overflow-y-scroll position-relative h-100 z-3">
        <div class="container my-3 pt-5">
          <div class="row row-cols-2 g-2">
            <div class="col-12">
              <h2 class="h2 text-center text-white">{{ l.messages.Players ?? 'Players' }}</h2>
            </div>
            <div class="col">
              <button class="btn btn-lg btn-white btn-outline-secondary w-100" (click)="reset()">{{ l.messages.Reset ?? 'Reset' }}</button>
            </div>
            <div class="col">
              <button class="btn btn-lg btn-success w-100" type="submit" [disabled]="form!.invalid" (click)="onSubmit()">{{ l.messages.Play ?? 'Play' }}</button>
            </div>
            <div class="col-12">
              <button class="btn btn-lg btn-white btn-outline-secondary w-100" (click)="addPlayer()">{{ l.messages.Add ?? 'Add' }}</button>
            </div>
            <div class="col-12">
              <form [formGroup]="form!">
                <div formArrayName="players" class="d-flex flex-column-reverse">
                  @for (control of players.controls; track control; let idx = $index) {
                    <div class="input-group mb-3">
                      <div class="form-floating" formGroupName="{{idx}}">
                        <input focusOnShow autocapitalize="none" type="text" class="form-control" id="floatingName"
                               placeholder="{{ l.messages.Player ?? 'Player' }} {{ idx + 1 }}"
                               formControlName="name" (click)="$event.stopPropagation()">
                        <label for="floatingName">{{ l.messages.Player ?? 'Player' }} {{ idx + 1 }}</label>
                      </div>
                      <span class="input-group-text" (click)="delete(idx)">X</span>
                    </div>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,
  imports: [ReactiveFormsModule, FocusOnShowDirective],
})
export class PlayersComponent implements OnInit, OnDestroy {
  protected form!: FormGroup;
  protected startPlayers: Player[] = [];

  constructor(
    protected formBuilder: FormBuilder,
    protected playersService: PlayersService,
    protected l: Localisation,
    private router: Router,
    private twa: TwaService,
  ) {
    this.startPlayers = this.playersService.players
    this.form = this.makeForm(this.startPlayers)
    this.goBack = this.goBack.bind(this)
  }

  ngOnInit(): void {
    this.twa.backButtonOnClick(this.goBack)
  }

  ngOnDestroy(): void {
    this.twa.offBackButton(this.goBack, false)
  }

  goBack(): void {
    this.router.navigate([routeCreator.main()])
  }

  goToGame(): void {
    this.router.navigate([routeCreator.game()])
  }

  protected get players() {
    return this.form?.controls['players'] as FormArray;
  }

  protected addPlayer(player?: Player) {
    this.players.push(this.playerGroup(player));
  }

  protected delete(index: number) {
    this.players.removeAt(index);
  }

  protected reset() {
    this.playersService.savePlayers([])
    this.form = this.makeForm([])
  }

  protected onSubmit() {
    if (this.form.invalid) {
      return
    }
    const players = this.form?.get('players')?.value as Player[]
    this.playersService.savePlayers(players)
    this.goToGame()
  }

  private makeForm(players?: Player[]): FormGroup {
    return this.formBuilder.group({
      players: this.formBuilder.array(
        players?.length ? players.map((item: Player) => this.playerGroup(item)) : [this.playerGroup()],
        [this.minLengthArray(2)]
      ),
    })
  }

  private playerGroup(player?: Player) {
    return this.formBuilder.group({
      name: this.formBuilder.control(player?.name ?? '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(16),
        this.uniqueTitleValidator('name'),
      ])
    })
  }

  private uniqueTitleValidator(key: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.players) {
        return null
      }

      const skills: string[] = [];

      for (let i = 0; i <= this.players.controls.length; i++) {
        const value = this.players.controls[i]?.get(key)?.value
        if (value) {
          skills.push((value as string).trim().toLowerCase())
        }
      }

      if (this.hasDuplicates(skills)) {
        return {duplicate: true};
      }

      // bug on delete item
      // for (let i = 0; i <= this.players.controls.length; i++) {
      //   this.players.controls[i]?.get(key)?.setErrors(null);
      // }

      return null;
    }
  }

  private minLengthArray(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value.length >= min)
        return null;

      return {minLengthArray: true};
    }
  }

  private hasDuplicates(skills: string[]) {
    return skills.length !== new Set(skills).size;
  }
}
