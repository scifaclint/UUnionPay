import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

function BottomBarHome({ onPressTransfer }) {
  return (
    <View style={styles.Container}>
      <View
        // individual items
        style={[styles.itemHome, styles.itemAll]}
      >
        <Image
          style={[styles.imageAll, styles.imageHome, styles.vectorSize]}
          contentFit="cover"
          source={require("../assets/iconlybulkhome.png")}
        />
        <Text style={styles.textHome}>Home</Text>
      </View>
      <TouchableOpacity
        // individual items Transfer
        // only interested adding bottom action here
        onPress={onPressTransfer}
        style={[styles.itemTransfer, styles.itemAll]}
      >
        <Image
          style={[styles.imageAll, styles.imageTransfer, styles.vectorSize]}
          contentFit="cover"
          source={require("../assets/iconlybulkticket2.png")}
        />
        <Text style={styles.textAll}>Transfer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // individual items Bills
        style={[styles.itemBills, styles.itemAll]}
      >
        <Image
          style={[styles.imageAll, styles.imageBills, styles.vectorSize]}
          contentFit="cover"
          source={require("../assets/iconlybulkticket1.png")}
        />
        <Text style={styles.textAll}>Bills</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // individual items Cards
        style={[styles.itemCards, styles.itemAll]}
      >
        <Image
          style={[styles.imageAll, styles.imageCards, styles.vectorSize]}
          contentFit="cover"
          source={require("../assets/iconlybulkticket.png")}
        />
        <Text style={styles.textAll}>Cards</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // individual items More
        style={[styles.itemMore, styles.itemAll]}
      >
        <Image
          style={[styles.imageAll, styles.imageMore, styles.vectorSize]}
          contentFit="cover"
          source={require("../assets/iconlybulkcategory.png")}
        />
        <Text style={styles.textAll}>More</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    width: wp("100%"),
    flexDirection: "row",
    bottom: 0,
    position: "absolute",
    height: hp("8%"),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: Color.lightPrimaryKeyBackground,
  },
  itemAll: {
    top: 15,
  },
  textHome: {
    fontFamily: FontFamily.dMSansMedium,
    fontSize: FontSize.size_xs_2,
    color: Color.colorDarkslateblue_300,
    left: 0,
  },
  textAll: {
    fontFamily: FontFamily.dMSansMedium,
    fontSize: FontSize.size_xs_2,
    color: Color.colorDarkslateblue_300,
    top: 2,
  },
  itemHome: {
    left: "8%",
    position: "absolute",
  },
  imageHome: {
    left: "14.81%",
  },
  vectorSize: {
    height: 25,
    width: 20,
  },
  itemTransfer: {
    left: "25%",
    position: "absolute",
  },
  imageTransfer: {
    left: "14.81%",
  },
  itemBills: {
    position: "absolute",
    left: "47%",
  },
  imageBills: {
    left: "14.81%",
  },
  itemCards: {
    left: "65%",
    position: "absolute",
  },
  imageCards: {
    left: "14.81%",
  },
  itemMore: {
    position: "absolute",
    right: "8%",
  },
  imageMore: {
    left: "14.81%",
  },
});
export default BottomBarHome;
