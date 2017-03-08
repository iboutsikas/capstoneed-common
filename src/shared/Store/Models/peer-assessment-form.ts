import { Question } from './question';
export interface PeerAssessmentForm {
  id: number;
  iteration_id?: number;
  questions: Question[],
  start_date?: string,
  deadline?: string,
  extension_until?: string,
  project_id: number
}
