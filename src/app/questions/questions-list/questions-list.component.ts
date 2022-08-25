import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Answer, Question } from 'src/app/_models';
import { QaService } from 'src/app/_services';

@Component({
  selector: 'qa-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuestionsListComponent implements OnInit {
  public questions: Question[] = [];
  public answers: Answer[] = [];

  constructor(
    private qaService: QaService
  ) {

  }

  public ngOnInit(): void {
    this.qaService.questions$.pipe(
      map(list => list.filter(x => !x.answered))
    ).subscribe(data => this.questions = data);
    this.qaService.answers$.subscribe(data => this.answers = data);
  }

}
