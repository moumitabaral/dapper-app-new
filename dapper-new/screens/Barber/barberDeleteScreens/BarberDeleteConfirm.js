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
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import { appColors } from "../../../config/theme";

function BarberDeleteConfirm({ navigation }) {
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
            <View style={[styles.modalIcon, { backgroundColor: "#FE5353" }]}>
              <Image source={require("../../../assets/bi_trash.png")} />
            </View>
            <Text style={styles.deleteTitle}>DELETE ACCOUNT?</Text>
            <Text style={styles.deleteText}>
              Your will permanently lost your account
            </Text>
            <View style={styles.buttonContainerWrapper}>
              <Pressable
                style={styles.noButtonContainer}
                onPress={() => navigation.goBack()}
              >
                <Text style={[styles.buttonLabel, styles.noButtonColor]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={styles.yesButtonContainer}
                onPress={() => navigation.navigate("Delete")}
              >
                <Text style={[styles.buttonLabel, styles.yesButtonColor]}>
                  Confirm
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
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  deleteTitle: {
    fontSize: 20,
    color: "#FE5353",
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    marginTop: 40,
  },
  deleteText: {
    fontSize: 13,
    color: "#575757",
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
    width: 133,
    borderColor: "#EEEAEA",
    backgroundColor: "#EEEAEA",
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
    width: 133,
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

  modalIcon: {
    backgroundColor: appColors.neutral,
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -50,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default BarberDeleteConfirm;
