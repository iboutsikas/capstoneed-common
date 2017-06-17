export interface ProjectEvaluation {
  feelings?: { feeling_id: number, percent: number}[];
  team_answers: any[];
  iteration_id: number;
  percent_complete?: number;
  project_id: number;
}
