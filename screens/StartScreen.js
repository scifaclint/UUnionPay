import * as React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import CoverAnimation from "../components/CoverAnimation";
import { useState } from "react";
/*
lauch screen ; cover1
second after that cover
cover2 not needed anyway 


animation :: hence using only screen/cover
implement animations here , animations should be changing 
vector images while user has not tapped any button 

screen/cover fully responsive 
implement on tap login and create account logic
*/
const StartScreen = ({ navigation }) => {
  const changeTextUi = "Pay Online Anywhere";
  const [sText, setSText] = useState("A Secure Way to Bank");
  return (
    <View style={styles.cover1}>
      <StatusBar />
      <Text style={styles.aSecureWay}> {sText} </Text>
      <View style={styles.lineParent}>
        <View style={[styles.frameChild, styles.frameLayout]} />
        <View style={[styles.frameItem, styles.frameBorder]} />
        <View style={[styles.frameInner, styles.frameBorder]} />
      </View>
      <View style={styles.animationStyle}>
        <CoverAnimation></CoverAnimation>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("createAccount")}
        style={[styles.createAnAccount, styles.loginLayout]}
        /// button here create an account
      >
        <Text style={[styles.createAnAccount1, styles.login1Typo]}>
          Create an account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={[styles.login, styles.loginLayout]}
        /// button login onpress not implemented yet
      >
        <Text style={[styles.login1, styles.login1Typo, styles.loginbox]}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  frameLayout: {
    height: 1,
    borderTopWidth: 1,
  },
  animationStyle: {
    top: "19.47%",
    left: "4.11%",
  },
  frameBorder: {
    borderColor: Color.lightPrimaryKeyBackground,
    borderStyle: "solid",
  },
  loginLayout: {
    height: hp("5%"),
    width: wp("60%"),
    borderRadius: Border.br_31xl,
    position: "absolute",
    overflow: "hidden",
  },
  login1Typo: {
    textAlign: "center",
    fontFamily: FontFamily.poppinsLight,
    fontWeight: "bold",
  },
  Typo: {
    fontFamily: FontFamily.poppinsBold,
    fontSize: FontSize.size_sm,
    top: "50%",
    marginTop: -10.5,
    textAlign: "left",
    fontWeight: "700",
    left: "50%",
    position: "absolute",
  },
  loginbox: {
    marginTop: 7,
  },
  aSecureWay: {
    marginLeft: -136,
    top: hp("18%"),
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.dMSansBold,
    width: wp("100%"),
    textAlign: "left",
    fontWeight: "700",
    color: Color.lightPrimaryKeyBackground,
    left: "58%",
    position: "absolute",
  },
  frameChild: {
    borderColor: Color.colorGray_300,
    width: wp("19%"),
    zIndex: 0,
    borderStyle: "solid",
    borderTopWidth: 1,
  },
  frameItem: {
    width: wp("19%"),
    zIndex: 1,
    marginLeft: 135,
    height: 1,
    borderTopWidth: 1,
  },
  frameInner: {
    top: 0,
    left: 99,
    width: wp("19%"),
    zIndex: 2,
    height: 1,
    borderTopWidth: 1,
    position: "absolute",
  },
  lineParent: {
    marginLeft: -128,
    top: hp("10%"),
    flexDirection: "row",
    left: "50%",
    position: "absolute",
  },
  illustrationIcon: {
    height: hp("37%"),
    width: "68.06%",
    top: "25.47%",
    right: "20.83%",
    bottom: "37.03%",
    left: "11.11%",
    maxWidth: "100%",
    maxHeight: "100%",
    opacity: 0.8,
    position: "absolute",
    overflow: "hidden",
  },
  createAnAccount1: {
    marginLeft: -67,
    color: Color.lightPrimaryKeyBackground,
    fontSize: FontSize.size_sm,
    top: "50%",
    marginTop: -10.5,
    paddingLeft: 40,
  },
  createAnAccount: {
    top: hp("88%"),
    left: wp("20%"),
    borderWidth: 2,
    borderColor: Color.lightPrimaryKeyBackground,
    borderStyle: "solid",
  },
  login1: {
    marginLeft: -19,
    color: Color.colorDarkslateblue_200,
    paddingLeft: 20,
  },
  login: {
    top: hp("80%"),
    left: wp("20%"),
    backgroundColor: Color.lightPrimaryKeyBackground,
  },
  cover1: {
    backgroundColor: Color.colorDarkslateblue_100,
    flex: 1,
    width: wp("100%"),
    height: hp("100%"),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartScreen;
