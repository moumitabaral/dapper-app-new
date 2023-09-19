import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppointmentDetailsScreen from '../../../screens/barbar/AppointmentDetailsScreen';
import UpcommingAppointmentScreen from '../../../screens/barbar/UpcommingAppointmentScreen';
import JobCompleteScreen from '../../../screens/barbar/JobCompleteScreen';
// import ChatScreen from '../../../screens/ChatScreen';
// import LiveTrackScreen from '../../../screens/LiveTrackScreen';

export default function BarbarBookingStack () {
    const Stack = createStackNavigator();
    
    return (
        <Stack.Navigator 
            initialRouteName={"UpcommingAppointmentScreen"} 
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="UpcommingAppointmentScreen" component={UpcommingAppointmentScreen} options={{title: "Appointments"}} />
            <Stack.Screen name="AppointmentDetailScreen" component={AppointmentDetailsScreen} options={{title: "Appointment Details"}} />
            {/* <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}} /> */}
            <Stack.Screen name="JobCompleteScreen" component={JobCompleteScreen} />
            {/* <Stack.Screen name="LiveTrack" component={LiveTrackScreen} options={{title: "Live Tracking"}} /> */}
        </Stack.Navigator>
    );
}