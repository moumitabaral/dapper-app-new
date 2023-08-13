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

function BarberDeleteOtpEmail({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(" ");

  const validate = (email) => {
    if (!email.includes("@")) {
      setEmailError("Invalid Email address.");
    } else if (!email.includes("gmail")) {
      setEmailError("This email doesn't contain 'gmail' in it.");
    } else if (email.length === 0) {
      setEmailError("Email is required");
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email can not contan spaces");
    } else {
      setEmailError("");
    }
  };
  const handleInputChange = (email) => {
    setEmail(email);
    validate(email);
  };

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
          <Text style={styles.deleteText}>OTP code sent to email</Text>
          <TextInput
            style={styles.input}
            placeholder="email address"
            onChangeText={handleInputChange}
          />
        </View>
        <Pressable
          style={styles.continueButtonWrapper}
          onPress={() => navigation.navigate("DeleteProfileOtp")}
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
    marginVertical: 30,
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
    height: 46,
    justifyContent: "center",
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

export default BarberDeleteOtpEmail;
