import { React, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import AppBottom from "../components/AppBottom";
import Modal from "react-native-modal";
import { StatusBar } from "expo-status-bar";

function Success({ style, isVisible, onClose, messagebox }) {
  const [hasPlayed, setHasPlayed] = useState(false);
  return (
    <>
      <StatusBar backgroundColor={Color.colorDarkslateblue_200} />
      <Modal
        animationIn={"fadeIn"}
        isVisible={isVisible}
        style={{
          margin: 0,
          backgroundColor: Color.lightPrimaryKeyBackground,
          height: hp("100%"),
        }}
      >
        <View style={[styles.mainContainer, style]}>
          <Text
            style={{
              color: Color.colorDarkslateblue_200,
              top: -hp("38%"),
              textAlign: "center",
              fontSize: FontSize.size_xl,
              fontFamily: FontFamily.dMSansBold,
            }}
          >
            {messagebox}
          </Text>
          <View
            style={{
              top: -hp("30%"),
            }}
          >
            <LottieView
              source={require("../data/Verified.json")}
              autoPlay={!hasPlayed} // Only autoPlay if animation hasn't played
              progress={hasPlayed ? 1 : 0}
              loop={false}
              style={styles.lottie}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: Color.colorDarkslateblue_200,
                height: 50,
                width: 150,
                position: "absolute",
                top: -hp("30%"),
                left: -wp("20%"),
                borderRadius: Border.br_xl,
              }}
            >
              <Text
                style={{
                  color: Color.lightPrimaryKeyBackground,
                  top: 10,
                  textAlign: "center",
                  fontSize: FontSize.size_xl,
                  fontFamily: FontFamily.interMedium,
                }}
              >
                Okay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Color.lightPrimaryKeyBackground,
    alignItems: "center",
    justifyContent: "center",
    width: wp("100%"),
    height: hp("100%"),
    top: hp("30%"),
    flex: 1,
  },
  lottie: {
    width: 300,
    height: 300,
  },
});

export default Success;
