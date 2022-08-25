import { QuestionTypeEnum } from './enums';

export interface QuestionOption {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  createDate: Date;
  answered: boolean;
  text: string;
  type: QuestionTypeEnum;
  options: QuestionOption[];
}

export interface Answer {
  question: Question;
  answerDate: Date;
  response: {
    optionIds?: number[];
    text?: string;
  }
}

export interface QuestionType {
  value: QuestionTypeEnum;
  name: string;
}
