import { AdressType } from "./addressTypes";

export interface User {
  id: string;
  contaId: number;
  name: string;
  userName: string;
  photo: string;
  email: string;
}

export interface UserLogin{
  userName: string;
  passWord: string;
  logout: () => void;
}

export interface UserPost {
  name: string;
  userName: string;
  email: string;
  passWord: string;
  confirmPassword: string;
  addres: AdressType;
}