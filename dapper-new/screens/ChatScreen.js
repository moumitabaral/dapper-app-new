import { Avatar, Button, Text } from '@rneui/base'
import React from 'react'
import { FlatList, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import axios from '../utils';
import { StoreContext } from '../App';
import { format } from 'date-fns';

const ChatScreen = ({route, navigation}) => {

    const {state} = React.useContext(StoreContext)

    const [loading, setLoading] = React.useState(false)
    const [chats, setChats] = React.useState([])
    const [user, setUser] = React.useState(state.user)

    const [message, setMessage] = React.useState("")
    const {friend} = route.params
    console.log(friend)

    
    const send = () => {

        axios.post("/chat", {
            "receiver_id": friend.id,
            "message": message
        })
        .then((response) => {
            if(response.status == 200) {
                setChats(chats => ([...chats, {sender_id: user.id, receiver_id: friend.id, message, created_at: Date.now()}]))
                setMessage("")
            }
        })
    }

    const loadMessage = () => {
        axios.get(`/chat/${friend?.id}`)
        .then(response => {
            setChats(response.data.chats)
        })
    }

    React.useEffect(() => {
        setLoading(true)
        loadMessage()
        setLoading(false)
        const intervalId = setInterval(() => loadMessage(), 2000)

        return () => clearInterval(intervalId)
    }, [])

    const MyMessage = ({message, created_at}) => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 5}}>
                <View style={{
                    paddingHorizontal: 10, 
                    paddingVertical: 5, 
                    borderRadius: 10, 
                    backgroundColor: "#AE8447", 
                    minWidth: "30%",
                    maxWidth: "80%"

                }}>
                    <Text style={{color: "white", fontSize: 16}}>{message}</Text>
                    
                    <View style={{flexDirection: "row", justifyContent: "flex-end", marginTop: 2}}>
                        <Text style={{color: "white"}}>{format(new Date(created_at), 'HH:mm')}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const OtherMessage = ({message, created_at}) => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5}}>
                <View style={{
                    paddingHorizontal: 10, 
                    paddingVertical: 5, 
                    borderRadius: 10, 
                    backgroundColor: "#F2F2F2", 
                    minWidth: "30%",
                    maxWidth: "80%"

                }}>
                    <Text style={{color: "#6C6C6C", fontSize: 16}}>{message}</Text>

                    <View style={{flexDirection: "row", justifyContent: "flex-end", marginTop: 2}}>
                        <Text style={{color: "#6C6C6C"}}>{format(new Date(created_at), 'HH:mm')}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const ChatRenderItem = ({item}) => {
        if(item.sender_id == user.id) {
            return <MyMessage key={item.id} message={item.message.trim()} created_at={item.created_at} />
        }
        else {
            return <OtherMessage key={item.id} message={item.message.trim()} created_at={item.created_at} />
        }
    }

    return (
        <SafeAreaView style={{flex: 1}} forceInset={{top: "alaways"}}>
            <StatusBar style="light" backgroundColor='#AE8447' />
            <View style={{flex: 1, backgroundColor: "#fff"}}>
                    <View style={{flex: 0.10, flexDirection: "row", backgroundColor: '#AE8447'}}>
                        <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 14}}>
                            <Ionicons name="chevron-back" size={30} color="white" onPress={() => navigation.goBack()} />
                            <View style={{marginLeft: 20}}>
                                <Avatar 
                                    size={40}
                                    rounded
                                    source={{uri: `https://digitalplutform.com/trimme/storage/app/${friend?.image}`}}
                                />
                            </View>
                            <View style={{flexDirection: "column", marginLeft: 20}}>
                                <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}>{friend?.name}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 0.8, padding: 14}}>
                        {loading ? (
                            <View style={{justifyContent: "center", alignItems: "center"}}>
                                <Text>Loading</Text>
                            </View>
                        ) : (
                            <FlatList 
                                data={chats}
                                renderItem={ChatRenderItem}
                                keyExtractor={(item) => item.id}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                            />
                        )}

                    </View>


                    <View style={{flex: 0.1, flexDirection: "row", alignItems: "flex-end"}}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <TextInput
                                multiline
                                style={styles.input}
                                cursorColor="grey"
                                placeholder="Message"
                                value={message}
                                onChangeText={text => setMessage(text)}
                                autoCorrect={false}
                            />
                            <Button
                                buttonStyle={{borderRadius: 50, height: 45}}
                                onPress={() => send()}
                            >
                                <Ionicons name="send" size={24} color="white" />
                            </Button>
                        </View>
                    </View>
            </View>    
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        width: "80%",
        height: 45,
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: "grey",
        fontSize: 18
    },  
})

export default ChatScreen