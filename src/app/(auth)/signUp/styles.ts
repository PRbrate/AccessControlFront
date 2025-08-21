import {  StyleSheet} from "react-native";
import Colors from "@/constants/Colors";
import colors from "@/constants/Colors";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: Colors.white,
  },
  header: {
    paddingLeft: 14,
    paddingRight: 14,
    height: 150,
    display: "flex",
  },
  headerIconText: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  logoText: {
    paddingTop: 4,
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.black,
  },
  postImage: {
    borderWidth: 2,
    borderColor: colors.secundatyBlue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: 150,
    height: 150,
    margin: 10,
  },
  postImageRouded: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.secundatyBlue,
    borderStyle: "dashed",
    borderRadius: 100,
    width: 140,
    height: 140,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 8,
    borderRadius: 8,
  },
  iconLogo: {
    width: "100%",
    textAlign: "center",
  },
  form: {
    shadowColor: Colors.blackBlue,
    shadowOffset: { width: 0, height: -4 }, // sombra para cima
    shadowOpacity: 0.2,
    shadowRadius: 6,
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 34,
    paddingLeft: 14,
    paddingRight: 14,
    gap: 5,
  },
  tumb: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: Colors.black,
  },
  label: {
    color: Colors.black,
    marginBottom: 4,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 14,
  },
  containerPassword: {
    flexDirection: "row",
    width: "100%",
    gap: 5,
    marginBottom: 15,
  },
  containerPass: {
    width: "50%",
    height: "100%",
  },
  labelPassWord: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 100,
    width: "100%",
    paddingHorizontal: 15,
    height: 45,
  },
  AdressCep: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  ViewCep: {
    width: "65%",
  },
  inputCep: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 100,
    width: "90%",
    paddingHorizontal: 15,
    height: 45,
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
  ViewAddress: {
    width: "25%",
  },
  button: {
    marginTop: 15,
    backgroundColor: Colors.principalBlue,
    paddingLeft: 14,
    paddingBottom: 14,
    paddingTop: 14,
    alignItems: "center",
    borderRadius: 14,
    justifyContent: "center",
    width: "100%",
    marginBottom: 35,
  },

  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default styles;