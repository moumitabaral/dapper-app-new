import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './navigators/stack/MainStack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from './utils';

import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import BarberBooking from './screens/customer/BarberBooking';

export const StoreContext = React.createContext(null)

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  const [isTouch, setTouch] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true)

  const [state, setState] = React.useState({
    user: null,
    token: null,
    loggedIn: false,
    shops: [],
    services: [],
    locations: [],
    customers: [],
    searchAddress: null,
    searchLat: null,
    searchLong: null,
  })

  React.useEffect(() => {
    AsyncStorage.removeItem("isTouch")
    if(state.token) {
      AsyncStorage.setItem("user", JSON.stringify(state.user))
      AsyncStorage.setItem("token", state.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    }
  }, [state.token])
  
  if (!fontsLoaded) {
    return <AppLoading />
  }
  else {
    return (
      <NavigationContainer>
        <StoreContext.Provider value={{state, setState}}> 
          <MainStack />
          {/* <BarberBooking /> */}
        </StoreContext.Provider>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
