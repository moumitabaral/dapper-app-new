import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BarberBooking from "./screens/customer/BarberBooking";

export default function App() {
  let [fontsLoaded] = useFonts({
    "poppins-regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    "poppins-medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    "poppins-semibold": require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <BarberBooking />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
