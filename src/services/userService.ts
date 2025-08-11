import { User, UserLogin, UserPost } from "../types/userTypes";
import { api } from "./api";
import { erroProps } from "../types/errorTypes";
import axios from "axios";
import { DataProps, useAuth } from "../context/AuthContext";

export async function postUserData(
  user: UserPost
): Promise<boolean | erroProps> {
  try {
    const response = await api.post("/Auth/register", {
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      name: user.name,
      userName: user.userName,
      adress: user.adress,
      city: user.city,
      state: user.state,
      postalCode: user.postalCode,
      photo: "",
    });

    return true;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data.errors);
      const message = Object.values(error.response.data.errors);
      return <erroProps>{
        success: false,
        errors: message,
      };
    } else {
      const message = Object.values(error.response.data.errors);
      console.log(error.response.data.errors);
      return <erroProps>{
        success: false,
        errors: message,
      };
    }
  }
}

export async function loginUser(
  userlogin: UserLogin
): Promise<erroProps | DataProps> {
  console.log("entrando na requisição");
  try {
    const response = await api.post(
      "Auth/login",
      {
        userName: userlogin.userName,
        password: userlogin.passWord,
      },
      { timeout: 5000 }
    );

    return response?.data.data;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      console.log("servidor fora do ar");

      return <erroProps>{
        success: false,
        errors: ["servidor fora do ar"],
      };
    } else {
      if (error.response) {
        const message = Object.values(error.response.data.errors);
        return <erroProps>{
          success: false,
          errors: message,
        };
      }
    }
    if (error.response?.data) {
      const message = Object.values(error.response.data.errors);

      return <erroProps>{
        success: false,
        errors: message,
      };
    } else {
      return <erroProps>{
        success: false,
        errors: ["Erro ao se conectar com o servidor"],
      };
    }
  }
}
