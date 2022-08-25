import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QaNotificationService, QaService } from 'src/app/_services';
import { QuestionFormComponent } from './question-form.component';

@Component({
  selector: 'add-question',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateQuestionComponent extends QuestionFormComponent {
  public override formName = 'Add new question';
  public override formButtonText = 'Add Question';

  constructor(
    public override fb: FormBuilder,
    public override qaService: QaService,
    public override notificationService: QaNotificationService,
    public override route: ActivatedRoute,
    public override router: Router,
    public override cdRef: ChangeDetectorRef
  ) {
    super(
      fb,
      qaService,
      notificationService,
      route,
      router,
      cdRef);
  }

  public override send(): any {
    if (!super.send()) {
      return;
    }

    this.qaService.addQuestion({
      ...this.questionForm.value
    }).subscribe(data => this.router.navigate(['../'], { relativeTo: this.route })
      .finally(() => this.notificationService.success(`Question #${data.id} added`)));
  }
}
