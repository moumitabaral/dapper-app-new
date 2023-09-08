import { Avatar, Button, Text } from '@rneui/base'
import React from 'react'
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { StoreContext } from '../../App';
import axios from '../../utils';
import SafeAreaView from 'react-native-safe-area-view';

const ShopScreen = ({route, navigation}) => {

  const {state, setState} = React.createContext(StoreContext)
  const [isLoading, setLoading] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("service")
  const [display, setDisplay] = React.useState(false)
  const [schedule, setSchedule] = React.useState(new Date())
  const [confirmSchedule, setConfirmSchedule] = React.useState({
    continue: false
  })
  const [cart, setCart] = React.useState([])
  const [shop, setShop] = React.useState(null)

  React.useEffect(() => {
      setConfirmSchedule(false)
      setLoading(true)
      axios.get(`/shop/${route.params.id}`)
      .then(response => {
        if(response.status === 200) {
          setShop(response.data.shop)
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  React.useEffect(() => {
    if(confirmSchedule.continue) {

      const cartItems = []
      
      shop.services.forEach(service => cart.includes(service.id) && cartItems.push(service))

      navigation.navigate("AppointmentConfirm", {cart: cartItems, schedule: schedule.toLocaleString(), shop: shop})
    }
  }, [confirmSchedule])

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

  generateBoxShadowStyle(-2, 4, '#171717', 0.2, 4, 6, '#171717');


  const Service = ({item}) => {
    return (
      <TouchableOpacity 
        style={[styles.itemContainer, styles.boxShadow]}
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
            <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
              <AntDesign name="star" size={18} color="#F9B53F" />
              <Text>{item.star} ({item.votes} reviews)</Text>
            </View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>$ {item.price}</Text>
          </View>
        </View>
        
        {cart.includes(item.id) ? (
          <Button buttonStyle={styles.removeButtonStyle} onPress={() => setCart(cart => {
            cart.splice(cart.indexOf(item.id), 1)
            return [...cart]
          })}>
            <Feather name="trash-2" size={20} color="white" />  Remove
          </Button>
        ) : (
          <Button buttonStyle={styles.buttonStyle} onPress={() => setCart(cart => [...cart, item.id])}>
            <Entypo name="plus" size={24} color="white" />  Add
          </Button>
        )}
      </TouchableOpacity>
    )
  }

  const Review = ({item}) => {
    return (
      <View style={[styles.reviewContainer]}>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>

          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <Avatar 
                size={50}
                rounded
                source={{uri: "https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg"}}
                containerStyle={{
                  padding: 6,
                  borderWidth: 1,
                  borderColor: "grey",
                }}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 18}}>{item.name}</Text>
                <View style={{flexDirection: "row"}}>
                  <AntDesign name="star" size={18} color="#F9B53F" />
                  <AntDesign name="star" size={18} color="#F9B53F" />
                  <AntDesign name="star" size={18} color="#F9B53F" />
                  <AntDesign name="star" size={18} color="#F9B53F" />
                  <AntDesign name="star" size={18} color="#F9B53F" />
                </View>
              </View>
          </View>

          <Text>{new Date(item.created_at).toLocaleDateString()}</Text>

        </View>

        <Text style={{fontSize: 16,lineHeight: 26}}>{item.feedback}</Text>
      </View>
    )
  }

  const Portfolio = ({item}) => {
    return (
        <Image
          style={{width: "50%", margin: 4}} 
          source={item.image}
        />
    )
  }

    return (
      <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.topFrame}>
            <Avatar 
              size={120}
              rounded
              source={require("../../assets/logo.png")}
              containerStyle={styles.avarter}  
            
            />
            <Text style={{fontSize: 30, marginLeft: 10, marginTop: 12}}>{shop?.name}</Text>
            <View style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
              <AntDesign name="star" size={20} color="#F9B53F" />
              <AntDesign name="star" size={20} color="#F9B53F" />
              <AntDesign name="star" size={20} color="#F9B53F" />
              <AntDesign name="star" size={20} color="#F9B53F" />
              <AntDesign name="star" size={20} color="#F9B53F" />
              <Text>{shop?.star} ({shop?.votes} reviews)</Text>
            </View>
          </View>
          
          <View style={styles.tabContainer}>
            <TouchableOpacity style={[styles.tab, activeTab == 'service' && styles.activeTab]} activeOpacity={1} onPress={() => setActiveTab("service")}>
              <Text style={styles.tabTitle}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, activeTab == 'review' && styles.activeTab]} activeOpacity={1} onPress={() => setActiveTab("review")}>
              <Text style={styles.tabTitle}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, activeTab == 'previous' && styles.activeTab]} activeOpacity={1} onPress={() => setActiveTab("previous")}>
              <Text style={styles.tabTitle}>Works</Text>
            </TouchableOpacity>
          </View> 

          <View style={styles.tabContent}>
            
            {activeTab == 'service' && (
              <View>
                <Text style={styles.salonServiceText}>Services</Text>
                <FlatList 
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={shop?.services}
                  renderItem={Service}
                  keyExtractor={item => item.id}
                />
            </View>
            )}

            {activeTab == 'review' && (
              <View>
                <Text style={styles.salonServiceText}>All  Reviews</Text>
                <FlatList 
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={shop?.customerReviews}
                  renderItem={Review}
                  keyExtractor={item => item.id}
                />
            </View>
            )}

            {activeTab == 'previous' && (
              <View>
                <Text style={styles.salonServiceText}>All  Images</Text>
                <FlatList 
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={[
                    {
                      id: "1",
                      image: require("../../assets/portfolio/1.png"),

                    },
                    {
                      id: "2",
                      image: require("../../assets/portfolio/2.png"),

                    },
                    {
                      id: "3",
                      image: require("../../assets/portfolio/3.png"),

                    },
                    {
                      id: "4",
                      image: require("../../assets/portfolio/4.png"),

                    },
                    {
                      id: "5",
                      image: require("../../assets/portfolio/1.png"),

                    },
                    {
                      id: "6",
                      image: require("../../assets/portfolio/2.png"),

                    },
                    {
                      id: "7",
                      image: require("../../assets/portfolio/3.png"),

                    },
                    {
                      id: "8",
                      image: require("../../assets/portfolio/4.png"),

                    },
                  ]}
                  horizontal={false}
                  numColumns={2}
                  renderItem={Portfolio}
                  keyExtractor={item => item.id}
                />
            </View>
            )}

          </View>
          
          {cart.length > 0 && (
            <View style={styles.buttonContainer}>
              <Button buttonStyle={styles.buttonStyle} size={'lg'} onPress={() => navigation.navigate("AppointmentBooking")}>Appointment</Button>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14,
        backgroundColor: '#FDFDFD',
    },
    topFrame: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center",
    },
    avarter: {
      padding: 10,
      borderWidth: 1,
      borderColor: "grey",
    },
    tabContainer: {
      flex: 0.1,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: 'center',
    },
    tab: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 10,
      width: 100,
      borderBottomWidth: 2,
      borderBottomColor: "#CBCBCB",
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: "#AE8447",
    },
    tabTitle: {
      fontSize: 18,
    },
    tabContent: {
      flex: 0.6,
    },
    itemContainer: {
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      marginHorizontal: 4,
      paddingVertical: 5,
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: "center",
      borderColor: "grey",
      borderRadius: 8,
    },
    salonServiceText: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
    },
    reviewContainer: {
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      marginHorizontal: 4,
      paddingVertical: 5,
      borderWidth: 0.5,
      borderColor: "grey",
      borderRadius: 8,
    },
    buttonContainer: {
      flex: 0.1,
      justifyContent: "flex-end",
    },
    buttonStyle: {
      backgroundColor: "#AE8447", 
      borderRadius: 50, 
      paddingHorizontal: 15
    },
    removeButtonStyle: {
      backgroundColor: "#dc3545", 
      borderRadius: 50, 
      paddingHorizontal: 15
    }
})

export default ShopScreen