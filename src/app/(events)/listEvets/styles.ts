import { StyleSheet } from "react-native";
import colors from "@/constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingBottom: 25
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 14,
    height: 150,
    display: "flex",
    alignItems: "center",
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  containerSeach: {
    paddingRight: 30,
    flexWrap: "nowrap",
    gap: 4,
    flex: 1,
    flexDirection: "row",
    borderRadius: 40,
    borderColor: colors.gray,
    paddingLeft: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    maxHeight: 45,
    height: 45,
  },
  containerInfoMaster: {
    marginTop: 20,
    backgroundColor: "#ebebeb",
    borderRadius: 10,
    paddingLeft: 5,
    flexDirection: "row",
  },
  containerInfo: {
    height: 100,
    width: "90%",
    flexDirection: "column",
    flexWrap: "wrap",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
