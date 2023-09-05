import React from 'react'
import { StyleSheet, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import SafeAreaView from 'react-native-safe-area-view'
import { StoreContext } from '../../App'

const SearchScreen = ({navigation}) => {

  const {state, setState} = React.useContext(StoreContext)

  return (
    <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
      <View style={styles.container}>
        <GooglePlacesAutocomplete 
          placeholder="Search location"
          nearbyPlacesAPI='GooglePlacesSearch'
          fetchDetails={true}
          returnKeyType="search"
          enablePoweredByContainer={false}
          isRowScrollable={true}
          query={{
              key: "AIzaSyB-qOmirCo6U4p9xg-iMUP1DspIqeP6aFY",
              language: 'en',
          }}
          debounce={400}
          styles={inputStyles}
          onPress={(data, details = null) => {
          setState({...state, 
              searchAddress: data.description, 
              searchLat: details.geometry.location.lat,
              searchLong: details.geometry.location.lng
          })
          navigation.goBack()
        }}
    />
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
})

const inputStyles = StyleSheet.create({
    container: {
      marginBottom: 20,
      marginHorizontal: 18,
      flex: 1,
      zIndex: 5000
    },
    textInputContainer: {
      paddingBottom: 0
    },
    textInput: {
        backgroundColor: "white",
        borderRadius: 50,
        borderColor: "black",
        borderBottomWidth: 0.5,
        borderWidth: 0.5,
        fontSize: 18
    }
  })

export default SearchScreen