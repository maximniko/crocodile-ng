import {Component} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

@Component({
  standalone: true,
  template: `
    <div class="text-center h3 my-3">Игроки</div>
    <button (click)="addLesson()">Add</button>
    <form [formGroup]="form!">
      <div formArrayName="lessons">
        @for (lessonControl of lessons.controls; track lessonControl; let idx = $index) {
          <div formGroupName="{{idx}}">
            <input type="text" formControlName="title">
            <button (click)="deleteLesson(idx)">X</button>
          </div>
        }
      </div>
      <button type="submit" [disabled]="form!.invalid" (click)="onSubmit()">Submit</button>
    </form>
  `,
  host: {class: 'd-flex flex-column gap-2'},
  imports: [ReactiveFormsModule],
})
export class PlayersComponent {

  protected form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      lessons: this.formBuilder.array([this.lessonGroup()]),
    })
  }

  protected get lessons() {
    return this.form?.controls['lessons'] as FormArray;
  }

  protected addLesson() {
    this.lessons.push(this.lessonGroup());
  }

  protected deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }

  onSubmit() {
    console.log(this.form?.get('lessons')?.value);
  }

  private lessonGroup() {
    return this.formBuilder.group({
      title: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(16),
        this.uniqueValidator(),
      ])
    })
  }

  uniqueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.lessons) {
        return null
      }

      const skills: string[] = [];

      for (let i = 0; i <= this.lessons.controls.length; i++) {
        const value = this.lessons.controls[i]?.get('title')?.value
        if (value) {
          skills.push(value)
        }
      }

      if (this.hasDuplicates(skills)) {
        console.log('found');
        return {duplicate: true};
      }

      for (let i = 0; i <= this.lessons.controls.length; i++) {
        this.lessons.controls[i]?.get('title')?.setErrors(null);
      }

      return null;
    }
  }


  hasDuplicates(skills: string[]) {
    return skills.length !== new Set(skills).size;
  }
}

interface Lesson {
  title: string
}
