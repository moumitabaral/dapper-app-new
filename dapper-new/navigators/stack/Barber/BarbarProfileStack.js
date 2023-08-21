import { createStackNavigator } from "@react-navigation/stack";
import BarberProfileScreen from "../../../screens/Barber/BarberProfileScreen";
import DeleteAccountStack from "./DeleteAccountStack";

const Stack = createStackNavigator();

function BarberProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BarberProfile" component={BarberProfileScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountStack} />
    </Stack.Navigator>
  );
}

export default BarberProfileStack;
