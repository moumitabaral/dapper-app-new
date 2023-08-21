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
import { Input } from "react-native-elements";

function BarberDeleteOtp({ navigation }) {
  const [otp, setOTP] = useState("");
  const [isValidOTP, setIsValidOTP] = useState(false);

  const validateOTP = (otp) => {
    // Regular expression for a 4-digit OTP
    const otpRegex = /^[0-9]{4}$/;
    return otpRegex.test(otp);
  };

  const handleOTPChange = (newOTP) => {
    setOTP(newOTP);
    setIsValidOTP(validateOTP(newOTP));
  };

  const handleSubmit = () => {
    if (isValidOTP) {
      console.log(otp);
      navigation.navigate("DeleteProfileConfirm");
    } else {
      setIsValidOTP(validateOTP(newOTP));
    }
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
          <Text style={styles.deleteText}>Enter OTP</Text>
          <Text style={styles.deleteParaText}>
            Are you sure this cannot be undone
          </Text>
          <Input
            inputContainerStyle={styles.input}
            inputStyle={styles.inputStyle}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={handleOTPChange}
            errorMessage={
              <Text style={styles.errorMessage}>
                {isValidOTP ? "" : "Please enter a valid 4-digit OTP"}
              </Text>
            }
          />
        </View>
        <Pressable
          style={styles.continueButtonWrapper}
          onPress={handleSubmit} //
          disabled={!isValidOTP}
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
    marginLeft: 10,
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
    marginHorizontal: 10,
  },
  deleteParaText: {
    fontSize: 14,
    color: "#263238",
    fontFamily: "Poppins_400Regular",
    marginBottom: 14,
    marginHorizontal: 10,
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
  },
  inputStyle: {
    fontSize: 14,
    color: "#263238",
    fontFamily: "Poppins_400Regular",
    paddingHorizontal: 14,
  },
  errorMessage: {
    color: "#84202A",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginHorizontal: 10,
    marginBottom: 16,
  },
  continueButtonWrapper: {
    borderColor: "#FE5353",
    backgroundColor: "#FE5353",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 11,
    marginHorizontal: 10,
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
