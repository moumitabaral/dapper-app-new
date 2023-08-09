import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const BarbarTab = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#AE8447",
                tabBarInactiveTintColor: "black",
                headerShown: false,
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen
                name="Home"
                component={BarbarMainStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={20} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Booking"
                component={BarbarBookingStack}
                options={{
                    tabBarLabel: 'Booking',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-clock-outline" size={20} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Notification"
                component={BarbarNotificationStack}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="bell" size={20} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Inbox"
                component={BarbarChatStack}
                options={{
                    tabBarLabel: 'Inbox',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="message1" size={20} color={color} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={BarbarProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle-outline" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BarbarTab