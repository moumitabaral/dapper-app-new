import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../../screens/SplashScreen";
import EmailLogin from "../../screens/Auth/EmailLogin";
import PhoneLogin from "../../screens/Auth/PhoneLogin";
import OTPVerification from "../../screens/Auth/OTPVerification";
import SignupChoice from "../../screens/Auth/SignUpChoice";
import SignUp from "../../screens/Auth/SignUp";
import ModalComponent from "../../component/Modal/ModalComponent";
import MainScreen from "../../screens/MainScreen";
import AppLoading from "../../screens/AppLoading";

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
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
    </Stack.Navigator>
  );
}

export default MainStack;
