import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
function AnimationFaceId({ style }) {
  /*
    animation here 
    */
  return (
    <View style={[styles.mainContainer, style]}>
      <LottieView
        source={require("../data/faceScan.json")}
        autoPlay
        loop
        style={styles.lottie}
      ></LottieView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  lottie: {
    width: wp("50%"),
    height: wp("50%"),
  },
});
export default AnimationFaceId;
