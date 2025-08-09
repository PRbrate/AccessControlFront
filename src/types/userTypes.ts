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
}

export interface UserPost {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  postalCode: string;
  adress: string;
  city: string;
  state: string;
}