import React from 'react'
import { RefreshControl, ScrollView, StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import AppointmentCard from '../../components/Appointment/AppointmentCard'
import axios from '../../utils'

const CancelRequest = () => {

  const [isLoading, setLoading] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false)
  const [appointments, setAppointments] = React.useState([]) 
  
  const loadData = () => {
    setLoading(true)

    axios.get("/appointment?status=CANCEL")
    .then(response => {
      setAppointments(response.data)
    })
    .catch(err => {
      alert("Something went wrong!")
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
    loadData()
  }, [])


  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size="large" color={"#3863CB"} />
        </View>
      ) : (
          appointments.length > 0 ? (
            <>
              <ScrollView 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              >
                {appointments.map((appointment, index) => <AppointmentCard appointment={appointment} key={index} />)}
              </ScrollView>
            </>
          ) : (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}><Text style={{fontSize: 18}}>No Cancelled JOB</Text></View>
          )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    padding: 14,
  },
})

export default CancelRequest