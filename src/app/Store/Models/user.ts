export interface User {
  type: UserType;
  first_name: string;
  last_name: string;
  email: string;
  position?: string;
  department?: string;
  provider?: string;
}

export enum UserType {
  STUDENT = <any>'Student',
  LECTURER = <any>'Lecturer',
  BASIC = <any>''
}
