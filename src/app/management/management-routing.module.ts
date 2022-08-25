import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagementComponent } from './management.component';
import { CreateQuestionComponent } from './question-form/add-question.component';
import { EditQuestionComponent } from './question-form/edit-question.component';
import { ManagerQuestionListComponent } from './question-list/question-list.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerQuestionListComponent
  },
  {
    path: 'create',
    component: CreateQuestionComponent
  },
  {
    path: 'edit/:id',
    component: EditQuestionComponent,
    data: { title: 'Edit Question' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManagementRoutingModule { }
