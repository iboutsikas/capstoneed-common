import { User } from './user';
export interface ProjectEvaluation {
  feelings?: { feeling_id: number, percent: number}[];
  team_answers?: { percent_completed: number, user: User }[];
  iteration_id: number;
  percent_complete?: number;
  project_id: number;
}
