import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/userTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataReturn, setData] = useState<DataProps | null>(null);

  useEffect(() => {
    async function getStorageData() {
      const storageData = await AsyncStorage.getItem(
        "@token-AccessControl-Login!"
      );

      if (storageData) {
        setData(JSON.parse(storageData));
      }
    }
    getStorageData();
  }, []);

  async function login(dataprops: DataProps | null) {
    setData(dataprops);
    await AsyncStorage.setItem(
      "@token-AccessControl-Login!",
      JSON.stringify(dataprops)
    );
  }
  async function logout() {
    setData(null);
    await AsyncStorage.removeItem("@token-AccessControl-Login!");
  }

  return (
    <AuthContext.Provider value={{ dataReturn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
