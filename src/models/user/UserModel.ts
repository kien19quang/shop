export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  role: string;
}

export interface RegisterUserDto {
  fullname: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export enum TypeRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}