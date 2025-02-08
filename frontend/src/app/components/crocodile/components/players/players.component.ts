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
    <div class="text-center h3 my-3">{{ l.messages.Players ?? 'Players' }}</div>
    <div class="row row-cols-2 g-2">
      <div class="col">
        <button class="btn btn-lg btn-outline-secondary w-100" (click)="reset()">{{ l.messages.Reset ?? 'Reset' }}</button>
      </div>
      <div class="col">
        <button class="btn btn-lg btn-outline-success w-100" type="submit" [disabled]="form!.invalid"
                (click)="onSubmit()">{{ l.messages.Save ?? 'Save' }}
        </button>
      </div>
      <div class="col-12">
        <button class="btn btn-lg tg-btn w-100" (click)="addPlayer()">{{ l.messages.Add ?? 'Add' }}</button>
      </div>
    </div>
    <form [formGroup]="form!">
      <div formArrayName="players" class="d-flex flex-column-reverse">
        @for (control of players.controls; track control; let idx = $index) {
          <div class="input-group mb-3">
            <div class="form-floating" formGroupName="{{idx}}">
              <input focusOnShow autocapitalize="none" type="text" class="form-control" id="floatingName" placeholder="{{ l.messages.Player ?? 'Player' }} {{ idx + 1 }}"
                     formControlName="name" (click)="$event.stopPropagation()">
              <label for="floatingName">{{ l.messages.Player ?? 'Player' }} {{ idx + 1 }}</label>
            </div>
            <span class="input-group-text" (click)="delete(idx)">X</span>
          </div>
        }
      </div>
    </form>
  `,
  host: {class: 'd-flex flex-column gap-2 pb-5'},
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
    this.goBack()
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

      for (let i = 0; i <= this.players.controls.length; i++) {
        this.players.controls[i]?.get(key)?.setErrors(null);
      }

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
