import { Question } from './question';

export interface FormTemplate {
  id?: number;
  name: string;
  questions: Question[];
  lecturer_id?: number;
}
