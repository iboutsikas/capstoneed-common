export interface User {
  id: number,
  type: UserType;
  first_name: string;
  last_name: string;
  email: string;
  position?: string;
  department?: string;
  provider?: string;
  nickname?: string;
}

export enum UserType {
  STUDENT = <any>'Student',
  LECTURER = <any>'Lecturer',
  BASIC = <any>''
}
