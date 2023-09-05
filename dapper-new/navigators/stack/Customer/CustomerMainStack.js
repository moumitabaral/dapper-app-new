import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../../screens/customer/HomeScreen";


const Stack = createStackNavigator();

function CustomerMainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default CustomerMainStack;
