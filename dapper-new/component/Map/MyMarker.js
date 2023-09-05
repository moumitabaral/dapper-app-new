import React from 'react'
import { isEqual } from 'lodash'
import { Marker } from 'react-native-maps'

const MyMarker = ({latitude, longitude}) => {
    return (
        <Marker
            image={require("../../assets/pin.png")}
            coordinate={{latitude: Number(latitude), longitude: Number(longitude)}}
            pinColor="black"
        />
    )
}

export default MyMarker