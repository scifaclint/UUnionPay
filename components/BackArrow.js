import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
function BackArrow({ size = 24, style, color = "black", onPress, ...others }) {
  return (
    <View style={styles.maincontainer}>
      <TouchableOpacity onPress={onPress}>
        <AntDesign name="arrowleft" size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  maincontainer: {},
});
export default BackArrow;
