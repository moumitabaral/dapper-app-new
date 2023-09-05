import { Avatar, Button } from '@rneui/base'
import React from 'react'
import { ScrollView, View, RefreshControl, StyleSheet, TouchableOpacity, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import axios from '../../utils'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AppointmentCard from '../../components/Appointment/AppointmentCard'

const BookingScreen = ({navigation}) => {

    const [isLoading, setLoading] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState("upcomming")

    const [progressings, setProgressingAppointments] = React.useState([])
    const [upcommings, setUpcommingAppointments] = React.useState([])
    const [histories, setHistoryAppointments] = React.useState([])


    const loadData = () => {

        axios.get("/appointment?status=PROGRESSING")
        .then(response => {
            if(response.status == 200){
                setProgressingAppointments(response.data.appointments)
            }
        })
        .catch(err => alert("Something went wrong"))

        axios.get("/appointment?status=APPROVE")
        .then(response => {
            if(response.status == 200){
                setUpcommingAppointments(response.data.appointments)
            }
        })
        .catch(err => alert("Something went wrong"))


        axios.get("/appointment?status=COMPLETED")
        .then(response => {
            if(response.status == 200){
                setHistoryAppointments(response.data.appointments)
            }
        })
        .catch(err => alert("Something went wrong"))



    }

    const onRefresh = () => {
        setRefreshing(true)
        loadData()
        setTimeout(() => {
          setRefreshing(false)
        }, 2000)
    }


    // React.useEffect(() => {
    //     setLoading(false)
    //     loadData()
    //     setLoading(true)
    // }, [])

    React.useEffect(() => {
        setLoading(false)
        loadData()
        setLoading(true)
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
    
    generateBoxShadowStyle(-4, 10, '#171717', 1, 10, 6, '#171717');



    return (
      <View style={styles.container}>
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >

            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tab, activeTab == 'progressing' && styles.activeTab]} activeOpacity={1} onPress={() => setActiveTab("progressing")}>
                    <Text style={styles.tabTitle}>Progressing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, activeTab == 'upcomming' && styles.activeTab]} activeOpacity={1} onPress={() => setActiveTab("upcomming")}>
                    <Text style={styles.tabTitle}>Upcomming</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, activeTab == 'history' && styles.activeTab]} activeOpacity={1} onPress={() => setActiveTab("history")}>
                    <Text style={styles.tabTitle}>History</Text>
                </TouchableOpacity>
            </View> 
            

            {activeTab == "progressing" && (progressings.map((appointment, index) => <AppointmentCard key={index} appointment={appointment} />))}
            {activeTab == "upcomming" && (upcommings.map((appointment, index) => <AppointmentCard key={index} appointment={appointment} />))}
            {activeTab == "history" && (histories.map((appointment, index) => <AppointmentCard key={index} appointment={appointment} />))}

        </ScrollView>
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14,


        paddingTop: 20,

        backgroundColor: '#FDFDFD',
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
        width: "30%",
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

export default BookingScreen