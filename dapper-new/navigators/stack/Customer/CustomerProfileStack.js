import { createStackNavigator } from "@react-navigation/stack";
import DeleteAccountStack from "./DeleteAccountStack";
import CustomerProfileScreen from "../../../screens/customer/CustomerProfileScreen";

const Stack = createStackNavigator();

function CustomerProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CustomerProfile" component={CustomerProfileScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountStack} />
    </Stack.Navigator>
  );
}

export default CustomerProfileStack;
