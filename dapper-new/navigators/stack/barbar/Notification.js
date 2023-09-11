import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/stack';
import Notification from '../../../screens/Notificatation';

export default function BarbarNotificationStack () {
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator 
            initialRouteName={"NotificationScreen"} 
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
                <Stack.Screen name="NotificationScreen" component={Notification} options={{title: "Notification"}} />
            </Stack.Navigator>
    );
}