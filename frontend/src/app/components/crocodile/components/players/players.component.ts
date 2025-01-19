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
import {Subscription} from 'rxjs';
import {Player} from '../../services/players/player.interface';
import {FocusOnShowDirective} from '../../../../directives/focus-on-show.directive';
import {Router} from '@angular/router';
import {routeCreator} from '../../crocodile.routes';

@Component({
  standalone: true,
  template: `
    <div class="text-center h3 my-3">Игроки</div>
    <button class="btn btn-lg btn-outline-primary" (click)="addPlayer()">Add</button>
    <form [formGroup]="form!">
      <div formArrayName="players" class="d-flex flex-column-reverse">
        @for (control of players.controls; track control; let idx = $index) {
          <div class="input-group mb-3">
            <div class="form-floating" formGroupName="{{idx}}">
              <input focusOnShow type="text" class="form-control" id="floatingName" placeholder="Name" formControlName="name">
              <label for="floatingName">Player {{idx + 1}}</label>
            </div>
            <button class="input-group-text" (click)="deleteLesson(idx)">X</button>
          </div>
        }
      </div>
      <div class="d-flex g-2">
        <button class="btn btn-lg btn-outline-secondary w-100" (click)="reset()">Reset</button>
        <button class="btn btn-lg btn-outline-success w-100" type="submit" [disabled]="form!.invalid" (click)="onSubmit()">Save</button>
      </div>
    </form>
  `,
  host: {class: 'd-flex flex-column gap-2'},
  imports: [ReactiveFormsModule, FocusOnShowDirective],
})
export class PlayersComponent implements OnInit, OnDestroy {

  protected form!: FormGroup;
  protected playerSubscription?: Subscription;
  protected startPlayers: Player[] = [];

  constructor(
    protected formBuilder: FormBuilder,
    protected playersService: PlayersService,
    private router: Router,
  ) {
    this.startPlayers = this.playersService.players
    this.form = this.makeForm(this.startPlayers)
  }

  ngOnInit(): void {
    this.playerSubscription = this.playersService.playersSubject
      .subscribe((players: Player[]) => {
        if (players.length === 0) {
          return
        }
        if (JSON.stringify(players) !== JSON.stringify(this.startPlayers)) {
          this.goBack();
        }
      })
  }

  ngOnDestroy() {
    this.playerSubscription?.unsubscribe()
  }

  protected get players() {
    return this.form?.controls['players'] as FormArray;
  }

  protected addPlayer(player?: Player) {
    this.players.push(this.playerGroup(player));
  }

  protected deleteLesson(lessonIndex: number) {
    this.players.removeAt(lessonIndex);
  }

  protected reset() {
    this.playersService.savePlayers([])
    this.form = this.makeForm([])
  }

  protected onSubmit() {
    const players = this.form?.get('players')?.value as Player[]
    this.playersService.savePlayers(players)
  }

  private makeForm(players?: Player[]): FormGroup {
    console.log(this.formBuilder);
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
          skills.push(value)
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

      return { minLengthArray: true};
    }
  }

  private goBack(): void {
    this.router.navigate([routeCreator.main()]);
  }

  private hasDuplicates(skills: string[]) {
    return skills.length !== new Set(skills).size;
  }
}
