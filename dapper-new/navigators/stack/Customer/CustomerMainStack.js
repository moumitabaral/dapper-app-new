import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../../screens/customer/HomeScreen";
import SearchScreen from "../../../screens/customer/SearchScreen";
import ShopScreen from "../../../screens/customer/ShopScreen";
import BarberBooking from "../../../screens/customer/BarberBooking";


const Stack = createStackNavigator();

function CustomerMainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="ShopScreen" component={ShopScreen} />
      <Stack.Screen name="AppointmentBooking" component={BarberBooking} />
    </Stack.Navigator>
  );
}

export default CustomerMainStack;
