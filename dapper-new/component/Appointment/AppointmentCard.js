import { Avatar, Button } from '@rneui/base'
import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import axios from '../../utils';
import { useNavigation } from '@react-navigation/native';

const AppointmentCard = ({appointment}) => {
    console.log(appointment)

    const navigation = useNavigation()

    appointment.date = appointment.schedule.split(" ")[0]
    appointment.time = appointment.schedule.split(" ")[1]
    appointment.time = appointment.time.split(":")[0] + ":" + appointment.time.split(":")[1]

    const [isCancelling, setCancelling] = React.useState(false)
    const [cancelSuccess, setCancelSuccess] = React.useState(false)

    const cancelAppointment = (id) => {
        setCancelling(true)
        
        axios.put(`/appointment/${id}?status=CANCEL`)
        .then(response => {
            console.log(response)
            setCancelSuccess(true)
        })
        .catch(error => {
            alert("Something went wrong")
        })
        setCancelling(false)
    }

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
        <TouchableOpacity style={{paddingVertical: 10}} activeOpacity={1}>
            <View style={[{width: "100%", borderWidth: 1, borderColor: "#AE8447", borderRadius: 9,  padding: 10, backgroundColor: "white"}]}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Avatar 
                        size={50}
                        rounded
                        source={{uri: `https://digitalplutform.com/trimme/storage/app/${appointment?.friend?.image}`}}
                    />
                    <Text style={{fontSize: 18}}>{appointment?.friend?.name}</Text>
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

                <View style={{
                    flexDirection: "row", 
                    justifyContent: (
                            appointment.status == "CANCEL" || 
                            appointment.status == "COMPLETE" || 
                            appointment.status == "PROGRESSING"
                        ) ? "center" : "space-between" , 
                    alignItems: "center", 
                    marginTop: 10}}
                >
                    <Button 
                        size="md"
                        containerStyle={{width: "45%"}}
                        buttonStyle={{backgroundColor: "#AE8447", borderRadius: 100}}
                        title={"View Details"}
                        onPress={() => navigation.navigate("AppointmentDetailScreen", {appointment})}
                    />

                    {appointment.status === "PENDING" && (
                        <Button 
                            loading={isCancelling}
                            size="md"
                            type="outline"
                            containerStyle={{width: "45%"}}
                            buttonStyle={{borderRadius: 100}}
                            onPress={() => cancelAppointment(appointment.id)}
                        >
                            {cancelSuccess ? (
                                <>
                                    <Feather name="check" size={16} color="red" />
                                    <Text style={{color: "red"}}> Cancelled</Text>
                                </>
                            ) : (
                                <Text style={{color: "#AE8447"}}>Decline</Text>
                            )}
                        </Button>
                    )}

                    {appointment.status === "APPROVE" && (
                        <Button 
                            size="md"
                            type="outline"
                            containerStyle={{width: "45%"}}
                            buttonStyle={{borderRadius: 100}}
                            title="Live Track"
                            onPress={() => navigation.navigate("LiveTrack")}
                        />
                    )}
                    

                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})

export default AppointmentCard