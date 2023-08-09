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

function BarberSetWorkTime({ navigation }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.firstHlaf}>
          <View style={styles.topBar}>
            <Entypo
              name="chevron-thin-left"
              size={24}
              color="#575757"
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.topBarText}>Schedule</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.availableForWorkText}>
              Are you available for work
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#AE8447" }}
              thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Set date</Text>

            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
              }}
              style={styles.calenderStyle}
              arrowsHitSlop={1}
              renderArrow={(direction) =>
                direction === "left" ? (
                  <Entypo name="chevron-thin-left" size={15} color="#6C6C6C" />
                ) : (
                  <Entypo name="chevron-thin-right" size={15} color="#6C6C6C" />
                )
              }
              theme={{
                textDayFontFamily: "Poppins_400Regular",
                textMonthFontFamily: "Poppins_500Medium",
                textDayHeaderFontFamily: "Poppins_400Regular",
                textDayFontSize: 13,
                textMonthFontSize: 15,
                textDayHeaderFontSize: 13,
                selectedDayBackgroundColor: "#AE8447",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#AE8447",
              }}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Set Time</Text>
            <View style={styles.inputWrapperRow}>
              <TextInput
                style={styles.formControlInput}
                placeholder="09:00 AM"
              />
              <Text style={styles.toText}>To</Text>
              <TextInput
                style={styles.formControlInput}
                placeholder="02:00 PM"
              />
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable style={styles.additionTimeButton}>
              <Text style={styles.additionTimeButtonText}>
                Add additional time brackets
              </Text>
            </Pressable>
            <Pressable style={styles.continueButton}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
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
  // firstHlaf: {
  //   flex: 0.4,
  // },
  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 32,
    gap: 0,
  },
  topBarText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#6C6C6C",
    flexGrow: 1,
    textAlign: "center",
  },
  labelWrapper: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#4A4A4A",
    marginBottom: 12,
  },
  calenderStyle: {
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "Poppins_400Regular",
  },
  boxStyles: {
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 8,
  },
  formControl: {
    marginBottom: 21,
  },
  selectLabelStyle: {
    fontSize: 14,
    color: "#6C6C6C",
    fontFamily: "Poppins_400Regular",
  },
  continueButton: {
    backgroundColor: "#AE8447",
    borderRadius: 120,
    padding: 15,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 56,
    paddingHorizontal: 15,
    marginBottom: 23,
  },
  availableForWorkText: {
    fontSize: 16,
    color: "#6C6C6C",
    fontFamily: "Poppins_400Regular",
  },
  inputWrapperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  formControlInput: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 56,
    width: "43%",
    fontSize: 16,
    color: "#6C6C6C",
    fontFamily: "Poppins_400Regular",
    paddingHorizontal: 20,
    textAlign: "center",
    height: 52,
  },
  toText: {
    fontSize: 18,
    color: "#6C6C6C",
    fontFamily: "Poppins_400Regular",
  },
  additionTimeButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 44,
    padding: 15,
  },
  additionTimeButtonText: {
    fontSize: 14,
    color: "#000",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  buttonWrapper: {
    gap: 16,
    marginTop: 80,
  },
});

export default BarberSetWorkTime;
