import React from 'react'
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native'
import { Avatar, Button, Text } from '@rneui/base'
import SafeAreaView from 'react-native-safe-area-view';
import { StoreContext } from '../../App';
import { AntDesign } from '@expo/vector-icons';
import { secondsInHour } from 'date-fns';
import axios from '../../utils';


const AppointmentConfirm = ({route, navigation}) => {

    const {state, setState} = React.createContext(StoreContext)
    const [isLoading, setLoading] = React.useState(false)
    const [submitting, setSubmitting] = React.useState(false)
    const {cart, schedule, shop} = route.params
    const [total, setTotal] = React.useState(null)

    React.useEffect(() => {
        let total = 0
        cart.forEach(item => total += item.price)
        setTotal(total)
    }, [])

    const send = () => {
        setSubmitting(true)
        
        const data = {
            shop_id: shop.id,
            price: total,
            schedule: schedule,
            services: cart.map(item => item.id) 
        }

        axios.post("/appointment", data)
        .then(response => {
            if(response.status === 200) {
                alert("Appointment booking request send to the barbar")
            }
        })
        .catch(error => {
            alert("Oops, something went wrong")
        })

        setSubmitting(false)
    }

    const Service = ({item}) => {
        return (
          <TouchableOpacity 
            style={styles.itemContainer}
            activeOpacity={1}
        >
            <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center"}}>
              <Avatar 
                size={50}
                rounded
                source={require("../../assets/logo.png")}
                containerStyle={{
                    padding: 6,
                    borderWidth: 1,
                    borderColor: "grey",
                }}
              />
              
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 20}}>{item.name}</Text>
                <View style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                  <AntDesign name="star" size={18} color="#F9B53F" />
                  <Text>{item.star} ({item.votes} reviews)</Text>
                </View>
                <Text style={{fontSize: 18, fontWeight: "bold"}}>$ {item.price}</Text>
              </View>
            </View>
            
            <AntDesign name="checkcircleo" size={30} color="green" />
          </TouchableOpacity>
        )
      }

    return (
    <>
      <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Appointment Details</Text>
                </View>

                <View>
                    <View style={styles.detailContainer}>
                        <Text style={{...styles.detailHeading, fontWeight: "bold"}}>{shop.name}</Text>
                        <Avatar 
                            size={50}
                            rounded
                            source={require("../../assets/logo.png")}
                            containerStyle={{
                                padding: 6,
                                borderWidth: 1,
                                borderColor: "grey",
                            }}
                        />
                    </View>

                    {cart.map((cart, index) => <Service key={index} item={cart} />)}

                    <View style={{...styles.detailContainer, marginTop: 20}}>
                        <Text style={styles.detailHeading}>Address</Text>
                        <Text style={styles.detailText}>{shop.address}</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <Text style={styles.detailHeading}>Date</Text>
                        <Text style={styles.detailText}>{new Date(schedule).toLocaleDateString()}</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <Text style={styles.detailHeading}>Time</Text>
                        <Text style={styles.detailText}>{new Date(schedule).toLocaleTimeString()}</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <Text style={styles.detailHeading}>Total</Text>
                        <Text style={styles.detailText}>$ {total}</Text>
                    </View>
                </View>

                <Button 
                    containerStyle={styles.buttonContainerStyle} 
                    buttonStyle={styles.buttonStyle} 
                    loading={submitting} 
                    // disabled={submitting}
                    size={'lg'}
                    onPress={() => send()}
                >Confirm</Button>
                
            </ScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
        padding: 14
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10
    },
    headingContainer: {
        flexDirection: "row", 
        justifyContent: "center", 
        borderWidth: 0, 
        borderBottomWidth: 0.5, 
        borderBottomColor: "grey", 
        marginBottom: 26
    },
    itemContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "grey",
        borderRadius: 4,
    },
    detailContainer: {
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
    },
    detailHeading: {
        fontSize: 20,
        fontWeight: "bold",
    },
    detailText: {
        fontSize: 20,
    },
    buttonStyle: {
        backgroundColor: "#AE8447", 
        borderRadius: 50, 
        paddingHorizontal: 15
    },
    buttonContainerStyle: {
        marginVertical: 20
    }
})

export default AppointmentConfirm