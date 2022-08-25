import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/_models';

@Component({
  selector: 'qa-answer-item',
  templateUrl: './answer-item.component.html',
  styleUrls: ['./answer-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AnswerItemComponent implements OnInit {
  @Input() public model = <Answer>{};

  constructor(
  ) {

  }

  public ngOnInit(): void {

  }

}
