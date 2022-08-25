import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionType } from 'src/app/_models';
import { QuestionTypeEnum } from 'src/app/_models/enums';
import { QaNotificationService, QaService } from 'src/app/_services';

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuestionFormComponent implements OnInit {
  public formName = 'Edit Question';
  public formButtonText = 'Save';
  public questionForm: FormGroup;
  public types: QuestionType[] = [];

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
  }

  public send(): boolean {
    this.questionForm.markAllAsTouched();
    if (this.questionForm.invalid) {
      return false;
    }

    return true;
  }

  public selectItem(type: QuestionTypeEnum): void {
    const selected = this.types.find(x => x.value === type) as QuestionType;

    this.notificationService.successSnackBar(selected.name);
  }

  private formInit() {
    this.questionForm = this.fb.group({
      text: [null, Validators.required],
      type: [null, Validators.required],
      options: [null]
    });
  }

}
