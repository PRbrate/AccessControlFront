import QRCodeITem from "@/components/QRCode";
import colors from "@/constants/Colors";
import { useAuth } from "@/src/context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

export default function TabLayout() {

  const {dataReturn} = useAuth();

  if(dataReturn === null || dataReturn === undefined) return <Redirect href={"/(auth)/signIn/page"}/>

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.secundatyBlue, headerShown: false }}>
      <Tabs.Screen
        name="profile/page"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qrCode/page"
        options={{
          title: "QRCode",
          tabBarLabel: "",
          tabBarIcon: ({ color, size}) => (
            <QRCodeITem size={size} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="settingsProfile/page"
        options={{
          title: "Configurações",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
