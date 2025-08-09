import { Stack } from "expo-router";

const PrivateRoutes = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(panel)/profile/page"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default PrivateRoutes;
