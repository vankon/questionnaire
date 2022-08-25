import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/_models';
import { QaNotificationService, QaService } from 'src/app/_services';

@Component({
  selector: 'qa-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AnswerItemComponent {
  @Input() public model = <Answer>{};

  constructor(
    private qaService: QaService,
    private notificationService: QaNotificationService
  ) {

  }

  public checkSelected(id: number): boolean {
    return this.model.response?.optionIds?.some(x => x === id) || false;
  }

  public rollback(): void {
    this.qaService.rollbackAnswer(this.model).subscribe(data =>
      this.notificationService.successSnackBar(`answer on question#${this.model.question.id} rolled back`));
  }
}
