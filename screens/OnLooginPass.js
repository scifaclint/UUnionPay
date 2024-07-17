import * as React from "react";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import Constants from "expo-constants";
import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";
import BackgroundFaceScan from "../modals/BackgroundFaceScan";
import Alerts from "../effects/Alerts";

const OnLoginPass = ({ navigation, route }) => {
  const { CurrentUser } = route.params;
  // handle face scanning and detection background success and failed
  const [faceScanVisible, setFaceScanVisible] = useState(false);
  const [alertBox, setAlertBox] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const successState = "true";
  const getUserName = "username";

  // ... handle back press default action
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Exit App",
          "Are you sure you want to exit the app?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            {
              text: "YES",
              onPress: async () => {
                try {
                  await AsyncStorage.removeItem("userData");
                  navigation.replace("Start");
                  BackHandler.exitApp();
                } catch (err) {
                  return;
                }
              },
            },
          ],
          { cancelable: false }
        );
        return true; // Prevents default back button behavior
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );
  // stop scan
  const closeFaceScan = () => {
    setFaceScanVisible(false);
    navigation.replace("LoginPass");
  };
  // sleep here
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  // start scan
  const startScan = async () => {
    // l
    setFaceScanVisible(true);
    await sleep(5000); // await model feedback
    setFaceScanVisible(false); // close camera on response
    // base on response render alert success or failed

    if (successState == "true") {
      alertSuccess();
    } else {
      alertFailed();
    }
  };

  // success
  const alertSuccess = () => {
    setTypeAlert("success");
    setTitle(" Verification Successful!");
    setMessage("You have been successfully verified.");
    setAlertBox(true);
  };

  // failed
  const alertFailed = () => {
    setTitle(" Verification Failed!");
    setTypeAlert("failed");
    setMessage("There was a problem verifying your face. Please try again.");
    setAlertBox(true);
  };
  // hideAlert after confirm
  const hideAlert = () => {
    // implement either to hide and nav to dashboard
    // or just hide

    setAlertBox(false);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "DashBoard",
          params: {
            UserEMail: CurrentUser,
          },
        },
      ],
    });
  };
  const handleScan = () => {
    if (!faceScanVisible) {
      startScan();
      // on okay from modal
      // if was success move to dashboard
    }
  };
  return (
    <View style={styles.welcomeBack}>
      <View
        style={{
          backgroundColor: "#b6d4dc",
          width: "45%",
          height: "22%",
          borderRadius: 50,
          top: "10%",
          left: "25%",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/UseProfile.svg")}
          style={{
            width: 100,
            height: 100,
            left: "25%",
          }}
        />
      </View>

      <TouchableOpacity
        // contact us
        style={styles.contactUs}
      >
        <Image
          style={styles.vectorIcon}
          contentFit="cover"
          source={require("../assets/vector.png")}
        />
        <Text style={styles.contact}>contact Us</Text>
      </TouchableOpacity>
      <View style={styles.messageBox}>
        <Text style={styles.welcUser}>Welcome back, {getUserName} !</Text>
        <Text style={styles.alertMessage}>
          To ensure it's really you, let's verify your identity
        </Text>
        <Text style={[styles.alertMessage, styles.unique]}>
          with a quick facial scan.
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleScan}
        // animation
        style={styles.animBox}
      >
        <LottieView
          source={require("../data/animatedFace.json")}
          autoPlay
          loop
          style={{
            height: 150,
            width: 150,
            backgroundColor: "transparent",
          }}
        />
        <Text style={styles.tapScanText}>Tap to scan</Text>
      </TouchableOpacity>

      <BackgroundFaceScan
        isVisible={faceScanVisible}
        onClose={closeFaceScan}
        type={"login"}
      />
      <Alerts
        showAlert={alertBox}
        title={title}
        message={message}
        hideVerifyAlert={hideAlert}
        typeOfAlert={typeAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeBack: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Color.lightPrimaryKeyBackground,
    justifyContent: "flex-start",
  },
  profileImage: {
    top: "4%",
    left: "15%",
  },
  vectorIcon: {
    height: 30,
    width: 40,
    left: 10,
    borderBottom: 2,
  },
  contactUs: {
    top: "68%",
    left: "38%",
  },
  contact: {
    color: Color.colorGray_100,
  },
  messageBox: {
    top: "8%",
  },
  welcUser: {
    color: Color.colorDarkslateblue_600,
    fontFamily: FontFamily.interExtraBold,
    left: "15%",
    fontSize: 19,
    paddingBottom: 10,
  },
  alertMessage: {
    fontFamily: FontFamily.interRegular,
    color: Color.colorDarkslateblue_100,
    fontSize: 14,
    left: "10%",
  },
  unique: {
    left: "30%",
  },
  animBox: {
    top: "11%",
    position: "relative",
    left: "28%",
  },
  tapScanText: {
    left: "10%",
    position: "absolute",
    top: "80%",
    fontFamily: FontFamily.dMSansBold,
    color: Color.colorDarkslateblue_400,
  },
  arrow: {
    top: "8%",
    position: "absolute",
    left: "5%",
  },
});

export default OnLoginPass;
