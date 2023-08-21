import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { Input } from "@rneui/base";
import axios from "axios";
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
  const [emailValidation, setEmailValidation] = useState(" ");
  const [error, setError] = useState([]);

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  const handleInputChange = (email) => {
    setEmail(email);
    // validate(email);
    setEmailValidation(validateEmail(email));
  };

  const handleSubmit = async () => {
    // validate(email);
    if (emailValidation === true) {
      console.log("email", email);
      try {
        const response = await axios.post(`user/delete-account`, {
          email,
        });
        setSubmitting(false);
        if (response.status === 200) {
          console.log(response);
          navigation.navigate("DeleteProfileOtp", { email });
        }
      } catch (err) {
        console.log("err", err);
        if (err?.response?.status === 400) {
          setError(err?.response?.data?.errors);
        } else if (err?.response?.status === 401) {
          setError([err?.response?.data?.error]);
        } else {
          setError(["Oops, something went wrong"]);
        }
      }
    } else {
      setEmailValidation(validateEmail(email));
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
          <Text style={styles.deleteText}>OTP code sent to email</Text>
          <Input
            // style={styles.input}
            inputContainerStyle={styles.input}
            inputStyle={styles.inputStyle}
            placeholder="email address"
            onChangeText={handleInputChange}
            value={email}
            errorMessage={
              <Text style={styles.errorMessage}>
                {emailValidation ? "" : "Please enter a valid email"}
              </Text>
            }
          />
        </View>
        <Pressable
          style={styles.continueButtonWrapper}
          onPress={handleSubmit}
          // onPress={() => navigation.navigate("DeleteProfileOtp")}
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
    marginVertical: 30,
    marginLeft: 10,
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
    width: "100%",
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
    height: 46,
    justifyContent: "center",
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

export default BarberDeleteOtpEmail;
