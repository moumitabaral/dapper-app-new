import { Button, Input, Text } from '@rneui/base';
import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import * as  ImagePicker from 'expo-image-picker'
import axios from '../../utils/index';

const EditServiceScreen = ({route, navigation}) => {

    const {service} = route.params

    const [data, setData] = React.useState({
        name: "",
        description: "",
        image: null,
        price: 0
    })

    const [submitting, setSubmitting] = React.useState(false)

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
        formData.append("description", data.description)
        formData.append("price", data.price)

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

        setSubmitting(true)
        axios.post("/service", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            if(response.status == 200) {
                alert("New Service added")
                // priceRef.current.clear();
                // nameRef.current.clear();
                // descriptionRef.current.clear();
                // setData({
                //     name: "",
                //     description: "",
                //     image: null,
                //     price: 0
                // })
            }
        })
        .catch(error => console.error(error))
        .finally(() => setSubmitting(false))
    }

    React.useEffect(() => {
       setData(data => ({
            ...data,
            name: service.name,
            description: service.description,
            price: `${service.price}`
        }))
    }, [])


    return (
        <View style={styles.container}>
            <ScrollView 
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                
                    <View>
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
                        <Text style={styles.text}>Edit Service</Text>
                        

                        <TextInput
                            style={styles.input}
                            cursorColor="black"
                            value={data.name}
                            placeholder="Service name"
                            onChangeText={(text) => setData(data => ({...data, name: text}))}
                            autoCorrect={false}
                        />

                        <TextInput
                            style={styles.input}
                            cursorColor="black"
                            value={data.description}
                            placeholder="Service description"
                            onChangeText={(text) => setData(data => ({...data, description: text}))}
                            autoCorrect={false}
                        />

                        <TextInput
                            style={styles.input}
                            cursorColor="black"
                            value={data.price}
                            placeholder="Price"
                            onChangeText={(text) => setData(data => ({...data, price: text}))}
                            autoCorrect={false}
                            // keyboardType="numeric"
                        />
                        
                    </View>

                    <Button 
                        buttonStyle={styles.buttonStyle} 
                        onPress={(event) => send(event)} 
                        loading={submitting} 
                        disabled={submitting}>Save</Button>
                
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

export default EditServiceScreen