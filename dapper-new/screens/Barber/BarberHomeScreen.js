import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { StoreContext } from "../../App";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "../../utils";

function BarberHomeScreen({ navigation }) {
  const { state, setState } = React.useContext(StoreContext);
  const [isLoading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState({
    total_income: 0,
    total_cancel: 0,
    total_pending: 0,
    total_completed: 0,
  });
  const loadData = () => {
    setLoading(true);
    axios
      .get(`/shop/statistics/`)
      .then((response) => {
        console.log(response)
        if (response.status == 200) {
          setData({
            total_income: response.data.shop.total_income,
            total_cancel: response.data.shop.total_cancel,
            total_pending: response.data.shop.total_pending,
            total_completed: response.data.shop.total_completed,
          });
        }
      })
      .catch((err) => {
        console.log(err.response.data)
      }) 
      .finally(() => setLoading(false));
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadData();
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={"#3863CB"} />
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            <Text style={styles.goodmorningText}>Good Morning</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <TouchableOpacity style={styles.itemContainer} activeOpacity={1}>
                <View style={styles.itemContainerFirstElement}>
                  <Image source={require("../../assets/wallet.png")} />
                  <View>
                    <Text style={styles.stats}>$ {data.total_income}</Text>
                    <Text style={styles.desc}>Amount earned last month</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.itemContainer}
                activeOpacity={1}
                onPress={() => navigation.navigate("CompletedRequestScreen")}
              >
                <View style={styles.itemContainerFirstElement}>
                  <Image source={require("../../assets/check.png")} />
                  <View>
                    <Text style={styles.stats}>{data.total_completed}</Text>
                    <Text style={styles.desc}>Completed</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.itemContainer}
                activeOpacity={1}
                onPress={() => navigation.navigate("PendingRequestScreen")}
              >
                <View style={styles.itemContainerFirstElement}>
                  <Image source={require("../../assets/wall-clock.png")} />
                  <View>
                    <Text style={styles.stats}>{data.total_pending}</Text>
                    <Text style={styles.desc}>Pending request</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.itemContainer}
                activeOpacity={1}
                onPress={() => navigation.navigate("CancelRequestScreen")}
              >
                <View style={styles.itemContainerFirstElement}>
                  <Image source={require("../../assets/close.png")} />
                  <View>
                    <Text style={styles.stats}>{data.total_cancel}</Text>
                    <Text style={styles.desc}>Cancelled request</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => navigation.navigate("SetWorkTime")}
            >
              <Text style={styles.buttonText}>Set Work time</Text>
              <Image source={require("../../assets/arrow-left.png")} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: "#fff",
    paddingBottom: 25,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  avatar: {
    height: 40,
    width: 40,
  },
  itemContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 72,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  itemContainerFirstElement: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  stats: {
    fontSize: 16,
    color: "#4A4A4A",
    fontFamily: "Poppins_500Medium",
    // paddingHorizontal: 20,
  },
  desc: {
    fontSize: 14,
    color: "#6C6C6C",
    fontFamily: "Poppins_400Regular",
    // paddingHorizontal: 20,
  },

  goodmorningText: {
    fontSize: 24,
    color: "#4A4A4A",
    fontFamily: "Poppins_500Medium",
    paddingBottom: 20,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#AE8447",
    borderRadius: 100,
    height: 52,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins_500Medium",
  },
});
export default BarberHomeScreen;
