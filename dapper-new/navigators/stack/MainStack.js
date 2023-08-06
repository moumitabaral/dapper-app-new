import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../../screens/SplashScreen';
import EmailLogin from '../../screens/Auth/EmailLogin';
import PhoneLogin from '../../screens/Auth/PhoneLogin';
import OTPVerification from '../../screens/Auth/OTPVerification';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="EmailLogin" component={EmailLogin} />
        <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
    </Stack.Navigator>
  );
}

export default MainStack