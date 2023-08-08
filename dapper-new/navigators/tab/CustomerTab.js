import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



const CustomerTab = () => {

    const Tab = createBottomTabNavigator();

    return (
        null
    )

    // return (
    //     <Tab.Navigator
    //         screenOptions={{
    //             keyboardHidesTabBar: true,
    //             tabBarActiveTintColor: "#AE8447",
    //             tabBarInactiveTintColor: "black",
    //             headerShown: false,
    //             tabBarHideOnKeyboard: true
    //         }}
    //     >
    //         <Tab.Screen
    //             name="Home"
    //             component={CustomerMainStack}
    //             options={{
    //                 tabBarLabel: 'Home',
    //                 tabBarIcon: ({ color, size }) => (
    //                     <Ionicons name="home-outline" size={24} color={color} />
    //                 ),
    //             }}
    //         />

    //         <Tab.Screen
    //             name="Booking"
    //             component={CustomerBookingStack}
    //             options={{
    //                 tabBarLabel: 'Booking',
    //                 tabBarIcon: ({ color, size }) => (
    //                     <MaterialCommunityIcons name="calendar-clock-outline" size={24} color={color} />
    //                 ),
    //             }}
    //         />

    //         <Tab.Screen
    //             name="Notification"
    //             component={ShopStack}
    //             options={{
    //                 tabBarLabel: 'Shop',
    //                 tabBarIcon: ({ color, size }) => (
    //                     <Feather name="shopping-bag" size={24} color={color} />
    //                 ),
    //             }}
    //         />

    //         <Tab.Screen
    //             name="Inbox"
    //             component={CustomerChatStack}
    //             options={{
    //                 tabBarLabel: 'Inbox',
    //                 tabBarIcon: ({ color, size }) => (
    //                     <AntDesign name="message1" size={24} color={color} />
    //                 ),
    //             }}
    //         />

    //         <Tab.Screen
    //             name="Profile"
    //             component={CustomerProfileStack}
    //             options={{
    //                 tabBarLabel: 'Profile',
    //                 tabBarIcon: ({ color, size }) => (
    //                     <MaterialCommunityIcons name="account-circle-outline" size={30} color={color} />
    //                 ),
    //             }}
    //         />
    //     </Tab.Navigator>
    // )
}

export default CustomerTab