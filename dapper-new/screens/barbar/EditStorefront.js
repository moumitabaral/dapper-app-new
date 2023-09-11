import { Button, Input, Text } from '@rneui/base';
import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as  ImagePicker from 'expo-image-picker'
import { StoreContext } from '../../App';
import axios from '../../utils';


const EditStorefront = ({navigation, shop}) => {

    const {state, setState} = React.useContext(StoreContext)
    const [submitting, setSubmitting] = React.useState(false)
    const [data, setData] = React.useState({
        name: "",
        image: null,
        address: "",
        latitude: "",
        longitude: ""
    })

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 3],
          quality: 1
        })
    
        if(!result.canceled) {
          setData({...data, image: result.assets[0]})
        }
    }
    
    const send = (event) => {
        event.preventDefault()

        const formData = new FormData()


        formData.append("name", data.name)
        formData.append("address", data.address)
        formData.append("latitude", data.latitude)
        formData.append("longitude", data.longitude)

        if(data.image) {
            const uri = Platform.OS === "android" ? data.image.uri : data.image.uri.replace("file://", "");
            const filename = data.image.uri.split("/").pop();
            const match = /\.(\w+)$/.exec(filename);
            const ext = match?.[1];
            const type = match ? `image/${match[1]}` : `image`;
            formData.append("image", {
                uri: uri,
                type: type,
                name: `image.${ext}`
            })
        }
        else {
            formData.append("image", "")
        }
        
        if(shop) {
            formData.append("id", shop.id)
        }

        axios.post("/shop", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            if(response.status == 200) {
                if(shop)
                    alert("Shop updated")
                else 
                    alert("New shop added")
            }
        })
        .catch(error => console.error(error))
    }

    return (
        <View style={styles.container}>
            <View style={styles.topFrame}>
                <TouchableOpacity activeOpacity={0.5} style={styles.photoUpload} onPress={pickImage}>
                {
                    data.image ? (
                    <Image
                        style={{height: 115, width: 115, borderRadius: 100}}
                        resizeMode="cover"
                        source={{uri: data.image.uri}}
                    />
                    ) : (
                    <Image
                        resizeMode="cover"
                        source={require("../../assets/akariconsimage.png")}
                    />
                    )
                }
                </TouchableOpacity>
            </View>

            <Text style={styles.text}>Edit Shop</Text>
            
            <TextInput
                style={styles.input}
                cursorColor="black"
                value={data.name}
                placeholder="Shop name"
                onChangeText={(text) => setData(data => ({...data, name: text}))}
                autoCorrect={false}
            />


            <TextInput
                style={styles.input}
                cursorColor="black"
                value={data.address}
                placeholder="Shop Address"
                onPressIn={() => navigation.navigate("SearchScreen", {data, setData})}
                autoCorrect={false}
            />

            <Button 
                buttonStyle={styles.buttonStyle} 
                onPress={(event) => send(event)} 
                loading={submitting} 
                disabled={submitting}>Save</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
        padding: 14
    },
    text: {
        fontSize: 20,
        paddingLeft: 10,
        marginVertical: 10,
    },
    topFrame: {
        flexDirection: "row", 
        justifyContent: "center"
      },
      photoUpload: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 120,
        width: 120,
        borderRadius: 100,
        backgroundColor: "#0088E0"
      },
    containerStyle: {
        paddingTop: 10,
    },
    input: {
        height: 45,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: "grey",
        fontSize: 18
    },  
    inputContainerStyle: {
        borderRadius: 8,
        borderColor: "grey",
        borderBottomWidth: 0.5,
        borderWidth: 0.5,
    },
    inputStyle: {
        paddingLeft: 10
    },
    errorStyle: {
       margin: 2
    },
    buttonStyle: {
        height: 55,
        borderRadius: 8,
        backgroundColor: "#0088E0"
    },
});

const inputStyles = StyleSheet.create({
    container: {
      marginTop: 10,
      marginBottom: 20,
      marginHorizontal: 10,
      flex: 0
    },
    textInputContainer: {
      paddingBottom: 0
    },
    textInput: {
        backgroundColor: "white",
        borderRadius: 8,
        borderColor: "grey",
        borderBottomWidth: 0.5,
        borderWidth: 0.5,
        fontSize: 18
    }
});

export default EditStorefront