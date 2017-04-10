export interface User {
  id: number,
  type: UserType;
  first_name: string;
  last_name: string;
  email: string;
  position?: string;
  university?: string
  provider?: string;
  nickname?: string;
  avatar_url?: string;
}

export interface UserRegistrationData {
  type: UserType,
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  email: string;
  position?: string;
  university?: string
}

export enum UserType {
  STUDENT = <any>'Student',
  LECTURER = <any>'Lecturer',
  BASIC = <any>''
}
