export const QUESTION_TYPE_TEXT = 'text';
export const QUESTION_TYPE_NUMBER = 'number';
export const QUESTION_TYPE_RANK = 'rank';

export interface QuestionType {
  id: number;
  question_type: string;
  friendly_name: string;
}
