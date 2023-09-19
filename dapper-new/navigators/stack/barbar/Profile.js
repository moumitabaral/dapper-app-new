import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditStorefront from '../../../screens/barbar/EditStorefront';
import ProfileScreen from '../../../screens/barbar/ProfileScreen';
import ListServiceScreen from '../../../screens/barbar/ListServiceScreen';
import AddServiceScreen from '../../../screens/barbar/AddServiceScreen';
import EditServiceScreen from '../../../screens/barbar/EditServiceScreen';
import EditProfile from '../../../screens/barbar/EditProfileScreen';
import SearchScreen from '../../../screens/SearchScreen';

export default function BarbarProfileStack() {
    const Stack = createStackNavigator();
    
    return (
        <Stack.Navigator 
            initialRouteName={"ProfileScreen"} 
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
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{title: "Profile"}} />
            <Stack.Screen name="EditProfileScreen" component={EditProfile} options={{title: "Edit Profile"}} />
            <Stack.Screen name="EditStorefrontScreen" component={EditStorefront} options={{title: "Edit Shop"}} />
            <Stack.Screen name="ListServiceScreen" component={ListServiceScreen} options={{title: "Services"}} />
            <Stack.Screen name="AddServiceScreen" component={AddServiceScreen} options={{title: "Add Service"}} />
            <Stack.Screen name="EditServiceScreen" component={EditServiceScreen} options={{title: "Edit Service"}} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{title: "Set Address"}} />
        </Stack.Navigator>
    );
}