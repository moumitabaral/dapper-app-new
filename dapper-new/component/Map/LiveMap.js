import React from 'react'
import MapView from 'react-native-maps'
import { Dimensions } from 'react-native'
import MyMapViewDirection from './MyMapViewDirection'
import MyMarker from './MyMarker'
import { isEqual } from 'lodash'

const Map = ({shopLocaiton, locations}) => {

    const { width, height } = Dimensions.get('window')
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = 0.0922
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
    
    const {friend, shop} = locations
    const mapRef = React.useRef(null)

    React.useEffect(() => {
        if(!friend.description || !shop.description)
            return 
        else{
            setTimeout(function() {
                mapRef.current.fitToSuppliedMarkers(["friend", "shop"], {
                    edgePadding: {
                        right: (width / 20),
                        bottom: (height / 20),
                        left: (width / 20),
                        top: (height / 20),
                    },
                    animated: true
                })
            }, 400)
        }
    })

    return (
        <MapView
            ref={mapRef}
            provider="google"
            style={{
                flex: 1
            }}
            region={{
                latitude: friend.coords.latitude || initialRegion.latitude,
                longitude: friend.coords.longitude || initialRegion.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}
            showsMyLocationButton
            showsUserLocation
        >
            {
                friend.description && 
                shop.description && 
                <MyMapViewDirection 
                    friend={friend.coords} 
                    shop={shop.coords} 
                />
            }
            
            {
                friend.coords.latitude && 
                friend.coords.longitude && 
                <MyMarker 
                    place={friend}
                    identifier="friend"
                />
            }

            {
                shop.coords.latitude && 
                shop.coords.longitude && 
                <MyMarker 
                    place={shop}
                    identifier="shop"
                />
            }
        </MapView>
    )
}

const areEqual = (prevProps, nextProps) => { 
    return (
        isEqual(prevProps.trip.friend, nextProps.trip.friend) &&
        isEqual(prevProps.trip.shop, nextProps.trip.shop)
    ) 
} 

export default React.memo(Map, areEqual)
