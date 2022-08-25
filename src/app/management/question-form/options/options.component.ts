import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { QuestionOption } from 'src/app/_models';
import { QaNotificationService, QaService } from 'src/app/_services';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'qa-question-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class QuestionOptionsComponent implements OnInit {
  @Input() public options: QuestionOption[] = [];
  @Output() public readonly onChange = new EventEmitter<QuestionOption[]>();

  @ViewChild('form') form: FormGroupDirective;
  formCreate: FormGroup;

  constructor(
    private notificationService: QaNotificationService,
    private qaService: QaService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.formCreate = this.initForm();
  }

  private initForm(): FormGroup {
    return this.fb.group({
      text: [null, [Validators.required]]
    });
  }

  add() {
    this.options?.push(this.qaService.addOption(this.formCreate.value));

    this.form.resetForm();
    this.formCreate = this.initForm();

    this.onChange.emit(this.options);
  }

  remove(item: QuestionOption) {
    this.options = this.options?.filter(x => x.id !== item.id);

    this.onChange.emit(this.options);

  }

}
