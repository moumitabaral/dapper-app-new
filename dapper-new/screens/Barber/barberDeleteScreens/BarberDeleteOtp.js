import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function BarberDeleteOtp({ navigation }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={styles.topBar}>
        <Entypo
          name="chevron-thin-left"
          size={24}
          color="#575757"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.firstHlaf}>
        <View>
          <Text style={styles.deleteText}>Enter OTP</Text>
          <Text style={styles.deleteParaText}>
            Are you sure this cannot be undone
          </Text>
          <TextInput style={styles.input} />
        </View>
        <Pressable
          style={styles.continueButtonWrapper}
          onPress={() => navigation.navigate("DeleteProfileConfirm")}
        >
          <Text style={[styles.buttonLabel, styles.yesButtonColor]}>
            Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },

  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },

  firstHlaf: {
    flex: 1,
    justifyContent: "space-between",
  },

  containerStyle: {
    borderRadius: 8,
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 14,
    paddingVertical: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  deleteText: {
    fontSize: 24,
    color: "#263238",
    fontFamily: "Poppins_500Medium",
    marginTop: 30,
  },
  deleteParaText: {
    fontSize: 14,
    color: "#263238",
    fontFamily: "Poppins_400Regular",
    marginBottom: 14,
  },
  yesButtonContainer: {
    width: 113,
    borderColor: "#FE5353",
    backgroundColor: "#FE5353",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
  },
  yesButtonColor: {
    color: "#fff",
  },
  noButtonColor: {
    color: "#263238",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 8,
    height: 46,
    fontSize: 14,
    color: "#263238",
    fontFamily: "Poppins_400Regular",
    paddingHorizontal: 14,
  },
  continueButtonWrapper: {
    borderColor: "#FE5353",
    backgroundColor: "#FE5353",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 11,
  },
  buttonLabel: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  yesButtonColor: {
    color: "#fff",
  },
});

export default BarberDeleteOtp;
