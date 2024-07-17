import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const Cover2 = () => {
  return (
    <View style={styles.cover2}>
      <View style={styles.lineParent}>
        <View style={[styles.frameChild, styles.frameLayout]} />
        <View style={[styles.frameItem, styles.frameBorder]} />
        <View style={[styles.frameInner, styles.frameBorder]} />
      </View>
      <View
        style={[styles.createAnAccount, styles.loginLayout]}
        // create account button here (not implemented yet)
      >
        <Text style={[styles.createAnAccount1, styles.login1Position]}>
          Create an account
        </Text>
      </View>
      <View
        style={[styles.login, styles.loginLayout]}
        //login button here (not implemented yet)
      >
        <Text style={[styles.login1, styles.login1Position]}>Login</Text>
      </View>
      <Text style={[styles.payOnlineAnywhere, styles.login1Position]}>
        Pay Online Anywhere
      </Text>
      <Image
        style={styles.investmentProfitGrowth}
        contentFit="cover"
        source={require("../assets/investment-profit-growth.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  frameLayout: {
    height: 1,
    borderTopWidth: 1,
  },
  frameBorder: {
    borderColor: Color.lightPrimaryKeyBackground,
    borderStyle: "solid",
  },
  loginLayout: {
    height: 51,
    width: 296,
    borderRadius: Border.br_31xl,
    position: "absolute",
    overflow: "hidden",
  },
  login1Position: {
    textAlign: "left",
    fontWeight: "700",
    top: "50%",
    left: "50%",
    position: "absolute",
  },
  frameChild: {
    borderColor: Color.colorGray_300,
    width: 64,
    zIndex: 0,
    borderStyle: "solid",
    borderTopWidth: 1,
  },
  frameItem: {
    width: 63,
    zIndex: 1,
    marginLeft: 130,
    height: 1,
    borderTopWidth: 1,
  },
  frameInner: {
    top: 0,
    left: 95,
    width: 65,
    zIndex: 2,
    height: 1,
    borderTopWidth: 1,
    position: "absolute",
    borderColor: Color.lightPrimaryKeyBackground,
  },
  lineParent: {
    marginLeft: -128,
    top: 78,
    flexDirection: "row",
    left: "50%",
    position: "absolute",
  },
  createAnAccount1: {
    marginLeft: -67,
    color: Color.lightPrimaryKeyBackground,
    textAlign: "left",
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    fontSize: FontSize.size_sm,
    marginTop: -10.5,
  },
  createAnAccount: {
    top: 720,
    left: 60,
    borderWidth: 2,
    borderColor: Color.lightPrimaryKeyBackground,
    borderStyle: "solid",
  },
  login1: {
    marginLeft: -19,
    color: Color.colorDarkslateblue_200,
    fontFamily: FontFamily.poppinsBold,
    fontSize: FontSize.size_sm,
    marginTop: -10.5,
    textAlign: "left",
    fontWeight: "700",
  },
  login: {
    top: 650,
    left: 60,
    backgroundColor: Color.lightPrimaryKeyBackground,
  },
  payOnlineAnywhere: {
    marginTop: -205,
    marginLeft: -132,
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.dMSansBold,
    width: 249,
    color: Color.lightPrimaryKeyBackground,
    textAlign: "left",
    fontWeight: "700",
  },
  investmentProfitGrowth: {
    marginTop: -152,
    marginLeft: -112,
    width: 210,
    height: 235,
    top: "50%",
    left: "50%",
    position: "absolute",
  },
  cover2: {
    borderRadius: Border.br_4xs,
    backgroundColor: Color.colorDarkslateblue_100,
    flex: 1,
    width: "100%",
    height: 640,
    overflow: "hidden",
  },
});

export default Cover2;
