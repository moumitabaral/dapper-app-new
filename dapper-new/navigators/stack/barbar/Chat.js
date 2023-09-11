import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/stack';
import ChatListScreen from '../../../screens/ChatListScreen';
import ChatScreen from '../../../screens/ChatScreen';

export default function BarbarChatStack () {
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator 
            initialRouteName={"ChatListScreen"} 
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
                <Stack.Screen name="ChatListScreen" component={ChatListScreen} options={{title: "Message"}} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}} />
            </Stack.Navigator>
    );
}