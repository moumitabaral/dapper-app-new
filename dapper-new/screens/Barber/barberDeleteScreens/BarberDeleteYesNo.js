import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
} from "react-native";
import { Calendar } from "react-native-calendars";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";

function BarberDeleteYesNo({ navigation }) {
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
          <View style={styles.containerStyle}>
            <Text style={styles.deleteText}>
              Are you sure you want to delete?
            </Text>
            <View style={styles.buttonContainerWrapper}>
              <Pressable style={styles.noButtonContainer}>
                <Text style={[styles.buttonLabel, styles.noButtonColor]}>
                  No
                </Text>
              </Pressable>
              <Pressable
                style={styles.yesButtonContainer}
                onPress={() => navigation.navigate("DeleteProfileOtpEmail")}
              >
                <Text style={[styles.buttonLabel, styles.yesButtonColor]}>
                  Yes
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
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
    justifyContent: "center",
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
    fontSize: 18,
    color: "#263238",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  noButtonContainer: {
    width: 113,
    borderColor: "#263238",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
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
});

export default BarberDeleteYesNo;
