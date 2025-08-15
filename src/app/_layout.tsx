import { router, Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

function MainLayout() {
  const { dataReturn} = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (dataReturn?.accessToken) {
        router.replace("/(panel)/profile/page");
        return;
      } else {
        router.replace("/(auth)/signIn/page");
        return;
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
