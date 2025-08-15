import colors from "@/constants/colors";
import { View, Text, StyleSheet } from "react-native";

interface CardEventProps{
    url: string;
    eventName: string;
    cidade: string,
    uf: string,
    disponivel: boolean;
}


export default function CustomCardEvent({url, eventName, cidade, uf, disponivel}: CardEventProps){
    return (
      <View style={styles.containerInfoMaster}>
        <View style={styles.containerInfo}>
          <View style={styles.containerInfoImage}>
            <Text>{url}</Text>
          </View>
          <View style={styles.containerInfoData}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {eventName}
              </Text>
            </View>
            <Text>{cidade + uf}</Text>
          </View>
        </View>
        <Text
          style={{
            width: 15,
            height: 15,
            backgroundColor: disponivel? colors.green: colors.red,
            borderRadius: 100,
            marginTop: 20,
            marginRight: 10,
          }}
        ></Text>
      </View>
    );
}

const styles = StyleSheet.create({
  containerInfoMaster: {
    marginTop: 15,
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
  containerInfoImage: {
    marginRight: 10,
    backgroundColor: colors.red,
    borderRadius: 10,
    width: 100,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  containerInfoData: {
    width: "50%",
    height: "65%",
    justifyContent: "flex-start",
    alignItems: "flex-start",

    marginBottom: 5,
  },
});