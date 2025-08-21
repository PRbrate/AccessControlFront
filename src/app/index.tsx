import SpinIcon from "@/components/spin";
import colors from "@/constants/Colors";
import Colors from "@/constants/Colors";
import { View, StyleSheet, SafeAreaView, Image, Text } from "react-native";
import * as Font from "expo-font"
import { useEffect, useState } from "react";

export default function Home() {

  // const [fontloaded, setfontLoaded] = useState(false)

  // useEffect(() => {
  //   async function loadFonst() {
  //     await Font.loadAsync({
  //       Merriweather_120pt_ExtraBold: require("@/assets/fonts/Merriweather_120pt-ExtraBold.ttf")
  //     })      
  //     setfontLoaded(true)
  //   }
  // }, []);

  //   if (!fontloaded) {
  //     return (
  //       <SafeAreaView style={{ flex: 1 }}>
  //         <View style={styles.container}>
  //           <SpinIcon />
  //         </View>
  //       </SafeAreaView>
  //     );
  //   }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("@/assets/images/LogoAccessControl.png")}/>
        <Text style={styles.font}>AcessControl</Text>
        <SpinIcon  />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.principalBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    resizeMode: "contain",
    height: 200,
    color: colors.white,
  },
  font: {
    fontSize: 40,
    color: colors.white,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 30,
  },
});
