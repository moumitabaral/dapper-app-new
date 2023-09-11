import { Button, Text } from '@rneui/base'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';

const JobCompleteScreen = ({route, navigation}) => {

    const {data} = route.params

    return (
        <View style={{flex: 1, backgroundColor: '#FDFDFD', padding: 14}}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{flexDirection: "column", backgroundColor: "#0088E0", padding: 10, borderRadius: 8}}>
                    
                    <View style={{flexDirection: 'column', alignItems: "center", justifyContent: 'center', marginBottom: 40}}>
                        <Feather name="check-circle" size={50} color="white" />
                        <Text h3 h3Style={{color: "white", marginTop: 20}}>Job Completed</Text>
                    </View>

                    {data.services.map((service, index) => (
                        <View key={index} style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                            <Text style={{fontSize: 18, color: "white"}}>{service.name}</Text>
                            <Text style={{fontSize: 18, color: "white"}}>$ {service.price}</Text>
                        </View>
                    ))}

                    <View style={{flexDirection: "row", justifyContent: "space-between", borderTopWidth: 0.5, borderTopColor: "white", marginTop: 20}}>
                        <Text style={{fontSize: 18, color: "white"}}>Address</Text>
                        <Text style={{fontSize: 18, color: "white", marginLeft: 50}}>{data.friend.address}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", borderTopWidth: 0.5, borderTopColor: "white", marginTop: 20}}>
                        <Text style={{fontSize: 18, color: "white"}}>Phone</Text>
                        <Text style={{fontSize: 18, color: "white", marginLeft: 50}}>{data.friend.phone}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", borderTopWidth: 0.5, borderTopColor: "white", marginTop: 20}}>
                        <Text style={{fontSize: 18, color: "white"}}>Booking Date</Text>
                        <Text style={{fontSize: 18, color: "white", marginLeft: 50}}>{data.created_date}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", borderTopWidth: 0.5, borderTopColor: "white", marginTop: 20}}>
                        <Text style={{fontSize: 18, color: "white"}}>Booking Time</Text>
                        <Text style={{fontSize: 18, color: "white", marginLeft: 50}}>{data.created_time}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", borderTopWidth: 0.5, borderTopColor: "white", marginTop: 20}}>
                        <Text style={{fontSize: 18, color: "white"}}>Total</Text>
                        <Text style={{fontSize: 18, color: "white", marginLeft: 50}}>$ {data.price}</Text>
                    </View>
                </View>

                {/* <Button 
                    size="lg"
                    containerStyle={{marginTop: 20}}
                    type="outline"
                    buttonStyle={{borderRadius: 100}}
                    title="Rate Your Customer"
                    onPress={() => navigation.navigate("CustomerReview")}
                /> */}

                <Button 
                    size="lg"
                    containerStyle={{marginTop: 20}}
                    buttonStyle={{borderRadius: 100}}
                    title="Back To Dashboard"
                    onPress={() => navigation.navigate("Home")}
                />


            </ScrollView>
        </View>
  )
}

export default JobCompleteScreen