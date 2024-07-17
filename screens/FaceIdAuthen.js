import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import FaceEnrollCamera from "../other_screens/FaceEnrollCamera";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AnimationFaceId from "../components/AnimationFaceId";
import { StatusBar } from "expo-status-bar";

const FaceIdAuthen = ({ navigation, route }) => {
  const { email } = route.params;
  return (
    <View style={styles.faceIdAuthen}>
      <StatusBar backgroundColor={Color.colorDarkslateblue_200} />
      <Text
        style={[styles.completeEventBy, styles.scanMyFaceTypo]}
      >{`Complete event  by scanning your face`}</Text>
      <Image
        style={styles.faceIdAuthenChild}
        contentFit="cover"
        source={require("../assets/ellipse-2.png")}
      />
      <TouchableOpacity
        // scan logic would be implemented
        onPress={() =>
          navigation.navigate("CameraScan", {
            email: email,
          })
        }
        style={styles.faceIdAuthenItem}
      >
        <Text style={styles.scanFaceText}>Scan</Text>
      </TouchableOpacity>
      <AnimationFaceId style={styles.faceIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  scanMyFaceTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  scanFaceText: {
    color: Color.lightPrimaryKeyBackground,
    textAlign: "left",
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    fontSize: FontSize.size_xl,
    position: "absolute",
    left: wp("20%"),
    top: 5,
  },
  completeEventBy: {
    marginLeft: -wp("45%"),
    top: hp("21%"),
    color: Color.colorDarkslateblue_200,
    width: wp("100%"),
    height: wp("100%"),
    left: "50%",
  },
  faceIdAuthenChild: {
    top: hp("38%"),
    left: wp("25%"),
    width: 204,
    height: 190,
    position: "absolute",
  },
  faceIdAuthenItem: {
    top: hp("75%"),
    left: wp("25%"),
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorDarkslateblue_200,
    width: wp("50%"),
    height: 45,
    position: "absolute",
  },
  scanMyFace: {
    top: 509,
    left: 116,
    color: Color.lightPrimaryKeyBackground,
  },
  faceIcon: {
    marginTop: -100,
    marginLeft: -90,
    top: hp("50%"),
    left: "50%",
    position: "absolute",
  },
  faceIdAuthen: {
    backgroundColor: Color.lightPrimaryKeyBackground,
    flex: 1,
    width: wp("100%"),
    height: hp("100%"),
    overflow: "hidden",
  },
});

export default FaceIdAuthen;
