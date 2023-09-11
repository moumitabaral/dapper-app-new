import { createStackNavigator } from "@react-navigation/stack";

import BarberHomeScreen from "../../../screens/Barber/BarberHomeScreen";
import BarberSetWorkTime from "../../../screens/Barber/BarberSetWorkTime";
import PendingRequest from "../../../screens/Barber/PendingRequestScreen";
import CompletedRequest from "../../../screens/Barber/CompletedRequestScreen";
import CancelRequest from "../../../screens/Barber/CancelRequestScreen";

const Stack = createStackNavigator();

function BarberMainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BarberMain" component={BarberHomeScreen} />
      <Stack.Screen name="SetWorkTime" component={BarberSetWorkTime} />
      <Stack.Screen name="PendingRequestScreen" component={PendingRequest} options={{title: "Pending Request"}} />
      <Stack.Screen name="CompletedRequestScreen" component={CompletedRequest} options={{title: "Completed Request"}} />
      <Stack.Screen name="CancelRequestScreen" component={CancelRequest} options={{title: "Cancel Request"}} />
      {/* <Stack.Screen name="AppointmentDetailScreen" component={AppointmentDetailsScreet} options={{title: "Appointment Details"}} /> */}
    </Stack.Navigator>
  );
}

export default BarberMainStack;
