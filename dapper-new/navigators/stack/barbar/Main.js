import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/stack';
import MainScreen from '../../../screens/barbar/MainScreen';
import PendingRequest from '../../../screens/barbar/PendingRequestScreen';
import AppointmentDetailsScreen from '../../../screens/barbar/AppointmentDetailsScreen';
import CompletedRequest from '../../../screens/barbar/CompletedRequestScreen';
import CancelRequest from '../../../screens/barbar/CancelRequestScreen';
import ChatScreen from '../../../screens/ChatScreen';
import LiveTrackScreen from '../../../screens/LiveTrackScreen';

export default function BarbarMainStack () {
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator 
        initialRouteName={"MainScreen"} 
        screenOptions={{
            headerStyle: {
                backgroundColor: '#0088E0',
            },
            headerTintColor: 'white',
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Stack.Screen name="MainScreen" component={MainScreen} options={{title: "Home"}} />
            <Stack.Screen name="PendingRequestScreen" component={PendingRequest} options={{title: "Pending Request"}} />
            <Stack.Screen name="CompletedRequestScreen" component={CompletedRequest} options={{title: "Completed Request"}} />
            <Stack.Screen name="CancelRequestScreen" component={CancelRequest} options={{title: "Cancel Request"}} />
            <Stack.Screen name="AppointmentDetailScreen" component={AppointmentDetailsScreen} options={{title: "Appointment Details"}} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}} />
            <Stack.Screen name="LiveTrack" component={LiveTrackScreen} options={{title: "Live Tracking"}} />
        </Stack.Navigator>
    );
}