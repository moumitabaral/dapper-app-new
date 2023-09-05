import { Button, Input, Text } from '@rneui/base'
import React from 'react'
import { Image, ScrollView, StyleSheet, View, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const BarbarReview = ({route, navigation}) => {

  const [star, setStar] = React.useState(0)
  const [submitting, setSubmitting] = React.useState(false)
  const [feedback, setFeedBack] = React.useState("")

  const send = () => {
    alert("Thanks for your feedback!")
  }

  return (
    <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "#fff", padding: 14}}>
        <Image 
          source={require("../../assets/review.png")}
        />
        <Text h3 h3Style={{color: "#AE8447"}}>Thank You</Text>
        <Text h3 h3Style={{color: "#AE8447"}}>Your Job is Completed</Text>

        <Text style={{fontSize: 18, color: "grey", marginTop: 15}}>Please take the time to review your barbar</Text>
        <Text style={{fontSize: 18, color: "grey", marginBottom: 15}}>so that other may benifit</Text>

        <View style={{flexDirection: "row", marginTop: 15}}>
          <AntDesign name={(star >=1) ? "star" : "staro"} size={30} color="#F9B53F" style={{marginLeft: 10}} onPress={() => setStar(1)}/>
          <AntDesign name={(star >=2) ? "star" : "staro"} size={30} color="#F9B53F" style={{marginLeft: 10}} onPress={() => setStar(2)}/>
          <AntDesign name={(star >=3) ? "star" : "staro"} size={30} color="#F9B53F" style={{marginLeft: 10}} onPress={() => setStar(3)}/>
          <AntDesign name={(star >=4) ? "star" : "staro"} size={30} color="#F9B53F" style={{marginLeft: 10}} onPress={() => setStar(4)}/>
          <AntDesign name={(star >=5) ? "star" : "staro"} size={30} color="#F9B53F" style={{marginLeft: 10}} onPress={() => setStar(5)}/>
        </View>

        <Input 
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          onChangeText={(text) => {setFeedBack(text)}}
        />

        <Button 
          containerStyle={{width: '50%'}}
          buttonStyle={{height:45, borderRadius: 100}}
          onPress={() => send()} 
          loading={submitting} disabled={submitting}>Submit Review</Button>

        <Button 
          containerStyle={{width: '50%', marginTop: 10}}
          buttonStyle={{height:45, borderRadius: 100, backgroundColor: "whitesmoke"}}
          titleStyle={{color: "grey"}}
          onPress={() => send()} 
          loading={submitting} disabled={submitting}>Cancel</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 10,
  },
  inputContainerStyle: {
    marginHorizontal: 20, 
    borderRadius: 8,
    borderColor: "#AE8447",
    borderBottomWidth: 1,
    borderWidth: 1,
  },
  inputStyle: {
    paddingLeft: 10,
  },
})

export default BarbarReview