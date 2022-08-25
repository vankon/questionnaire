import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { Question, QuestionOption, QuestionType } from 'src/app/_models';
import { QuestionTypeEnum } from 'src/app/_models/enums';
import { QaNotificationService, QaService } from 'src/app/_services';

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})

export class QuestionFormComponent implements OnInit {
  public formName = 'Edit Question';
  public formButtonText = 'Save';
  public questionForm: FormGroup;
  public types: QuestionType[] = [];
  public model: Question;

  public initFormShown = true;

  constructor(
    public readonly fb: FormBuilder,
    public readonly qaService: QaService,
    public readonly notificationService: QaNotificationService,
    public readonly route: ActivatedRoute,
    public readonly router: Router,
    public readonly cdRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.types = this.qaService.getTypes();
    this.formInit();

    this.typeCntrl.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(value => {
      if (value !== QuestionTypeEnum.Open) {
        this.optionsCntrl.setValidators([Validators.required])
      }
      else {
        this.optionsCntrl.removeValidators(Validators.required);
      }

      this.optionsCntrl.updateValueAndValidity();
    });
  }

  public send(): boolean {
    this.questionForm.markAllAsTouched();
    if (this.questionForm.invalid) {
      return false;
    }

    return true;
  }

  public opionsChanged(options: QuestionOption[]): void {
    this.optionsCntrl.setValue(options);
  }

  get optionsEnable(): boolean {
    const type = this.typeCntrl;
    return type.value !== QuestionTypeEnum.Open;
  }

  get typeCntrl(): FormControl {
    return this.questionForm.controls['type'] as FormControl;
  }

  get optionsCntrl(): FormControl {
    return this.questionForm.controls['options'] as FormControl;
  }

  private formInit() {
    this.questionForm = this.fb.group({
      text: [null, Validators.required],
      type: [QuestionTypeEnum.Single, Validators.required],
      options: [null, Validators.required]
    });
  }

}
