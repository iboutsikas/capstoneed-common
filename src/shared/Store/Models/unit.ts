export interface Unit {
  id: number;
  name: string;
  code: string;
  semester: string;
  year: number;
  department_id?: number;
  archived_at?: Date;
  department_attributes? : {
    name: string;
    university: string;
  }
}
