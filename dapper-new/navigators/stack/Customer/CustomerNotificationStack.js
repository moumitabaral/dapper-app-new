import { createStackNavigator } from "@react-navigation/stack";
import BarberNotificationScreen from "../../../screens/Barber/BarberNotificationScreen";

const Stack = createStackNavigator();

function CustomerNotificationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="BarberNotification"
        component={BarberNotificationScreen}
      />
    </Stack.Navigator>
  );
}

export default CustomerNotificationStack;
