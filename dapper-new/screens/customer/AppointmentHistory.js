import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { StoreContext } from '../../App';
import axios from '../../utils';


const AppointmentHistory = ({route, navigation}) => {

    const {state, setState} = React.createContext(StoreContext)
    const [isLoading, setLoading] = React.useState(false)
    const [history, setHistory] = React.useState([
        {
            id: "1",
            image: require("../../assets/logo.png"),
            shop_name: "Trim Me Shop",
            price: 79,
            dateTime: new Date(),
            created_at: new Date(),
            services: [
                {
                    id: "1",
                    image: require("../../assets/logo.png"),
                    service_name: "Waxing",
                    price: 30
                },
                {
                    id: "2",
                    image: require("../../assets/logo.png"),
                    service_name: "Hair Cut",
                    price: 49
                }
            ]

        },
        {
            id: "2",
            image: require("../../assets/logo.png"),
            shop_name: "Senetary Shop",
            price: 100,
            dateTime: new Date(),
            created_at: new Date(),
            services: [
                {
                    id: "3",
                    image: require("../../assets/logo.png"),
                    service_name: "Hair Cut",
                    price: 50
                },
                {
                    id: "4",
                    image: require("../../assets/logo.png"),
                    service_name: "Waxing",
                    price: 50
                }
            ]

        }
    ])

    const Item = ({item}) => {
        return (
            <TouchableOpacity 
                style={styles.item}
                activeOpacity={1}
            >

            </TouchableOpacity>
        )
    }

    return (
    <>
      <View style={styles.container}>
        <FlatList 
            data={history}
            renderItem={Item}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
        padding: 14
    },
    item: {
        
    }

})

export default AppointmentHistory