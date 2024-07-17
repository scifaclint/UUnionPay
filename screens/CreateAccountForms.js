import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Image } from "expo-image";
import constants from "expo-constants";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { API_END } from "../utils/Config";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { CheckBox } from "react-native-elements";
import { Col } from "react-native-table-component";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Alerts from "../effects/Alerts";
import Loading from "../modals/Loading";

//
const Status_BarHeight =
  Platform.OS === "ios" ? constants.statusBarHeight : StatusBar.currentHeight;

function CreateAccountForms({ navigation, route }) {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [loadi, setloadi] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeT, setagreeT] = useState(false);
  const [alertBox, setAlertBox] = useState(false);
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [title, setTitle] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [eyeon, showEyeon] = useState("eye");
  const [eyeconfirm, showEyeonCon] = useState("eye");
  const [showPc, setshowpc] = useState(true);

  /// functions
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const trimField = (text) => {
    return text.trim();
  };
  // validate forms
  const vmessage =
    "There are errors in your form. Please ensure all Fields are of valid format, and agree to the Terms and Conditions before submitting.";
  const validatEform = () => {
    if (
      firstName &&
      lastName &&
      agreeT &&
      password &&
      email &&
      password === confirmPassword
    ) {
      return true;
    } else {
      vmessage = "Passwords do not match.Please try again";
      return false;
    }
  };

  const hideAlert = () => {
    setAlertBox(false);
  };

  const handleSubmit = async () => {
    if (validatEform()) {
      setloadi(true);
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        // continue from here
        sendData = await fetch(`${API_END}/api/addUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            balance: 870,
            transactions: [],
          }),
        });
        setloadi(false);
        navigation.navigate("FaceAuthen", {
          email: email,
        });
      } catch (error) {
        setloadi(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setTitle("Sign Up Error");
        setTypeAlert("failed");
        setMessage(
          "Please make sure your password is at least 6 characters long and the email is not already in use."
        );
        setAlertBox(true);
      }
    } else {
      console.log(validatEform());
      setTitle("Forms Error");
      setMessage(vmessage);
      setTypeAlert("failed");
      setAlertBox(true);
    }
  };
  const handleView = () => {};
  return (
    <>
      <StatusBar backgroundColor={Color.colorDarkslateblue_200} />
      <View style={styles.container}>
        <View>
          <View style={styles.imageTop}>
            <Image
              contentFit="cover"
              style={{
                height: 60,
                width: 60,
                position: "absolute",
                top: hp("8%"),
                left: wp("40%"),
              }}
              source={require("../assets/ellipse-1.png")}
            />
            <Text
              style={{
                top: hp("18%"),
                left: wp("30%"),
                color: Color.colorDarkslateblue_300,
                fontFamily: FontFamily.poppinsBold,
                fontSize: 15,
              }}
            >
              Create An Account
            </Text>
          </View>
        </View>
        <View
          // first and last name
          style={{
            flexDirection: "row",
            top: hp("22%"),
          }}
        >
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => setFirstname(text)}
            style={styles.inputLF}
          ></TextInput>
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => setLastname(text)}
            style={[styles.inputLF, styles.lastN]}
          ></TextInput>
        </View>
        <View
          style={{
            top: hp("24%"),
          }}
          // others form area
        >
          <TextInput
            style={[styles.inputLL]}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(trimField(text))}
          />
          <TextInput
            style={[styles.inputLL]}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(trimField(text))}
            secureTextEntry={showPassword}
          ></TextInput>
          <TextInput
            style={[styles.inputLL]}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(trimField(text))}
            secureTextEntry={showPc}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            top: hp("24%"),
            justifyContent: "center",
          }}
          // others here
        >
          <View
            style={{
              height: 50,
              width: 50,
            }}
          >
            <CheckBox
              uncheckedColor={Color.colorDarkslateblue_200}
              style={{
                position: "absolute",
                backgroundColor: "transparent",
                borderWidth: 0,
                margin: 0,
                padding: 0,
              }}
              checked={agreeT}
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxText}
              onPress={() => setagreeT(!agreeT)}
            />
          </View>
          <Text
            style={{
              top: 15,
              fontFamily: FontFamily.interBold,
              color: Color.colorDarkslateblue_600,
            }}
          >
            I agree to Terms and Conditions
          </Text>
        </View>
        <View
          //
          style={{
            flexDirection: "row",
            top: hp("25%"),
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: FontFamily.interBold,
              color: Color.colorDarkslateblue_600,
            }}
          >
            Already have an account ?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            // handle onpress later
          >
            <Text
              style={{
                paddingLeft: 8,
                color: "#2356D7",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
        <View
          // submit button
          style={{
            justifyContent: "center",
            top: hp("30%"),
          }}
        >
          <TouchableOpacity
            // on submit press
            onPress={handleSubmit}
            style={styles.submitB}
          >
            <Text
              style={{
                top: 10,
                fontFamily: FontFamily.dMSansBold,
                fontWeight: "bold",
                color: Color.colorDarkslateblue_600,
                textAlign: "center",
                color: Color.colorWhitesmoke_200,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        <Alerts
          showAlert={alertBox}
          title={title}
          message={message}
          hideVerifyAlert={hideAlert}
          typeOfAlert={typeAlert}
        />
        <Loading isVisible={loadi} />
        <TouchableOpacity
          onPress={() => {
            if (showPassword) {
              setShowPassword(false);
              showEyeon("eye-off");
            } else {
              setShowPassword(true);
              showEyeon("eye");
            }
          }}
          style={{
            left: "85%",
            bottom: "5%",
          }}
        >
          <Feather
            name={eyeon}
            size={24}
            color={Color.colorDarkslateblue_200}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (showPc) {
              setshowpc(false);
              showEyeonCon("eye-off");
            } else {
              setshowpc(true);
              showEyeonCon("eye");
            }
          }}
          style={{
            left: "85%",
            top: "0%",
          }}
        >
          <Feather
            name={eyeconfirm}
            size={24}
            color={Color.colorDarkslateblue_200}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Status_BarHeight,
    width: wp("100%"),
    justifyContent: "flex-start",
    backgroundColor: Color.lightPrimaryKeyBackground,
  },
  imageTop: {
    top: "50%",
  },
  submitB: {
    height: wp("10%"),
    width: wp("50%"),
    borderWidth: 1,
    borderColor: Color.colorWhitesmoke_200,
    borderStyle: "solid",
    backgroundColor: Color.colorDarkslateblue_200,
    left: "25%",
    borderRadius: 12,
    borderStyle: "solid",
  },
  inputLF: {
    borderWidth: 1,
    borderColor: Color.colorDarkslateblue_300,
    height: wp("12%"),
    width: wp("40%"),
    borderRadius: 12,
    borderStyle: "solid",
    padding: 10,
    left: wp("3.5%"),
    backgroundColor: "#E7F0FE",
    marginBottom: 10,
  },
  lastN: {
    left: wp("15%"),
  },
  inputLL: {
    borderWidth: 1,
    borderColor: "#E7F0FE",
    height: wp("12%"),
    width: wp("80%"),
    borderRadius: 12,
    borderStyle: "solid",
    padding: 10,
    left: wp("3.5%"),
    backgroundColor: "#E7F0FE",
    marginBottom: 20,
  },
});
export default CreateAccountForms;
