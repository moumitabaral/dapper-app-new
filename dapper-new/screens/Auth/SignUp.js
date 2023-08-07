import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { Image } from "react-native";
import { Input } from "react-native-elements";
import { useState } from "react";
import { Button } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";

export default function SignUp(props) {
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
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.signupWrapper}>
          <View style={styles.topBar}>
            <Entypo name="chevron-thin-left" size={24} color="#575757" />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.image}>
              <Image source={require("../../assets/upload.png")} />
              <Text style={styles.profileText}>Add Profile Photo</Text>
            </View>
            <Text style={styles.loginText}>Signup</Text>
            <Input
              placeholder="First Name"
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              onChangeText={handleInputChange}
              errorMessage={
                <Text style={styles.errorMessage}>{phoneError}</Text>
              }
            />
            <Input
              placeholder="Last Name"
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              onChangeText={handleInputChange}
              errorMessage={
                <Text style={styles.errorMessage}>{phoneError}</Text>
              }
            />
            <Input
              placeholder="Email"
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              onChangeText={handleInputChange}
              errorMessage={
                <Text style={styles.errorMessage}>{phoneError}</Text>
              }
            />
            <Input
              placeholder="41 234 567"
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              onChangeText={handleInputChange}
              errorMessage={
                <Text style={styles.errorMessage}>{phoneError}</Text>
              }
            />
            <Input
              placeholder="Email"
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              onChangeText={handleInputChange}
              errorMessage={
                <Text style={styles.errorMessage}>{phoneError}</Text>
              }
            />
            <Input
              placeholder="41 234 567"
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              onChangeText={handleInputChange}
              errorMessage={
                <Text style={styles.errorMessage}>{phoneError}</Text>
              }
            />
            <Button
              buttonStyle={styles.primaryButtonStyle}
              loading={isSubmitting}
              disabled={isSubmitting}
              // onPress={() => send()}
            >
              <Text style={styles.primaryButtonTextStyle}>Sign up</Text>
            </Button>
            <View style={styles.signupFrame}>
              <Text style={styles.noAccountText}>
                Already have an account?{" "}
              </Text>
              <Text
                style={styles.signupText}
                onPress={() => navigation.navigate("SignupChoice")}
              >
                Sign In
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingBottom: 30,
  },
  image: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 20,
    gap: 8,
  },
  profileText: {
    fontSize: 14,
    color: "#575757",
    fontFamily: "Poppins_400Regular",
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
});
