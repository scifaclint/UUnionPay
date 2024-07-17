import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import Modal from "react-native-modal";

function UserDashboard({ isVisible, onclose, animation, logout }) {
  return (
    <>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onclose}
        animationType={animation}
        transparent={true}
        style={{
          margin: 0,
          height: hp("100%"),
          width: wp("70%"),
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: "#212a39",
        }}
      >
        <View
          /// top view with close
          style={{
            top: 0,
            position: "absolute",
            height: 80,
            backgroundColor: "#222e3e",
            width: "100%",
            borderRadius: 6,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: "#212a39",
              borderRadius: 6,
              left: "80%",
              top: "20%",
              position: "absolute",
            }}
          >
            <TouchableOpacity onPress={onclose}>
              <EvilIcons
                style={{
                  top: 5,
                  left: 5,
                }}
                name="close"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: Color.lightPrimaryKeyBackground,
              position: "absolute",
              top: "20%",
              left: "10%",
              fontFamily: FontFamily.interExtraBold,
              fontSize: 25,
            }}
          >
            UnionPay
          </Text>
        </View>
        <StatusBar backgroundColor={Color.colorDarkslateblue_200} />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            position: "absolute",
            top: "20%",
            left: "4%",
          }}
        >
          <MaterialIcons name="manage-accounts" size={24} color="#7b8797" />
          <Text
            style={{
              color: "#7b8797",
              left: "25%",
              top: 2,
            }}
          >
            My Account
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: "15%",
            left: "4%",
          }}
        >
          <Feather name="home" size={20} color="white" />
          <Text
            style={{
              color: "white",
              left: "60%",
              top: 2,
            }}
          >
            Home
          </Text>
        </View>
        <TouchableOpacity
          onPress={logout}
          style={{
            flexDirection: "row",
            position: "absolute",
            top: "25%",
            left: "4%",
          }}
        >
          <MaterialIcons name="logout" size={22} color="#7b8797" />
          <Text
            style={{
              color: "#7b8797",
              left: "50%",
              top: 2,
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({});
export default UserDashboard;
