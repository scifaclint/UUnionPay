import { React } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import Modal from "react-native-modal";
import { StatusBar } from "expo-status-bar";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

function Loading({ isVisible }) {
  return (
    <>
      <Modal style={styles.ModalS} isVisible={isVisible}>
        <StatusBar backgroundColor={Color.colorDarkslateblue_200} />

        <View style={styles.anim}>
          <LottieView
            source={require("../data/loading.json")}
            autoPlay
            loop
            style={{
              height: 200,
              width: 200,
            }}
          />
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  ModalS: {
    height: "100%",
    width: "100%",
  },
  anim: {
    position: "relative",
    top: "15%",
    left: "20%",
  },
});
export default Loading;
