import React from "react";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import AwesomeAlert from "react-native-awesome-alerts";

function Alerts({ title, message, showAlert, hideVerifyAlert, typeOfAlert,showCancel,cancelHide}) {

  return (
    <View style={styles.Container}>
      <AwesomeAlert
        show={showAlert}
        customView={
          typeOfAlert === "success" ? (
            <View>
              <LottieView
                source={require("../data/success_simple.json")}
                autoPlay
                loop={false}
                style={{
                  height: 100,
                  width: 100,
                }}
              />
            </View>
          ) : typeOfAlert === "failed" ? (
            <View>
              <LottieView
                source={require("../data/failed_simple.json")}
                autoPlay
                loop={false}
                style={{
                  height: 100,
                  width: 100,
                }}
              />
            </View>
          ) : null
        }
        showProgress={false}
        title={title}
        titleStyle={styles.title}
        message={message}
        messageStyle={styles.message}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        confirmButtonColor={Color.colorDarkslateblue_200}
        confirmButtonTextStyle={styles.confirmButtonTextStyle}
        confirmText="Okay"
        cancelText="Close"
        onCancelPressed={cancelHide}
        showCancelButton={showCancel}
        onConfirmPressed={hideVerifyAlert}
        showConfirmButton={true}
        cancelButtonColor="green"
        
      ></AwesomeAlert>
    </View>
  );
}
const styles = StyleSheet.create({
  confirmButtonTextStyle: {
    color: Color.lightPrimaryKeyBackground,
  },
  title: {
    fontFamily: FontFamily.dMSansBold,
    color: Color.colorDarkslateblue_200,
  },
  message: {
    fontFamily: FontFamily.interRegular,
    color: Color.colorDarkslateblue_200,
  },
});
export default Alerts;
