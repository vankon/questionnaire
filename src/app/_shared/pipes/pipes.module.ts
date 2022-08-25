import { NgModule } from '@angular/core';
import { QuestionStatusPipe } from './question-type.pipe';

@NgModule({
  declarations: [
    QuestionStatusPipe
  ],
  exports: [
    QuestionStatusPipe
  ]
})
export class QaPipesModule {
}
