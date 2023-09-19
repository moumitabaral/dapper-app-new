import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import BarbarMainStack from "../stack/barbar/Main";
import BarbarBookingStack from "../stack/barbar/Booking";
import BarbarNotificationStack from "../stack/barbar/Notification";
import BarbarChatStack from "../stack/barbar/Chat";
import ProfileScreen from "../../screens/barbar/ProfileScreen";

const BarbarTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#AE8447",
        tabBarInactiveTintColor: "#4A4A4A",
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "Poppins_500Medium",
        },
        tabBarStyle: {
          paddingVertical: 10,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {},
      }}
    >
      <Tab.Screen
        name="Home"
        component={BarbarMainStack}
        options={{
          tabBarLabel: "Home",

          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Task"
        component={BarbarBookingStack}
        options={{
          tabBarLabel: "Task",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-clock-outline"
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={BarbarNotificationStack}
        options={{
          tabBarLabel: "Notification",

          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="bell" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Message"
        component={BarbarChatStack}
        options={{
          tabBarLabel: "Inbox",

          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="envelope" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={20}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 24,
  },
});

export default BarbarTab;