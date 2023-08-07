import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";

function BarberBooking(props) {
  const [index, setIndex] = React.useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selected, setSelected] = React.useState("");

  const data = [
    { key: "1", value: "1 Person" },
    { key: "2", value: "2 Person" },
    { key: "3", value: "3 Person" },
    { key: "4", value: "4 Person" },
  ];

  const services = [
    { key: "1", value: "Trim/Cut Head Hair" },
    { key: "2", value: "Shave" },
  ];

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.firstHlaf}>
          <View style={styles.topBar}>
            <Entypo name="chevron-thin-left" size={24} color="#575757" />
            <Text style={styles.topBarText}>Schedule</Text>
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Select date</Text>

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
                textDayFontFamily: "poppins-regular",
                textMonthFontFamily: "poppins-medium",
                textDayHeaderFontFamily: "poppins-regular",
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
            <View style={styles.labelWrapper}>
              <Text style={[styles.label]}>Pick the Quantity </Text>
              <Image source={require("../../assets/exclamation-mark.png")} />
            </View>
            <MultipleSelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              fontFamily="poppins-regular"
              boxStyles={styles.boxStyles}
              dropdownTextStyles={styles.selectLabelStyle}
              inputStyles={styles.selectLabelStyle}
              searchicon={
                <FontAwesome5 name="chevron-down" size={13} color={"#6C6C6C"} />
              }
              search={false}
            />
          </View>
          <View style={styles.formControl}>
            <View style={styles.labelWrapper}>
              <Text style={[styles.label]}>Number of services required </Text>
            </View>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={services}
              save="value"
              fontFamily="poppins-regular"
              boxStyles={styles.boxStyles}
              dropdownTextStyles={styles.selectLabelStyle}
              inputStyles={styles.selectLabelStyle}
              searchicon={
                <FontAwesome5 name="chevron-down" size={13} color={"#6C6C6C"} />
              }
              search={false}
            />
          </View>
          <View>
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
    gap: 16,
  },
  topBarText: {
    fontFamily: "poppins-medium",
    fontSize: 16,
    color: "#4A4A4A",
  },
  labelWrapper: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontFamily: "poppins-medium",
    fontSize: 14,
    color: "#4A4A4A",
  },
  calenderStyle: {
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "poppins-regular",
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
    fontFamily: "poppins-regular",
  },
  continueButton: {
    backgroundColor: "#AE8447",
    borderRadius: 120,
    padding: 15,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "poppins-semibold",
    textAlign: "center",
  },
});

export default BarberBooking;
