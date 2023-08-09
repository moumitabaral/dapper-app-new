import { createStackNavigator } from "@react-navigation/stack";
import BarberProfileScreen from "../../../screens/Barber/BarberProfileScreen";

const Stack = createStackNavigator();

function BarberProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BarberProfile" component={BarberProfileScreen} />
    </Stack.Navigator>
  );
}

export default BarberProfileStack;
