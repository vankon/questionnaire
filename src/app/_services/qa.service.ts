import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, from, Observable, of, switchMap } from 'rxjs';
import { Answer, Question, QuestionOption, QuestionType } from '../_models';
import { QuestionTypeEnum } from '../_models/enums';
import { LocalStorageService } from './local-storage.service';

const questionsKey = 'questions';
const answersKey = 'answers';
const optionKey = 'option';

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
    const quests = this.getQuestions();
    const ids = quests.map(x => x.id);
    let maxId = !ids.length ? 0 : Math.max(...ids);

    const question = {
      ...item,
      createDate: new Date(),
      id: ++maxId
    };

    quests.push(question);
    this.localStorageService.setItem(questionsKey, quests);
    this.questionSubject.next(this.getQuestions());

    return of(question);
  }

  public getQuestions(): Question[] {
    const list = (this.localStorageService.getItem(questionsKey) ?? []) as Question[];

    return list.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
  }

  public deleteQuestion(id: number): Observable<Question[]> {
    const list = this.getQuestions().filter(x => x.id !== id);

    this.localStorageService.setItem(questionsKey, list);
    this.questionSubject.next(list);

    const answers = this.getAnswers().filter(x => x.question.id != x.question.id);
    this.localStorageService.setItem(answersKey, answers);
    this.answerSubject.next(answers);

    return of(list);
  }


  public editQuestion(question: Question): Observable<Question> {
    const quests = this.getQuestions().filter(x => x.id !== question.id);

    quests.push(question);
    this.localStorageService.setItem(questionsKey, quests);
    this.questionSubject.next(this.getQuestions());

    let answers = this.getAnswers();
    const answer = answers.filter(x => x.question.id === x.question.id)[0];
    if (answer) {
      answer.question = question;
      answers = answers.filter(x => x.question.id !== question.id);
      answers.push(answer)
      this.localStorageService.setItem(answersKey, answers);
      this.answerSubject.next(answers);
    }

    return of(question);
  }


  public getQuestionById(id: number): Observable<Question> {
    const list = (this.localStorageService.getItem(questionsKey) ?? []) as Question[];

    return of(list.filter(x => x.id === id)[0]);
  }

  public getAnswers(): Answer[] {
    const list = (this.localStorageService.getItem(answersKey) ?? []) as Answer[];

    return list.sort((a, b) => new Date(b.answerDate).getTime() - new Date(a.answerDate).getTime());
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

  public getOptions(): QuestionOption[] {
    return this.localStorageService.getItem(optionKey) || [];
  }

  public addOption(data: QuestionOption): QuestionOption {
    const options = this.getOptions()
    const ids = options.map(x => x.id);

    let maxId = !ids.length ? 0 : Math.max(...ids);

    const option = {
      ...data,
      id: ++maxId
    }
    options.push(option)
    this.localStorageService.setItem(optionKey, options);

    return option;
  }

  public addAnswer(answer: Answer): Observable<any> {
    const answers = this.getAnswers();
    answers.push(answer)
    this.localStorageService.setItem(answersKey, answers);

    this.answerSubject.next(this.getAnswers());

    return of(answer).pipe(
      switchMap(answer => this.editQuestion({ ...answer.question, answered: true }))
    );
  }


  public rollbackAnswer(answer: Answer): Observable<Question> {
    const answers = this.getAnswers().filter(x => x.question.id !== answer.question.id);
    this.localStorageService.setItem(answersKey, answers);
    this.answerSubject.next(this.getAnswers());

    return of(answer).pipe(
      switchMap(answer => this.editQuestion({ ...answer.question, answered: false }))
    );
  }

}
