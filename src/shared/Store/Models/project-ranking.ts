export interface ProjectRanking {
  team_name: string;
  total: number;
  average: number;
  logo: string;
  color: string;
  current_rank: number;
  previous_rank: number;
  project_id?: number;
  project_name?: string
  my_team?: boolean;
  personal?: number
}
