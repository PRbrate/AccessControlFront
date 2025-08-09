import { StyleSheet} from "react-native";
import Colors from "@/constants/colors";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: Colors.gray,
  },
  header: {
    paddingLeft: 14,
    paddingRight: 14,
    height: 150,
    display: "flex",
    marginBottom: 100,
    alignItems: "center",
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 50,
    width: "100%",
    textAlign: "center",
  },
  form: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingLeft: 14,
    paddingRight: 14,
    gap: 15,
  },
  tumb: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: Colors.black,
  },
  label: {
    color: Colors.blackBlue,
    marginBottom: 4,
    marginLeft: 10,
  },
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 8,
    height: 50,
  },
  inputlabel: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: Colors.principalBlue,
    paddingLeft: 14,
    paddingBottom: 14,
    paddingTop: 14,
    alignItems: "center",
    borderRadius: 14,
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  link: {
    textAlign: "center",
  },
});

export default styles;