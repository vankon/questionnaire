import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/_shared/shared.module';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { CreateQuestionComponent } from './question-form/add-question.component';
import { EditQuestionComponent } from './question-form/edit-question.component';
import { QuestionOptionsComponent } from './question-form/options/options.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { ManagerQuestionListComponent } from './question-list/question-list.component';

@NgModule({
  declarations: [
    ManagementComponent,
    ManagerQuestionListComponent,
    QuestionFormComponent,
    CreateQuestionComponent,
    EditQuestionComponent,
    QuestionOptionsComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule,
    MatSidenavModule,
  ]
})
export class ManagementModule { }
