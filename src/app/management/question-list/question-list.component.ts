import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { Question } from 'src/app/_models';
import { QaNotificationService, QaService } from 'src/app/_services';

@Component({
  selector: 'manager-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ManagerQuestionListComponent implements OnInit {

  public displayedColumns = ['text', 'type', 'createDate', 'actions'];
  public dataSource = new MatTableDataSource<Question>([]);

  constructor(
    private qaService: QaService,
    private notificationServe: QaNotificationService,
    private cdRef: ChangeDetectorRef
  ) {

  }

  public ngOnInit(): void {
    this.getQuestions();
  }

  public delete(item: Question): void {
    this.qaService.deleteQuestion(item.id).subscribe(data => this.notificationServe.success('question removed'));
  }

  private getQuestions() {
    this.qaService.questions$.subscribe(data => this.dataSource = new MatTableDataSource(data))
  }

}
