import { Text } from '@rneui/base';
import React from 'react'
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StoreContext } from '../../App';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from '../../utils';


const MainScreen = ({navigation}) => {

  const {state, setState} = React.useContext(StoreContext)
  const [isLoading, setLoading] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false)
  const [data, setData] = React.useState({
    total_income: 0,
    total_cancel: 0,
    total_pending: 0,
    total_completed: 0
  })
  
  const loadData = () => {
    setLoading(true)
    axios.get(`/shop/statistics/`)
    .then(response => {
      if(response.status == 200) {
        setData({
          total_income: response.data.shop.total_income,
          total_cancel: response.data.shop.total_cancel,
          total_pending: response.data.shop.total_pending,
          total_completed: response.data.shop.total_completed,
        })
      }
    })
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
    setLoading(true)
    setTimeout(() => {
      loadData()
    }, 1000)
  }, [])

  return (
    <View style={styles.container}>
        {isLoading ? (
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large" color={"#3863CB"} />
          </View>
        ) : (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
              <TouchableOpacity style={styles.itemContainer} activeOpacity={1}>
                <View style={styles.itemContainerFirstElement}>
                  <AntDesign name="edit" size={28} color={"#0088E0"} />
                  <View>
                    <Text style={styles.stats}>$ {data.total_income}</Text>
                    <Text style={styles.desc}>Amount earned last month</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemContainer} activeOpacity={1} onPress={() => navigation.navigate("CompletedRequestScreen")}>
                <View style={styles.itemContainerFirstElement}>
                  <AntDesign name="checkcircleo" size={24} color={"#0088E0"} />
                  <View>
                    <Text style={styles.stats}>{data.total_completed}</Text>
                    <Text style={styles.desc}>Completed</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemContainer} activeOpacity={1} onPress={() => navigation.navigate("PendingRequestScreen")}>
                <View style={styles.itemContainerFirstElement}>
                <MaterialIcons name="pending-actions" size={24} color={"#0088E0"} />
                  <View>
                    <Text style={styles.stats}>{data.total_pending}</Text>
                    <Text style={styles.desc}>Pending request</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.itemContainer} activeOpacity={1} onPress={() => navigation.navigate("CancelRequestScreen")}>
                <View style={styles.itemContainerFirstElement}>
                  <AntDesign name="closecircleo" size={24} color={"#0088E0"} />
                  <View>
                    <Text style={styles.stats}>{data.total_cancel}</Text>
                    <Text style={styles.desc}>Cancelled request</Text>
                  </View>
                </View>
              </TouchableOpacity>
          </ScrollView>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    padding: 14
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
  },
  stats: {
    fontSize: 18, 
    fontWeight: "bold",
    paddingHorizontal: 20
  },
  desc: {
    fontSize: 18,
    color: "grey", 
    paddingHorizontal: 20
  }
})

export default MainScreen