import { QuestionType } from './question-type';
export interface Question {
  text: string;
  question_id: number;
  question_type?: QuestionType;
}
