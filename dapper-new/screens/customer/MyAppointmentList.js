import React from 'react'
import { RefreshControl, ScrollView, StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import AppointmentCard from '../../components/Appointment/AppointmentCard'
import axios from '../../utils'
import CustomerAppointmentCard from '../../components/Appointment/CustomerAppointmentCard'
import { TouchableOpacity } from 'react-native'

const MyAppointmentList = () => {

  const [isLoading, setLoading] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false)
  const [upcomingAppointments, setUpcomingAppointments] = React.useState([]) 
  const [appointments, setAppointments] = React.useState([]) 
  const [activeTab, setActiveTab] = React.useState("upcoming")
  
  const loadData = () => {
    setLoading(true)

    axios.get("/appointment?status=APPROVE")
    .then(response => {
        setUpcomingAppointments(response.data)
    })
    .catch(err => {
      alert("Something went wrong!")
    })

    axios.get("/appointment?status=ALL")
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
                <View style={styles.container}>
                  <View style={styles.tabContainer}>
                      <TouchableOpacity style={[styles.tab, activeTab == 'upcoming' && styles.activeTab]} activeOpacity={1} onPress={() => setActiveTab("upcoming")}>
                          <Text style={styles.tabTitle}>Upcoming</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.tab, activeTab == 'history' && styles.activeTab]} activeOpacity={1} onPress={() => setActiveTab("history")}>
                          <Text style={styles.tabTitle}>History</Text>
                      </TouchableOpacity>
                  </View> 
                      {activeTab == "upcoming" && (upcomingAppointments.map((appointment, index) => <CustomerAppointmentCard key={index} appointment={appointment} />))}
                      {activeTab == "history" && (appointments.map((appointment, index) => <CustomerAppointmentCard key={index} appointment={appointment} />))}
                  </View>
              </ScrollView>
            </>
          ) : (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}><Text style={{fontSize: 18}}>No Appointment Available</Text></View>
          )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 10,
      backgroundColor: '#FDFDFD',
    },
    tabContainer: {
      flex: 0.2,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: 'flex-start',
      },
    tab: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "50%",
      paddingBottom: 10,
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
})

export default MyAppointmentList