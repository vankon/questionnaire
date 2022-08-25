import { Pipe, PipeTransform } from '@angular/core';
import { QuestionType } from 'src/app/_models';
import { QuestionTypeEnum } from 'src/app/_models/enums';
import { QaService } from 'src/app/_services';

@Pipe({
  name: 'displayType'
})
export class QuestionStatusPipe implements PipeTransform {
  private types: QuestionType[] = []

  constructor(private qaService: QaService) {
  }

  public transform(type: QuestionTypeEnum): string {
    this.types = this.qaService.getTypes();

    const current = this.types.filter(x => x.value === type)[0];

    return current.name;
  }
}
