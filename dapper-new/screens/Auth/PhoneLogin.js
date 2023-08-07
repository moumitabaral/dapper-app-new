import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Input, Text } from "@rneui/base";
import SafeAreaView from "react-native-safe-area-view";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "../../utils/index";
import { Image } from "react-native";
import { useState } from "react";

const PhoneLogin = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(" ");
  const [isSubmitting, setSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState([]);

  const validate = (phone) => {
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (!phoneNumberPattern.test(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number");
    } else if (phone.trim() === "") {
      setPhoneError("Phone cannot be empty");
    } else {
      setPhoneError("");
    }
  };
  const handleInputChange = (phone) => {
    setPhone(phone);
    validate(phone);
  };

  const send = async () => {
    setSubmitting(true);
    setHasError(false);
    setError([]);
    try {
      // const response = await axios.post(`/user/login`, {phone, channel: "sms"})
      setSubmitting(false);
      if (response.status === 200) {
        navigation.navigate("OTPVerification", { phone, channel: "sms" });
      }
    } catch (err) {
      setSubmitting(false);
      setHasError(true);
      console.log(err);
      if (err?.response?.status === 400) {
        setError(err?.response?.data?.errors);
      } else if (err?.response?.status === 401) {
        setError([err?.response?.data?.error]);
      } else {
        setError(["Oops, something went wrong"]);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.image}>
          <Image source={require("../../assets/loginlogo.png")} />
        </View>

        <Text h3 h3Style={styles.loginText}>
          Login
        </Text>
        {hasError && (
          <View
            style={{
              backgroundColor: "#fb5151",
              padding: 8,
              marginVertical: 15,
              marginHorizontal: 12,
              borderRadius: 4,
            }}
          >
            {error.map((err, index) => (
              <Text key={index} style={{ color: "white", fontSize: 16 }}>
                {err}
              </Text>
            ))}
          </View>
        )}
        <Input
          placeholder="Phone number"
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          leftIcon={<Feather name="phone" size={20} color="#6C6C6C" />}
          leftIconContainerStyle={styles.leftIconContainerStyle}
          onChangeText={handleInputChange}
          errorMessage={<Text style={styles.errorMessage}>{phoneError}</Text>}
        />
        <Button
          buttonStyle={styles.primaryButtonStyle}
          loading={isSubmitting}
          disabled={isSubmitting}
          onPress={() => send()}
        >
          <Text style={styles.primaryButtonTextStyle}>Log In</Text>
        </Button>
        <View style={styles.dividerText}>
          <Text style={styles.dividerTextStyle}>Or</Text>
        </View>
        <TouchableOpacity
          style={styles.secondaryButtonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("EmailLogin")}
        >
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color="#6c6c6c"
          />
          <Text style={styles.secondaryButtonTitleStyle}>Login with Email</Text>
          <AntDesign
            name="right"
            size={20}
            color="#6c6c6c"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <View style={styles.signupFrame}>
          <Text style={styles.noAccountText}>Don't have an account? </Text>
          <Text
            style={styles.signupText}
            onPress={() => navigation.navigate("SignupChoice")}
          >
            Sign Up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14,
  },
  image: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
  },
  loginContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  loginText: {
    color: "#4A4A4A",
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 20,
    marginHorizontal: 10,
  },
  inputContainerStyle: {
    borderRadius: 8,
    borderColor: "#D8D8D8",
    borderBottomWidth: 1,
    borderWidth: 1,
    marginBottom: 0,
  },
  inputStyle: {
    paddingLeft: 10,
    width: "100%",
    fontSize: 14,
    color: "#575757",
    fontFamily: "Poppins_400Regular",
  },
  leftIconContainerStyle: {
    marginLeft: 10,
  },
  primaryButtonStyle: {
    height: 55,
    borderRadius: 8,
    backgroundColor: "#AE8447",
    marginHorizontal: 10,
    paddingVertical: 16,
  },
  primaryButtonTextStyle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#fff",
  },
  secondaryButtonStyle: {
    height: 55,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#EFEFEF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  secondaryButtonTitleStyle: {
    fontSize: 14,
    color: "#575757",
    fontFamily: "Poppins_400Regular",
  },
  dividerText: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  dividerTextStyle: {
    fontSize: 14,
    color: "#575757",
    fontFamily: "Poppins_400Regular",
  },
  signupFrame: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 24,
  },
  noAccountText: {
    fontSize: 14,
    color: "#575757",
    fontFamily: "Poppins_400Regular",
  },
  signupText: {
    fontSize: 14,
    color: "#171717",
    fontFamily: "Poppins_500Medium",
  },
  skipButtonContainer: {
    flex: 0.15,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  skipButtonWrapper: {
    borderWidth: 1,
    borderColor: "#575757",
    borderRadius: 27,
    width: 128,
  },
  skipButtonText: {
    fontSize: 14,
    color: "#171717",
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    paddingVertical: 10,
  },
  errorMessage: {
    color: "#84202A",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginHorizontal: 10,
    marginBottom: 16,
  },
  displayNone: {
    display: "none",
  },
});

export default PhoneLogin;
