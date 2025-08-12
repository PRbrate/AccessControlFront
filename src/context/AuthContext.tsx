import { createContext, use, useContext, useState} from "react";
import { User } from "../types/userTypes";


export interface DataProps {
  accessToken: string;
  refreshToken: string;
  userDto?: User | null;
}

interface AuthContextProps {
  dataReturn: DataProps | null;
  login: (dataprops: DataProps | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataReturn, setData] = useState<DataProps | null>(null);

  function login(dataprops: DataProps | null) {
    
    setData(dataprops);
    
  }
  async function logout(){
    setData(null)
  }

  return (
    <AuthContext.Provider value={{ dataReturn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)
