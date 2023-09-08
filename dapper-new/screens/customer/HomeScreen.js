import { Avatar, Input, Text } from '@rneui/base'
import React from 'react'
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Map from '../../component/Map/Map';
import { AntDesign } from '@expo/vector-icons';
import axios from '../../utils'
import { FlatList } from 'react-native-gesture-handler'
import { StoreContext } from '../../App'
import { FontAwesome } from '@expo/vector-icons';
import SafeAreaView from 'react-native-safe-area-view'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const HomeScreen = ({navigation}) => {

  const {state, setState} = React.useContext(StoreContext)
  const [loadig, setLoading] = React.useState(false)
  const [shops, setShops] = React.useState([])
  const [locations, setLocations] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false)
  const [place, setPlace] = React.useState(null)

  const [region, setRegion] = React.useState({coords: {latitude: -33.865143, longitude: 151.209900}});
  const [errorMsg, setErrorMsg] = React.useState(null);

  // Fetch Device Location
  React.useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let newOegion = await Location.getCurrentPositionAsync({});
      setRegion(newOegion);
    })();
  }, []);


  const loadData =() => {
    setLoading(true)
    axios.get("/shop")
    .then(response => {
      if(response.status  == 200) {
        console.log(response.data.shops)
        setState(state => ({...state, shops: response.data.shops}))
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.status)
      }
    })
    .finally(() => setLoading(false))
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    loadData()
    setTimeout( () => {
      setRefreshing(false)
    }, 2000)
  }


  React.useEffect(() => {
    const locations = []

    state.shops.forEach(shop => locations.push({latitude: shop.latitude, longitude: shop.longitude}))
    setState(state => ({...state, locations: locations}))
    
  }, [state.shops])

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

  generateBoxShadowStyle(-2, 4, '#171717', 0.1, 3, 6, '#171717');

  const Shop = ({item}) => {
    return (
      <TouchableOpacity 
        style={[styles.itemContainer, styles.boxShadow]}
        activeOpacity={1}
        onPress={() => navigation.navigate("ShopScreen", {id: item.id})}
      >
          <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center"}}>
            <Avatar 
              size={70}
              rounded
              source={require("../../assets/logo.png")}
              containerStyle={{
                padding: 6,
                borderWidth: 1,
                borderColor: "grey",
              }}
            />

            <View>
              <Text style={{fontSize: 20, marginLeft: 10}}>{item.name}</Text>
              <View style={{flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
                <AntDesign name="star" size={18} color="#F9B53F" />
                <Text>{item.star} ({item.reviews} reviews)</Text>
              </View>
            </View>
          </View>
          <View style={{fontSize: 20, flexDirection: "column", justifyContent: "center", alignItems: 'flex-end'}}>
            {item.is_open ? (<FontAwesome name="circle" size={20} color="green" />) : <FontAwesome name="circle" size={20} color="red" />}
            
            {item.is_open ? 
              <Text style={{color: "red", fontWeight: "bold"}}>Close at {new Date(item.open_at).toLocaleTimeString()}</Text> : 
              <Text style={{color: "green", fontWeight: "bold"}}>Open at {new Date(item.open_at).toLocaleTimeString()}</Text>
            }
          </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always' }}>
      <View style={styles.container}>

        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.fakeInput}  onPress={() => navigation.navigate("SearchScreen", {place, setPlace})} activeOpacity={1}> 
          <Text style={styles.fakeInputText}>{place != null ? place.searchAddress : "Search Location"}</Text>
            <FontAwesome5 name="search-location" size={24} color="#AE8447" />
          </TouchableOpacity>
        </View>

        <View style={styles.mapContainer}>
          <Map 
            region={{
              latitude: place != null ? place.searchLat : region.coords.latitude,
              longitude: place != null?  place.searchLong : region.coords.longitude,
            }}
            locations={[
              {latitude: "22.5724183", longitude: "88.3193267"},
              {latitude: "22.5448", longitude: "88.3426"},
            ]} 
          />
        </View>

        <View style={styles.shopsContainer}>
          <FlatList 
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={state.shops}
            renderItem={Shop}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 14,
      backgroundColor: '#FDFDFD',
    },
    searchContainer: {
      flex: 0.1,
      paddingHorizontal: 14
    },  
    mapContainer: {
      flex: 0.5,
    },
    shopsContainer: {
      flex: 0.4
    },  
    itemContainer: {
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      marginHorizontal: 10,
      paddingVertical: 5,
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: "center",
      borderColor: "grey",
      borderRadius: 8,
    },
    fakeInput: {
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: 50,
      height: 40
    },
    fakeInputText: {
      fontSize: 18
    }
});

export default HomeScreen