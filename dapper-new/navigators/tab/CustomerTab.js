import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomerNotificationStack from '../stack/Customer/CustomerNotificationStack';
import CustomerChatStack from '../stack/Customer/CustomerChatStack';
import CustomerProfileStack from '../stack/Customer/CustomerProfileStack';
import CustomerBookingStack from '../stack/Customer/CustomerBookingStack';
import CustomerMainStack from '../stack/Customer/CustomerMainStack';



const CustomerTab = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                keyboardHidesTabBar: true,
                tabBarActiveTintColor: "#AE8447",
                tabBarInactiveTintColor: "black",
                headerShown: false,
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen
                name="Home"
                component={CustomerMainStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={20} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Booking"
                component={CustomerBookingStack}
                options={{
                    tabBarLabel: 'Booking',
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
                component={CustomerNotificationStack}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="bell" size={20} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Message"
                component={CustomerChatStack}
                options={{
                    tabBarLabel: 'Inbox',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="envelope" size={20} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={CustomerProfileStack}
                options={{
                    tabBarLabel: 'Profile',
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
    )
}

export default CustomerTab