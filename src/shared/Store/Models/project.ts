import { Assignment } from './assignment';
import { User } from './user';
export interface Project {
  id?: number;
  current_iteration_id?: number;
  assignment_id?: number;
  unit_id?: number;
  project_name: string;
  team_name?: string;
  description?: string;
  logo?: string
  enrollment_key?: string;
  color?: string;
  assignment?: Assignment;
  students?: User[];
  points?: {
    total: number;
    average: number;
    personal: number;
  }
}
