import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Answer, Question, QuestionType } from '../_models';
import { QuestionTypeEnum } from '../_models/enums';
import { LocalStorageService } from './local-storage.service';

const questionsKey = 'questions';
const answersKey = 'answers';

@Injectable({
  providedIn: 'root'
})
export class QaService {
  private questionSubject: BehaviorSubject<Question[]>;
  public questions$: Observable<Question[]>;

  private answerSubject: BehaviorSubject<Answer[]>;
  public answers$: Observable<Answer[]>;

  constructor(
    private localStorageService: LocalStorageService) {
    this.questionSubject = new BehaviorSubject<Question[]>(this.getQuestions());
    this.questions$ = this.questionSubject.asObservable();

    this.answerSubject = new BehaviorSubject<Answer[]>(this.getAnswers());
    this.answers$ = this.answerSubject.asObservable();
  }

  public addQuestion(item: Question): Observable<Question> {
    const list = this.getQuestions();

    list.push(item);
    this.localStorageService.setItem(questionsKey, list);
    this.questionSubject.next(list);

    return of(item);
  }

  public getQuestions(): Question[] {
    return this.localStorageService.getItem(questionsKey) ?? [];
  }

  public deleteQuestion(id: number): Observable<Question[]> {
    const list = this.getQuestions().filter(x => x.id !== id);

    this.localStorageService.setItem(questionsKey, list);
    this.questionSubject.next(list);

    return of(list);
  }

  public getAnswers(): Answer[] {
    return this.localStorageService.getItem(answersKey) ?? [];
  }

  public getTypes(): QuestionType[] {
    return [
      {
        value: QuestionTypeEnum.Single,
        name: 'Single choice'
      },
      {
        value: QuestionTypeEnum.Multiple,
        name: 'Multiple choice'
      },
      {
        value: QuestionTypeEnum.Open,
        name: 'Open question'
      }
    ];
  }
}
