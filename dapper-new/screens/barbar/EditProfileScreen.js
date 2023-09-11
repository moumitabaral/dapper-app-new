import { Button, Input, Text } from '@rneui/base';
import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import * as  ImagePicker from 'expo-image-picker'
import { Dropdown } from 'react-native-element-dropdown';
import axios from '../../utils/index';

const EditProfile = ({navigation}) => {

    const [data, setData] = React.useState({
        id: "",
        image: null,
        name: "",
        nickname: "",
        email: "",
        phone: "",
        gender: "",
        address: "",
        longitude: "",
        latitude: ""
    })

    const sex = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ]

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

        formData.append("id", data.id)
        formData.append("name", data.name)
        formData.append("nickname", data.nickname)
        formData.append("email", data.email)
        formData.append("phone", data.phone)
        formData.append("gender", data.gender)
        formData.append("address", data.address)
        formData.append("longitude", data.longitude)
        formData.append("latitude", data.latitude)
  

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
        axios.post(`/user/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            if(response.status == 200) {
                alert("User data updated successfully")
                axios.get("/user/is-authenticate")
                .then(response => {
                  if(response.status == 200) {
                    const user = {...response.data.user}
                    setData({
                        id: user.id,
                        name: user.name,
                        nickname: user.nickname,
                        email: user.email,
                        phone: user.phone,
                        address: user.address,
                        gender: user.gender,
                        longitude: user.longitude,
                        latitude: user.latitude,
                        image: user.image ? {uri: `https://digitalplutform.com/server/storage/app/${user.image}`} : null
                    })
                  }
                })
                .catch(console.log)
                
            }
        })
        .catch(error => console.error(error))
        .finally(() => setSubmitting(false))
    }

    React.useEffect(() => {
        axios.get("/user/is-authenticate")
        .then(response => {
          if(response.status == 200) {
            const user = {...response.data.user}
            setData({
                id: user.id,
                name: user.name,
                nickname: user.nickname,
                email: user.email,
                phone: user.phone,
                address: user.address,
                gender: user.gender,
                longitude: user.longitude,
                latitude: user.latitude,
                image: user.image ? {uri: `https://digitalplutform.com/server/storage/app/${user.image}`} : null
            })
          }
        })
        .catch(console.log)
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
                        <Text style={styles.text}>Edit Profile</Text>
                        
                        <TextInput
                            style={styles.input}
                            cursorColor="black"
                            value={data.name}
                            placeholder="Name"
                            onChangeText={(text) => setData(data => ({...data, name: text}))}
                            autoCorrect={false}
                        />

                        <TextInput
                            style={styles.input}
                            cursorColor="black"
                            value={data.nickname}
                            placeholder="Nickname"
                            onChangeText={(text) => setData(data => ({...data, nickname: text}))}
                            autoCorrect={false}
                        />

                        <TextInput
                            style={styles.input}
                            cursorColor="black"
                            value={data.email}
                            placeholder="Email Address"
                            onChangeText={(text) => setData(data => ({...data, email: text}))}
                            autoCorrect={false}
                        />

                        <TextInput
                            style={styles.input}
                            cursorColor="black"
                            value={data.address}
                            placeholder="Address"
                            onPressIn={() => navigation.navigate("SearchScreen", {data, setData})}
                            autoCorrect={false}
                        />

                        <TextInput
                            style={styles.input}
                            cursorColor="black"
                            value={data.phone}
                            placeholder="Phone"
                            onChangeText={(text) => setData(data => ({...data, phone: text}))}
                            autoCorrect={false}
                            keyboardType="numeric"
                        />
                        
                        <View style={styles.dropdownContainer}>
                            <Dropdown 
                                data={sex}
                                value={data.gender}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Gender"
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                onChange={item => setData(data => ({...data, gender: item.value}))}
                            />
                        </View>
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
    buttonStyle: {
        height: 55,
        borderRadius: 8,
        backgroundColor: "#0088E0"
    },
    dropdownContainer: {
        flexDirection: "column", 
        width: "97%", 
        alignItems: "center", 
        paddingLeft: 10, 
        paddingBottom: 20
      },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: "100%",
        height: 43
      },
});



export default EditProfile