import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Input, Text } from '@rneui/base'
import SafeAreaView from 'react-native-safe-area-view'
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "../../utils/index";

const PhoneLogin = ({navigation}) => {

  const [phone, setPhone] = React.useState("")
  const [isSubmitting, setSubmitting] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [error, setError] = React.useState([])

  const send = async () => {
    setSubmitting(true)
    setHasError(false)
    setError([])
    try {
      const response = await axios.post(`/user/login`, {phone, channel: "sms"})
      setSubmitting(false)
      if(response.status === 200) {
        navigation.navigate("OTPVerification", {phone, channel: "sms"})
      }
    }
    catch(err) {
      setSubmitting(false)
      setHasError(true)
      console.log(err)
      if(err?.response?.status === 400) {
        setError(err?.response?.data?.errors)
      }
      else if (err?.response?.status === 401) {
        setError([err?.response?.data?.error])
      }
      else {
        setError(["Oops, something went wrong"])
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
          <Text h3 h3Style={styles.loginText}>Login</Text>
          {hasError && (
            <View style={{backgroundColor: "#fb5151", padding: 8, marginVertical: 15, marginHorizontal: 12, borderRadius: 4}}>
              {error.map((err, index) => (
                <Text key={index} style={{color: "white", fontSize: 16}}>{err}</Text>
              ))}
            </View>
          )}
          <Input 
              placeholder='Phone number'
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              leftIcon={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
              leftIconContainerStyle={styles.leftIconContainerStyle}
              onChangeText={setPhone}
          />
          <Button buttonStyle={styles.primaryButtonStyle} loading={isSubmitting} disabled={isSubmitting} onPress={() => send()}>Log In</Button>
          <View style={styles.dividerText}>
            <Text style={styles.dividerTextStyle}>Or</Text>
          </View>
          <TouchableOpacity 
            style={styles.secondaryButtonStyle} 
            titleStyle={styles.secondaryButtonTitleStyle}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("EmailLogin")}
          >
            <MaterialCommunityIcons name="email-outline" size={24} color="black" />
            <Text>Login with Email</Text>
            <AntDesign name="right" size={24} color="black" onPress={() => navigation.goBack()}/>
          </TouchableOpacity>
          <View style={styles.signupFrame}>
              <Text style={styles.noAccountText}>Don't have an account? </Text>
              <Text style={styles.signupText} onPress={() => navigation.navigate("SignupChoice")}>Sign Up</Text>
          </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14
  },
  loginContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  loginText: {
    color: "grey",
    marginBottom: 20,
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
  leftIconContainerStyle: {
    marginLeft: 10
  },
  primaryButtonStyle: {
    height: 55,
    borderRadius: 8,
    backgroundColor: "#AE8447"
  },
  secondaryButtonStyle: {
    height: 55,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#EFEFEF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  secondaryButtonTitleStyle: {
    color: "grey",
  },
  dividerText: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  dividerTextStyle: {
    fontSize: 20
  },
  signupFrame: {
    flexDirection: "row", 
    justifyContent: "center", 
    paddingTop: 24
  },
  noAccountText: {
    fontSize: 16, 
    color: "#6C6C6C"
  },
  signupText: {
    fontSize: 16, 
    fontWeight: "bold",  
    color: "#6C6C6C"
  },
})

export default PhoneLogin