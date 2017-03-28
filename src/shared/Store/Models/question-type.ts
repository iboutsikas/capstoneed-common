export const QUESTION_TYPE_TEXT = 'text';
export const QUESTION_TYPE_NUMBER = 'number';

export interface QuestionType {
  id: number;
  question_type: string;
  friendly_name: string;
}
