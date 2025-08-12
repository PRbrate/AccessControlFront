import axios, { AxiosError } from "axios";
import { NEXT_PUBLIC_API_URL } from "../utils/endpoints";
import { useAuth } from "../context/AuthContext";

const api = axios.create({
  baseURL: NEXT_PUBLIC_API_URL
});

export function setupResponseInterceptor(logout: () => void){
  api.interceptors.response.use(
    (response) => response, 
    (error: AxiosError) => {
      if(error.response?.status ===401){
        logout();
      }
      return Promise.reject(error);
    }
  )
}

export function setupApiToken(token : string | undefined){
  if(token){
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }else{
    delete api.defaults.headers.common["Authorization"];
  }
}

export default api;



// export function useApi() {
  
//   try{
//   console.log("entrou aqui também")
//   const{dataReturn, logout} = useAuth();
//   const baseURL = NEXT_PUBLIC_API_URL;

//   console.log("não passou daqui")
//   const api = axios.create({
//     baseURL: baseURL,
//     headers: {
//       Authorization: `Bearer ${dataReturn?.accessToken}}`,
//     },
//   });

//   api.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error: AxiosError) => {
//       if (error.response?.status === 401) {
//         if (typeof window !== undefined) {
//           logout();
//         } else {
//           return Promise.reject();
//         }
//       }

//       return Promise.reject(error);
//     }
//   );
//   return api;
//   }catch(err){
//     console.log(err)
//   }
// }
