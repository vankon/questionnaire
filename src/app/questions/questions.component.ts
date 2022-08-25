import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'qa-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuestionsComponent implements OnInit, OnDestroy {
  constructor(
  ) {

  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {

  }
}
