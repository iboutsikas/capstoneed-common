import { Assignment } from './assignment';
export interface Unit {
  id: number;
  name: string;
  code: string;
  semester: string;
  year: number;
  department_id?: number;
  archived_at?: Date;
  department? : {
    id: number;
    name: string;
    university: string;
  },
  assignments? : Assignment[]
}
