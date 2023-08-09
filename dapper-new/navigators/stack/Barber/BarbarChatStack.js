import { createStackNavigator } from "@react-navigation/stack";
import BarberChatScreen from "../../../screens/Barber/BarberChatScreen";

const Stack = createStackNavigator();

function BarberChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BarberChat" component={BarberChatScreen} />
    </Stack.Navigator>
  );
}

export default BarberChatStack;
