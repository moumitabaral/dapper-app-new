import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function CustomerBookingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
    </Stack.Navigator>
  );
}

export default CustomerBookingStack;
