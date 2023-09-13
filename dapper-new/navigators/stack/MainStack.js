import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../../screens/SplashScreen";
import EmailLogin from "../../screens/Auth/EmailLogin";
import PhoneLogin from "../../screens/Auth/PhoneLogin";
import OTPVerification from "../../screens/Auth/OTPVerification";
import SignupChoice from "../../screens/Auth/SignUpChoice";
import SignUp from "../../screens/Auth/BarberSignUp";
import ModalComponent from "../../component/Modal/ModalComponent";
import MainScreen from "../../screens/MainScreen";
import AppLoading from "../../screens/AppLoading";
import BarberSignUp from "../../screens/Auth/BarberSignUp";
import CustomerSignUp from "../../screens/Auth/CustomerSignUp";

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Modal" component={ModalComponent} /> */}
      <Stack.Screen name="AppLoading" component={AppLoading} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="EmailLogin" component={EmailLogin} />
      <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="SignupChoice" component={SignupChoice} />
      <Stack.Screen name="BarberSignUp" component={BarberSignUp} />
      <Stack.Screen name="CustomerSignUp" component={CustomerSignUp} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
    </Stack.Navigator>
  );
}

export default MainStack;
