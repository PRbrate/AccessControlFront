import { Stack } from "expo-router"

const PublicRoutes = () =>{
    return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/signUp/page"
          options={{ headerShown: false }}
        />
      </Stack>
    );
}

export default PublicRoutes

