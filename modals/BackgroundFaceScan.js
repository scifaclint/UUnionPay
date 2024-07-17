import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import Modal from "react-native-modal";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BackgroundCamera from "../other_screens/BackgroundCamera";
import AppBottom from "../components/AppBottom";
import { tuple } from "yup";

function BackgroundFaceScan({ isVisible , onClose, type,email }) {
  // implement some logic to close cameraview ones not needed
  const Camtype = type
  // handle picture capturing 

  return (
    <>
      <StatusBar style="auto" backgroundColor={Color.colorDarkslateblue_200} />
      <Modal
        style={{
          backgroundColor: Color.lightPrimaryKeyBackground,
          width: "100%",
          margin: 0,
          justifyContent: "flex-end",
        }}
        isVisible={isVisible}
      >
        <View
          style={{
            height: hp("100%"),
            padding: 20,
            backgroundColor: "#000000",
          }}
          // main container content
        >
          <View
            //render camera here but hidden
            style={{
              flex: 1,
              position: "absolute",
              top: hp("25%"),
              left: "20%",
            }}
          >
            {
              //back camera here
              /*
              😂😂😂🤣🤣🤣🤣🤣
              */
            }
          </View>
          <View
            style={{
              position: "absolute",
              left: wp("200%"),
            }}
          >
            <BackgroundCamera type={type} 
            email={email}
            />
          </View>
          <View
            // animation
            style={{
              flex: 1,
              top: hp("18%"),
              position: "absolute",
              margin: 0,
              marginLeft: -32,
            }}
          >
            <LottieView
              source={require("../data/spiningcircles_placeFaceid.json")}
              autoPlay
              loop
              style={styles.lottie}
            ></LottieView>
          </View>
          {
            // next animation code here
          }
          <View
            // animation
            style={{
              flex: 1,
              top: hp("39%"),
              position: "absolute",
              margin: 0,
              marginLeft: wp("30%"),
            }}
          >
            <LottieView
              source={require("../data/animatedFace.json")}
              autoPlay
              loop
              style={styles.lottie2}
            ></LottieView>
          </View>
          <View
            // upper text here
            style={{
              top: hp("12%"),
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: FontFamily.interExtraBold,
                fontSize: FontSize.size_xl,
              }}
            >
              Use FACE ID to authorize
            </Text>
          </View>
          <View
            // upper text here
            style={{
              top: hp("17%"),
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: FontFamily.dMSansMedium,
                fontSize: FontSize.size_base,
              }}
            >
              Please put your phone in front of your face
            </Text>
          </View>
          <View
            style={{
              top: hp("80%"),
              left: wp("25%"),
            }}
          >
            <AppBottom text={"Cancel"} onPress={onClose} />
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  modal: {},
  container: {},
  lottie: {
    width: 450,
    height: 490,
  },
  lottie2: {
    width: 150,
    height: 150,
  },
});

export default BackgroundFaceScan;
