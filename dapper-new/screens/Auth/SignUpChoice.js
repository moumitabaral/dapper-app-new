import React from "react";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupChoice({ navigation }) {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={styles.image}>
        <Image source={require("../../assets/loginlogo.png")} />
      </View>
      <View style={styles.signupContainer}>
        <Pressable
          style={styles.barberContainer}
          onPress={() => navigation.push("BarberSignUp", { role: "BARBAR" })}
        >
          <Image source={require("../../assets/Barber.png")} />
          <Text style={styles.signupchoiceText}>I’m a Barber</Text>
        </Pressable>
        <Pressable
          style={styles.customerContainer}
          onPress={() => navigation.push("CustomerSignUp", { role: "CUSTOMER" })}
        >
          <Image source={require("../../assets/Customer.png")} />
          <Text style={[styles.signupchoiceText, styles.customerTextcolor]}>
            I need a Barber
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  barberContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#AE8447",
    width: "48%",
    height: 138,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  signupchoiceText: {
    fontSize: 16,
    color: "#6C6C6C",
    fontFamily: "Poppins_400Regular",
  },
  image: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 120,
    marginTop: 68,
  },
  customerContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#AE8447",
    width: "48%",
    height: 138,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#AE8447",
  },
  customerTextcolor: {
    color: "#fff",
  },
});
