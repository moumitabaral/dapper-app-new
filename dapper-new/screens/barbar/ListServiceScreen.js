import { Avatar, Button, Text } from '@rneui/base'
import React from 'react'
import { RefreshControl, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native'
import { StoreContext } from '../../App'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import axios from '../../utils'
import { ActivityIndicator } from 'react-native'
import DropShadow from "react-native-drop-shadow";

const ListServiceScreen = ({navigation}) => {

  const [loading, setLoading] = React.useState(false)
  const [services, setServices] = React.useState([])
  const [refreshing, setRefreshing] = React.useState(false)
  const {state, setState} = React.useContext(StoreContext)

  const loadData = () => {
    setLoading(true)
    axios.get("/service")
    .then(response => {
      setServices(response.data.services)
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }
  
  const onRefresh = () => {
    setRefreshing(true)
    loadData()
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
}

  React.useEffect(() => {
    loadData()
  }, [])

  
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
              containerStyle={{
                padding: 6,
                borderWidth: 1,
                borderColor: "grey",
              }}
              source={require("../../assets/logo.png")}
            />
            
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 20}}>{item.name}</Text>

              <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: 'center'}}>
                <AntDesign name="star" size={18} color="#F9B53F" />
                <Text>{item.star} ({item.votes} reviews)</Text>
              </View>
              <Text style={{fontSize: 18, fontWeight: "bold"}}>$ {item.price}</Text>
            </View>
          </View>

            <Button buttonStyle={styles.editButtonStyle} onPress={() => navigation.navigate("EditServiceScreen", {service: item})}>
              <Entypo name="edit" size={17} color="white" /> Edit
            </Button>
            
        </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>

      {loading && (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size="large" color={"#3863CB"} />
        </View>
      )}
      
      {!loading && services.length > 0 && (
        <FlatList 
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={services}
          renderItem={Service}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {!loading && services.length == 0 && (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text style={{fontSize: 20}}>No service available</Text>
        </View>
      )}

      <Button
        buttonStyle={styles.buttonStyle}
        title="New Service"
        onPress={() => navigation.navigate("AddServiceScreen")}
      ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#FDFDFD',
  },
  buttonStyle: {
    height: 55,
    borderRadius: 8,
    backgroundColor: "#0088E0"
  },
  avarter: {
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
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
  editButtonStyle: {
    backgroundColor: "#0088E0", 
    borderRadius: 50, 
    paddingHorizontal: 15
  }
})

export default ListServiceScreen