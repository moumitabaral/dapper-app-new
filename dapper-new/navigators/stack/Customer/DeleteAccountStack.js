import { createStackNavigator } from "@react-navigation/stack";
import BarberProfileScreen from "../../../screens/Barber/BarberProfileScreen";
import BarberDeleteYesNo from "../../../screens/Barber/barberDeleteScreens/BarberDeleteYesNo";
import BarberDeleteOtpEmail from "../../../screens/Barber/barberDeleteScreens/BarberDeleteOtpEmail";
import BarberDeleteOtp from "../../../screens/Barber/barberDeleteScreens/BarberDeleteOtp";
import BarberDeleteConfirm from "../../../screens/Barber/barberDeleteScreens/BarberDeleteConfirm";
import BarberDelete from "../../../screens/Barber/barberDeleteScreens/BarberDelete";

const Stack = createStackNavigator();

function DeleteAccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DeleteProfileYesNo" component={BarberDeleteYesNo} />
      <Stack.Screen
        name="DeleteProfileOtpEmail"
        component={BarberDeleteOtpEmail}
      />
      <Stack.Screen name="DeleteProfileOtp" component={BarberDeleteOtp} />
      <Stack.Screen
        name="DeleteProfileConfirm"
        component={BarberDeleteConfirm}
      />
      <Stack.Screen name="Delete" component={BarberDelete} />
    </Stack.Navigator>
  );
}

export default DeleteAccountStack;
