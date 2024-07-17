import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

function CoverAnimation(style) {
  return (
    <View style={[styles.mainContainer, style]}>
      <LottieView
        source={require("../data/screen_dashBoard1.json")}
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
    width: wp("80%"),
    height: hp("60%"),
  },
});

export default CoverAnimation;
