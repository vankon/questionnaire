import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/_models';
import { QuestionTypeEnum } from 'src/app/_models/enums';

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
    private fb: FormBuilder
  ) {

  }

  public ngOnInit(): void {
    this.initForm(this.model.type);
  }

  private initForm(type: QuestionTypeEnum) {
    this.form = this.fb.group({
      options: [null, Validators.required]
    });
  }
}
