import { createStackNavigator } from "@react-navigation/stack";
import BarberBookingScreen from "../../../screens/Barber/BarberBookingScreen";

const Stack = createStackNavigator();

function BarberBookingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BarberBooking" component={BarberBookingScreen} />
    </Stack.Navigator>
  );
}

export default BarberBookingStack;
