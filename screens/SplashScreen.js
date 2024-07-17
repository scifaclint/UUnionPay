import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Border, Color } from "../GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
/*
work done here 
first to launch 

implement some logic 
ones launch , 2s and it switches to cover
*/
const SplashScreen = ({navigation}) => {
  return (
    <>
      <StatusBar />
      <View style={styles.cover0}>
        <Image
          style={styles.cover0Child}
          contentFit="cover"
          source={require("../assets/ellipse-1.png")}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cover0Child: {
    position: "absolute",
    marginTop: -69,
    marginLeft: -58,
    top: "50%",
    left: "50%",
    width: "30%",
    height: "15%",
  },
  cover0: {
    backgroundColor: Color.colorDarkslateblue_100,
    flex: 1,
    width: "100%",
    height: hp("100%"),
    overflow: "hidden",
  },
});

export default SplashScreen;
