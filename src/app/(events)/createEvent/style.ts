import { StyleSheet } from "react-native";
import Colors from "@/constants/colors";
import colors from "@/constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    paddingLeft: 14,
    paddingRight: 14,
    height: 150,
    display: "flex",
    alignItems: "center",
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imageContainer: {
    borderWidth: 2,
    marginBottom: 20,
    borderColor: colors.principalBlue,
    borderRadius: 15,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    gap: 10,
  },
  containerCep: {
    flex: 1,
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ButtonCep: {
    backgroundColor: Colors.principalBlue,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 15,
    borderRadius: 100,
    height: 45,
  },
  buttonSend:{
    marginTop: 10,
    height: 50,
    borderRadius: 15,
    backgroundColor: colors.principalBlue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30
  },
});

export default styles;
