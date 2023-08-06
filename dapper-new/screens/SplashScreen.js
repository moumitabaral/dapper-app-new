import React from 'react'
import { Button, Text } from '@rneui/base'
import { Image, StyleSheet, View } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Octicons } from '@expo/vector-icons';
import {
    useFonts,
    Poppins_500Medium,
  } from '@expo-google-fonts/poppins';

const SplashScreen = ({navigation, route}) => {

    let [fontsLoaded] = useFonts({
        Poppins_500Medium,
    });

    let screenNumber = 0

    if(route.params?.screenNumber != undefined) {
      screenNumber = route.params.screenNumber
    }


    const data = [
      {
        image: require("../assets/splash/1.png"),
        text: "Barbers can register their business online" 
      },
      {
        image: require("../assets/splash/2.png"),
        text: "Businesses can add multiple barbers" 
      },
      {
        image: require("../assets/splash/3.png"),
        text: "Barbers can be available now or be available for future bookings" 
      },
            {
        image: require("../assets/splash/4.png"),
        text: "Customers who need a haircut can see which barbers are available" 
      },
      {
        image: require("../assets/splash/5.png"),
        text: "Barbers are colour coded based on their availability" 
      },
      {
        image: require("../assets/splash/6.png"),
        text: "Customers book a haircut and enjoy the Dapper App" 
      },
      {
        image: require("../assets/splash/7.png"),
        text: "To book a haircut use the map function to search for nearby barbers" 
      },
      {
        image: require("../assets/splash/8.png"),
        text: "They are colored coded to show when they are available" 
      },
      {
        image: require("../assets/splash/9.png"),
        text: "You can book multiple haircuts and shaves at a time" 
      },
      {
        image: require("../assets/splash/10.png"),
        text: "You can schedule a future appointment if you want" 
      },
      {
        image: require("../assets/splash/11.png"),
        text: "Barbers in the area will be notified of your request" 
      },
      {
        image: require("../assets/splash/12.png"),
        text: "Suitable barbers will accept the job" 
      },
      {
        image: require("../assets/splash/13.png"),
        text: "Both you and the barber can rate the experience afterwards!" 
      },
    ]

    const goToNextScreen = () => {
      if(screenNumber == 12) {
        navigation.navigate("EmailLogin")
      }
      else {
        navigation.navigate("SplashScreen", {screenNumber: ++screenNumber})
      }
    }

    return (
        <SafeAreaView style={{flex: 1}} forceInset={{top: 'alaways'}}>
            <View style={styles.container}>
                <View style={styles.top}>
                    <Image
                        resizeMode="cover" 
                        source={data[screenNumber].image}
                    />
                    <Text style={{color: "#263238", fontFamily: 'Poppins_500Medium', fontSize: 28, textAlign: "center", marginVertical: 40}}>{data[screenNumber].text}</Text>
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        {[1,2,3,4,5,6,7,8,9,10,11,12,13].map((element, index) => (
                            <Octicons key={index} name="dash" size={24} color="black" style={[styles.dash, index == screenNumber && styles.dashActive]} />
                        ))}
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Button 
                        buttonStyle={{width: 100, height: 43, borderRadius: 9, backgroundColor: "whitesmoke"}}
                        titleStyle={{color: "grey"}}
                        title={"Skip"}
                        onPress={() => navigation.navigate("EmailLogin")}
                    />
                    <Button 
                        buttonStyle={{width: 100, height: 43, borderRadius: 9, backgroundColor: "#AE8447"}}
                        title={"Next"}
                        onPress={() => goToNextScreen()}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 14
    },
    top: {
        flex: 0.9,
        justifyContent: "center",
        alignItems: "center",
    },
    bottom: {
        flex: 0.1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dash: {
        marginHorizontal: 1,
        color: "#DDDDDD"
    },
    dashActive: {
        color: "black"
    },
})

export default SplashScreen