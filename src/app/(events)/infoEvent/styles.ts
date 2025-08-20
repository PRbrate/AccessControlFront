import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  image: {
    width: "100%",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: colors.principalBlue,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  overlay: {
    width: "100%",
    height: 300,
    position: "absolute",
    top: 25,
    left: 20,
    padding: 8,
    justifyContent: "space-between",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonBack: {
    padding: 2,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 5,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignContent: "center",
  },
  containerNameEvent: {
    width: "100%",
    alignItems: "center",
  },
  textNameEvent: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    textShadowColor: "rgba(0,0,0,0.8)", // cor da sombra
    textShadowOffset: { width: 2, height: 2 }, // deslocamento da sombra
    textShadowRadius: 3, // suavização da sombra
  },
  containerInformation: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  textTumb: {
    fontSize: 24,
    color: colors.black,
    fontWeight: "bold",
  },
  containerInformationDate: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonSend: {
    marginTop: 10,
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.principalBlue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
});

export default styles;
