import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/_models';
import { QaNotificationService, QaService } from 'src/app/_services';
import { QuestionFormComponent } from './question-form.component';

@Component({
  selector: 'edit-question',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditQuestionComponent extends QuestionFormComponent implements OnInit {
  public override formName = 'Edit Question';
  public override formButtonText = 'Save';
  public model: Question;

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
    this.initFormShown = false;
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe(params => {
      this.getQuestion(+params['id']);
    });
  }

  public override send(): any {
    if (!super.send()) {
      return;
    }

    /*  this.qaService.editDish(this.dishForm.value,
       this.model).pipe(
         finalize(() => this.loading$.next(false))
       ).subscribe(() => {
         this.router.navigate(['../../'], { relativeTo: this.route });
       }, (error: HttpErrorResponse) => {
         this.notificationService.failedToaster(error.message);
       }); */
  }

  private getQuestion(id: number) {
  /*   this.qaService.geQuestionById(id).subscribe(data => {
      this.initFormShown = true;
      this.model = data;
      this.questionForm.patchValue({ ...this.model });
      this.cdRef.detectChanges();
    }); */
  }

}
