import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/_models';
import { QuestionTypeEnum } from 'src/app/_models/enums';
import { QaNotificationService, QaService } from 'src/app/_services';

@Component({
  selector: 'qa-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuestionItemComponent implements OnInit {
  @Input() public model = <Question>{};
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private qaService: QaService,
    private notificationService: QaNotificationService
  ) {

  }

  public ngOnInit(): void {
    this.initForm(this.model.type);

    if (this.model.type === QuestionTypeEnum.Open) {
      this.form.controls['text'].setValidators(Validators.required);
      this.form.controls['text'].updateValueAndValidity();

      this.form.controls['options'].setValidators(null);
      this.form.controls['options'].updateValueAndValidity();
    }
  }

  public sendAnswer(): void {
    const formValue = this.form.value;

    const optionIds: number[] = [];
    if (this.model.type === QuestionTypeEnum.Single) {
      optionIds.push(formValue.options)
    } else {
      optionIds.push(...formValue.options || []);
    }

    const answer = {
      question: this.model,
      answerDate: new Date(),
      response: {
        optionIds,
        text: formValue.text
      }
    };
    this.qaService.addAnswer(answer).subscribe(data =>
      this.notificationService.successSnackBar(`question #${this.model.id} answered`));
  }

  private initForm(type: QuestionTypeEnum) {
    this.form = this.fb.group({
      options: [null, Validators.required],
      text: [null]
    });
  }
}
