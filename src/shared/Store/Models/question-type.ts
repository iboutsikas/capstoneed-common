export const QUESTION_TYPE_TEXT = 'QUESTION_TYPE_TEXT';
export const QUESTION_TYPE_NUMBER = 'QUESTION_TYPE_NUMBER';

export interface QuestionType {
  id: number;
  question_type: string;
  friendly_name: string;
}
