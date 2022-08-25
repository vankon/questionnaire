import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../_shared/shared.module';
import { AnswerItemComponent } from './answer-item/answer-item.component';
import { QuestionItemComponent } from './question-item/question-item.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsComponent } from './questions.component';

const routes = [
  {
    path: '',
    component: QuestionsComponent
  }
];

@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionsListComponent,
    QuestionItemComponent,
    AnswerItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class QuestionsModule {
}
