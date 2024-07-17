import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { color } from "react-native-elements/dist/helpers";
function AppBottom({
  styled,
  text,
  onPress,
}) {
  return (
    <View style={[styles.container, styled]}>
      <TouchableOpacity
        // scan logic would be implemented
        style={styles.bottomStyle}
        onPress={onPress}
      >
        <Text style={styles.bottomText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomStyle: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorDarkslateblue_200,
    width: wp("50%"),
    position: "absolute",
    height: 45,
  },
  bottomText: {
    color: Color.lightPrimaryKeyBackground,
    textAlign: "left",
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    fontSize: FontSize.size_xl,
    position: "absolute",
    left: wp("15%"),
    top: 5,
  },
});
export default AppBottom;
