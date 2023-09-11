import { Text } from '@rneui/base';
import React from 'react'
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from '@rneui/base';
import axios from '../../utils';
import { StoreContext } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const ProfileScreen = ({navigation}) => {

  const {state, setState} = React.useContext(StoreContext)
  const [user, setUser]  = React.useState(null)
  const [shops, setShop]  = React.useState([])

  const logout = () => {
    axios.get("/user/logout")
    .then(response => {
      AsyncStorage.removeItem("user")
      AsyncStorage.removeItem("token")
      if(response.status === 200) {
          setState(state => ({...state, token: null, user: null}))
          navigation.navigate("EmailLogin")
      }
    })
  }

  const loadData = () => {
    axios.get("/shop")
    .then(response => {
      if(response.status == 200) {
        setShop(response.data.shops)
      }
    })
    .catch(console.log)

    axios.get("/user/is-authenticate")
    .then(response => {
      if(response.status == 200) {
        setUser(response.data.user)
      }
    })
    .catch(console.log)
  }


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    loadData()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.imageContainer}>
          <Avatar 
            size={100}
            rounded
            source={{ uri: `https://digitalplutform.com/trimme/storage/app/${user?.image}` }}
          />
        </View>
        <View>
            <TouchableOpacity style={styles.itemContainer} activeOpacity={1} onPress={() => navigation.navigate("EditProfileScreen")}>
              <View style={styles.itemContainerFirstElement}>
                <AntDesign name="edit" size={24} color="black" />
                <Text style={{fontSize: 18, paddingHorizontal: 20}}>Edit Profile</Text>
              </View>

              <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemContainer} activeOpacity={1} onPress={() => navigation.navigate("EditStorefrontScreen", {shop: shops.length > 0 ? shops[0] : null})}>
              <View style={styles.itemContainerFirstElement}>
                <MaterialCommunityIcons name="archive-marker-outline" size={24} color="black" />
                <Text style={{fontSize: 18, paddingHorizontal: 20}}>{shops.length > 0 ? 'Edit' : 'Add'} Shop</Text>
              </View>

              <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>

            {shops.length > 0 && (
            <TouchableOpacity style={styles.itemContainer} activeOpacity={1} onPress={() => navigation.navigate("ListServiceScreen")}>
              <View style={styles.itemContainerFirstElement}>
                <Ionicons name="cut" size={24} color="black" />
                <Text style={{fontSize: 18, paddingHorizontal: 20}}>Services</Text>
              </View>

              <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>
            )}
            

            <TouchableOpacity style={styles.itemContainer} activeOpacity={1}>
              <View style={styles.itemContainerFirstElement}>
                <Ionicons name="notifications-outline" size={24} color="black" />
                <Text style={{fontSize: 18, paddingHorizontal: 20}}>Notification</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemContainer} activeOpacity={1}>
              <View style={styles.itemContainerFirstElement}>
                <AntDesign name="exclamation" size={24} color="black" />
                <Text style={{fontSize: 18, paddingHorizontal: 20}}>Privacy Policies</Text>
              </View>

            </TouchableOpacity>

            <TouchableOpacity style={styles.itemContainer} activeOpacity={1}>
              <View style={styles.itemContainerFirstElement}>
                <Ionicons name="help" size={24} color="black" />
                <Text style={{fontSize: 18, paddingHorizontal: 20}}>Help Center</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.itemContainer} activeOpacity={1} onPress={logout}>
              <View style={styles.itemContainerFirstElement}>
                <AntDesign name="logout" size={24} color="black" />
                <Text style={{fontSize: 18, paddingHorizontal: 20}}>Log out</Text>
              </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#FDFDFD',
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  avatar: {
    height: 40,
    width: 40
  },
  itemContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: 'grey',
    borderRadius: 100,
    borderWidth: 0.5
  },
  itemContainerFirstElement: {
    flexDirection: 'row',
    alignItems: "center"
  }
})

export default ProfileScreen