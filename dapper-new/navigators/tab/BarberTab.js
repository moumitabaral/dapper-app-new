import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import BarberMainStack from "../stack/Barber/BarbarMainStack";
import BarberBookingStack from "../stack/Barber/BarbarBookingStack";
import BarberNotificationStack from "../stack/Barber/BarbarNotificationStack";
import BarberChatStack from "../stack/Barber/BarbarChatStack";
import BarberProfileStack from "../stack/Barber/BarbarProfileStack";
import { StyleSheet } from "react-native";

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
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {},
      }}
    >
      <Tab.Screen
        name="Home"
        component={BarberMainStack}
        options={{
          tabBarLabel: "Home",

          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Task"
        component={BarberBookingStack}
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
        component={BarberNotificationStack}
        options={{
          tabBarLabel: "Notification",

          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="bell" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Message"
        component={BarberChatStack}
        options={{
          tabBarLabel: "Message",

          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="envelope" size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={BarberProfileStack}
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
