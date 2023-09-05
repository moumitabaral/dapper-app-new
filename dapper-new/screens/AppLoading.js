import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { Image, StyleSheet, View, ActivityIndicator, ImageBackground } from "react-native";
import { StoreContext } from "../App";
import axios from "../utils/index"

const AppLoading = ({navigation}) => {

  const {state, setState} = React.useContext(StoreContext);
  const [isTouch, setTouch] = React.useState(false)
  const [isLoading, setLoading] = React.useState(true)

  React.useState(() => {
    (async () => {
        try {
            // AsyncStorage.removeItem("isTouch");
            const isTouch  = await AsyncStorage.getItem("isTouch")
            console.log("App is Touched: ")
            console.log(isTouch)

            if(isTouch) {
                try {
                    const token = await AsyncStorage.getItem("token")
                    console.log("token: ")
                    console.log(token)

                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    const response = await axios.get(`/user/is-authenticate`)
                    setLoading(false)
                
                    if(response.status === 200) {
                        setState(state => ({...state, token, user: response.data.user}))
                        navigation.navigate("MainScreen")
                    }
                    else {
                        console.log("Token is not valid")
                        navigation.navigate("EmailLogin")
                    }
                }
                catch(e) {
                    console.log("Login Failed")
                    navigation.push("EmailLogin")
                }
            }
            else {
                navigation.push("SplashScreen")
            }
        }
        catch(e) {
            navigation.push("SplashScreen")
        }
    })()
  }, [])


//   React.useEffect(() => {
//     (async () => {
//       try{
//         const isTouch = await AsyncStorage.getItem("isTouch")
//         if(isTouch == "YES") {
//           setTouch(true)
//         }
//         else {
//           await AsyncStorage.setItem("isTouch", "YES")
//           setTouch(false)
//           setLoading(false)
//         }
//       }
//       catch(err) {
//         setTouch(false)
//         setLoading(false)
//       }
//     })()
//   }, [])

//   React.useEffect(() => {
//     if(isTouch) {
//       (async () => {
//         const token = await AsyncStorage.getItem("token")
//         if(token) {
//             console.log(token)
//             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//             try{
//               const response = await axios.get(`/user/is-authenticate`)
//               setLoading(false)
//               if(response.status === 200) {
//                 setState(state => ({...state, token, user: response.data.user}))
//                 navigation.navigate("MainScreen")
//               }
//               else {
//                 navigation.navigate("EmailLogin")
//               }
//             }
//             catch(err) {
//               setLoading(false)
//               navigation.navigate("EmailLogin")
//             }

//           }
//         else {
//           navigation.navigate("EmailLogin")
//         }
//       })()
//     }
//     else {
//       if(!isLoading)
//         navigation.push("SplashScreen")
//     }
//   }, [isTouch, isLoading])

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     // navigation.push("Splash1")
  //   }, 4000)
  // }, [])

  return (
    <View style={styles.splashView}>
        <Image
            style={styles.logo41}
            resizeMode="cover"
            source={require("../assets/logo.png")}
        />

        <View style={{position: "absolute", top: 200, left: 160}}>
            <ActivityIndicator size="large" color="black" />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barberShavingContouringMaleIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 539.61,
    height: 812,
  },
  groupIcon: {
    position: "absolute",
    top: 17,
    right: 27.91,
    width: 75.09,
    height: 11.34,
  },
  timeText: {
    position: "absolute",
    marginTop: -3.5,
    top: "50%",
    left: 0,
    fontSize: 15,
    letterSpacing: -0.3,
    fontFamily: "Roboto",
    color: "#2e2e3e",
    textAlign: "center",
    width: 54,
  },
  timeStyleView: {
    position: "absolute",
    top: 7,
    left: 13,
    width: 54,
    height: 21,
  },
  statusBarView: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 44,
  },
  logo41: {
    position: "absolute",
    top: 331,
    left: 89,
    width: 196,
    height: 150,
    overflow: "hidden",
  },
  splashView: {
    position: "relative",
    borderRadius: 24,
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default AppLoading;
