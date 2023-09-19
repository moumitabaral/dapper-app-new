import { Avatar, Badge, Button } from '@rneui/base'
import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import axios from '../../utils';
import { useNavigation } from '@react-navigation/native';

const CustomerAppointmentCard = ({appointment}) => {
    console.log(appointment)

    const navigation = useNavigation()

    appointment.date = appointment.schedule.split(" ")[0]
    appointment.time = appointment.schedule.split(" ")[1]
    appointment.time = appointment.time.split(":")[0] + ":" + appointment.time.split(":")[1]

    const [isCancelling, setCancelling] = React.useState(false)
    const [cancelSuccess, setCancelSuccess] = React.useState(false)

    const generateBoxShadowStyle = (
        xOffset,
        yOffset,
        shadowColorIos,
        shadowOpacity,
        shadowRadius,
        elevation,
        shadowColorAndroid,
      ) => {
        if (Platform.OS === 'ios') {
          styles.boxShadow = {
            shadowColor: shadowColorIos,
            shadowOffset: {width: xOffset, height: yOffset},
            shadowOpacity,
            shadowRadius,
          };
        } else if (Platform.OS === 'android') {
          styles.boxShadow = {
            elevation,
            shadowColor: shadowColorAndroid,
          };
        }
      };
    
      generateBoxShadowStyle(-4, 10, '#171717', 1, 10, 6, '#171717');

    return (
        <TouchableOpacity style={{paddingVertical: 10}} activeOpacity={1} onPress={() => navigation.navigate("MyAppointmentDetailScreen", {appointment})}>
            <View style={[{width: "100%", borderWidth: 1, borderColor: "#AE8447", borderRadius: 9,  padding: 10, backgroundColor: "white"}]}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <Avatar 
                            size={50}
                            rounded
                            source={{uri: `https://digitalplutform.com/trimme/storage/app/${appointment?.friend?.image}`}}
                        />
                        <View>
                            <Text style={{fontSize: 18, marginLeft: 10, color: "#6C6C6C"}}>{appointment.friend.name}</Text>
                            {/* <Text style={{fontSize: 15, marginLeft: 10, color: "#6C6C6C"}}>{appointment.friend.name}</Text> */}
                        </View>
                    </View>
                    <View>
                        <View style={{paddingVertical: 2, paddingHorizontal: 4, borderRadius: 4, backgroundColor: "#DDE4F6", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            <Text style={{color: "#3863CB"}}>{appointment.status}</Text>
                        </View>
                    </View>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10,}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <AntDesign name="calendar" size={18} color="#AE8447" />
                        <Text style={{marginLeft: 5, fontSize: 16}}>{appointment.date}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <AntDesign name="clockcircleo" size={18} color="#AE8447" />
                        <Text style={{marginLeft: 5, fontSize: 16}}>{appointment.time}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <FontAwesome name="dollar" size={18} color="#AE8447" />
                        <Text style={{marginLeft: 5, fontSize: 16}}>{appointment.price}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})

export default CustomerAppointmentCard