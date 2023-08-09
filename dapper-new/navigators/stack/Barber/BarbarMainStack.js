import { createStackNavigator } from "@react-navigation/stack";

import BarberHomeScreen from "../../../screens/Barber/BarberHomeScreen";
import BarberSetWorkTime from "../../../screens/Barber/BarberSetWorkTime";

const Stack = createStackNavigator();

function BarberMainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BarberMain" component={BarberHomeScreen} />
      <Stack.Screen name="SetWorkTime" component={BarberSetWorkTime} />
    </Stack.Navigator>
  );
}

export default BarberMainStack;
