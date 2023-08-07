import * as React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input } from "@rneui/base";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import axios from "../../utils/index";
import * as ImagePicker from "expo-image-picker";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function Signup({ route, navigation }) {
  const { role } = route.params;
  const [submitting, setSubmitting] = React.useState(false);
  const [hasErr, setHasErr] = React.useState(false);
  const [err, setErr] = React.useState([]);
  const [image, setImage] = React.useState(null);

  const [data, setData] = React.useState({
    role: role,
    image: null,
    name: "",
    nickname: "",
    email: "",
    phone: "",
    gender: "",
  });

  const sex = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setData({ ...data, image: result.assets[0] });
    }
  };

  const send = async () => {
    const formData = new FormData();

    formData.append("role", data.role);
    formData.append("name", data.name);
    formData.append("nickname", data.nickname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("longitude", data.longitude);
    formData.append("latitude", data.latitude);

    if (data.image) {
      const uri =
        Platform.OS === "android"
          ? data.image.uri
          : data.image.uri.replace("file://", "");
      const filename = data.image.uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : `image`;
      formData.append("image", {
        uri: uri,
        type: type,
        name: `image.${ext}`,
      });
    } else {
      formData.append("image", "");
    }

    setSubmitting(true);
    setHasErr(false);
    setErr([]);
    try {
      const response = await axios.post("/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSubmitting(false);
      // navigation.navigate("OTPVerification", { email: data.email });
    } catch (err) {
      setSubmitting(false);
      if (err.response.status == 400) {
        setHasErr(true);
        setErr(err.response.data.errors);
      } else {
        setHasErr(true);
        setErr(["Server error, try again later."]);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "alaways" }}>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <AntDesign
            name="left"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />

          <View style={styles.topFrame}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.photoUpload}
              onPress={pickImage}
            >
              {data.image ? (
                <Image
                  style={{ height: 115, width: 115, borderRadius: 100 }}
                  resizeMode="cover"
                  source={{ uri: data.image.uri }}
                />
              ) : (
                <Image
                  resizeMode="cover"
                  source={require("../../assets/akariconsimage.png")}
                />
              )}
            </TouchableOpacity>
            {!data.image && (
              <Text style={styles.profilephotoText}>Add Profile Photo</Text>
            )}
          </View>

          <Text style={styles.signupText}>Sign Up</Text>

          {hasErr && (
            <View
              style={{
                backgroundColor: "#fb5151",
                padding: 8,
                margin: 12,
                borderRadius: 4,
              }}
            >
              {err.map((err, index) => (
                <Text key={index} style={{ color: "white", fontSize: 16 }}>
                  {err}
                </Text>
              ))}
            </View>
          )}

          <Input
            placeholder="Full Name"
            containerStyle={{ ...styles.containerStyle, paddingTop: 30 }}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            errorStyle={styles.errorStyle}
            onChangeText={(text) =>
              setData((data) => ({ ...data, name: text }))
            }
          />

          <Input
            placeholder="Nick name"
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            errorStyle={styles.errorStyle}
            onChangeText={(text) =>
              setData((data) => ({ ...data, nickname: text }))
            }
          />
          <Input
            placeholder="Email address"
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            errorStyle={styles.errorStyle}
            onChangeText={(text) =>
              setData((data) => ({ ...data, email: text }))
            }
          />

          <TextInput
            style={styles.input}
            cursorColor="black"
            value={data.address}
            placeholder="Address"
            // onPressIn={() =>
            //   navigation.navigate("SearchScreen", { data, setData })
            // }
            autoCorrect={false}
          />

          <Input
            placeholder="Phone number"
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            errorStyle={styles.errorStyle}
            onChangeText={(text) =>
              setData((data) => ({ ...data, phone: text }))
            }
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
              itemTextStyle={styles.placeholderStyle}
              onChange={(item) =>
                setData((data) => ({ ...data, gender: item.value }))
              }
            />
          </View>

          <Button
            buttonStyle={styles.buttonStyle}
            onPress={() => send()}
            loading={submitting}
            disabled={submitting}
          >
            <Text style={styles.primaryButtonTextStyle}>Sign Up</Text>
          </Button>

          <View style={styles.loginFrame}>
            <Text style={styles.hasAccountText}>Already have an account? </Text>
            <Text
              style={styles.signinText}
              // onPress={() => navigation.navigate("EmailLogin")}
            >
              Sign in
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

{
  /* <GooglePlacesAutocomplete 
placeholder="Office address"
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
  setData({...formData, 
    address: data.description, 
    latitude: details.geometry.location.lat,
    longitude: details.geometry.location.lng
  })
}}
/> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14,
  },
  topFrame: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  photoUpload: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    width: 120,
    borderRadius: 100,
    backgroundColor: "#AE8447",
  },
  loginFrame: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 24,
  },
  hasAccountText: {
    fontSize: 14,
    color: "#575757",
    fontFamily: "Poppins_400Regular",
  },
  signinText: {
    fontSize: 14,
    color: "#171717",
    fontFamily: "Poppins_500Medium",
  },
  signupText: {
    color: "#4A4A4A",
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    paddingLeft: 10,
  },
  containerStyle: {
    paddingTop: 10,
  },
  input: {
    height: 45,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    fontSize: 14,
    color: "#575757",
    fontFamily: "Poppins_400Regular",
  },
  inputContainerStyle: {
    borderRadius: 8,
    borderColor: "#D8D8D8",
    borderWidth: 1,
  },
  inputStyle: {
    paddingLeft: 10,
    fontSize: 14,
    color: "#575757",
    fontFamily: "Poppins_400Regular",
  },
  errorStyle: {
    margin: 2,
  },
  buttonStyle: {
    height: 55,
    borderRadius: 8,
    backgroundColor: "#AE8447",
    marginHorizontal: 10,
    paddingVertical: 16,
  },
  primaryButtonTextStyle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#fff",
  },
  dropdownContainer: {
    flexDirection: "column",
    width: "97%",
    alignItems: "center",
    paddingLeft: 10,
    paddingBottom: 20,
  },
  dropdown: {
    height: 50,
    borderColor: "#D8D8D8",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
    height: 43,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#575757",
    fontFamily: "Poppins_400Regular",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#575757",
    fontFamily: "Poppins_400Regular",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: "#575757",
    fontFamily: "Poppins_400Regular",
  },
  profilephotoText: {
    fontSize: 14,
    color: "#575757",
    fontFamily: "Poppins_400Regular",
  },
});

const inputStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    flex: 0,
  },
  textInputContainer: {
    paddingBottom: 0,
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "grey",
    borderBottomWidth: 0.5,
    borderWidth: 0.5,
    fontSize: 18,
  },
});
