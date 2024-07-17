import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  BackHandler,
  Alert,
  ScrollView
} from "react-native";
import RecentNotification from "../components/RecentNotification";
import { API_END } from "../utils/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "firebase/auth";
import Constants from "expo-constants";
import BottomBarHome from "../modals/BottomBarHome";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import UserDashboard from "../modals/UserDashboard";
import Alerts from "../effects/Alerts";
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { err } from "react-native-svg";
const Status_BarHeight =
  Platform.OS === "ios" ? constants.statusBarHeight : StatusBar.currentHeight;
function DashBoard({ navigation, route }) {
  const auth = getAuth();
  const formatter = new Intl.NumberFormat("en-US");
  const { UserEMail, notifice } = route.params;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isvisible, setVisible] = useState(false);
  const [response, setResponse] = useState(null);
  const [userBalance, setUserBalance] = useState("0.00");
  const [userName, setUserName] = useState("User");
  const [currentUserMail, setCurrentUserMail] = useState("");
  const [transactions, settransactions] = useState();
  /// fetch data

  const sendData = async () => {
    try {
      const response = await fetch(`${API_END}/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: UserEMail.trim() }),
      });
      const data = await response.json();
      console.log(data);
      setUserBalance(parseFloat(data.balance).toFixed(2));
      setUserName(data.firstname);
      setCurrentUserMail(data.email);
      settransactions(data.transactions);
    } catch (error) {
      console.error("Error sending data:", error);
      setResponse({ error: "Failed to send data" });
    }
  };
  /// handle server stuffs
  useEffect(() => {
    sendData();
  }, []);
  // ***************************************************************************
  useEffect(() => {}, []);
  // *****************
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Prevent default behavior of going back to the previous screen
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  /*
  animation functions
  */
  // handle modal here

  const handleUserDashboard = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };
  const handleLogout = () => {
    /*
    implement logout function here 
    alert or display a message for user to confirm logout
    on yes : close both modals and navigate to login screen 
    on no , just close alert 
    n
    */
    setVisible(true);
  };
  const logout = async () => {
    setVisible(false);
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userData");
      navigation.replace("Start");
    } catch (err) {
      console.log(err);
    }
  };
  const handleTransferButton = () => {
    // handle transfer button pressed here
    navigation.navigate("Transfer", {
      senderEmail: currentUserMail,
      senderBalance: userBalance,
      url: API_END,
      transactions: transactions,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.colorDarkslateblue_200} />
      <View
        // bottom bar here
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        <BottomBarHome onPressTransfer={handleTransferButton} />
      </View>
      <View
        // upper bar
        // notification and account
        style={{
          width: wp("100%"),
          height: hp("10%"),
          top: hp("0%"),
          justifyContent: "center",
          flexDirection: "row",
          paddingTop: 15,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity
          // onpress action not done yet
          style={{
            height: 35,
            width: 40,
            backgroundColor: "#ECEEF2",
            justifyContent: "center",
            left: wp("40%"),
          }}
        >
          <Ionicons
            style={{
              left: 7,
            }}
            name="notifications"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity
          // onpress action not done yet
          // menu bar here
          onPress={handleUserDashboard}
          style={{
            height: 35,
            width: 40,
            backgroundColor: "#ECEEF2",
            justifyContent: "center",
            left: -wp("44%"),
          }}
        >
          <Entypo
            style={{
              left: 7,
            }}
            name="menu"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View
        // would implement soon
        style={{
          top: hp("8%"),
          height: hp("15%"),
          width: wp("100%"),
          backgroundColor: "#ECEEF6",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            top: 0,
            position: "absolute",
            left: wp("35%"),
            fontFamily: FontFamily.interExtraBold,
            fontSize: FontSize.size_xl,
            color: Color.colorDarkslateblue_200,
          }}
        >
          DashBoard
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: FontFamily.dMSansMedium,
              color: Color.colorDarkslateblue_200,
              fontSize: FontSize.size_base,
              paddingRight: 10,
            }}
          >
            Welcome back,
          </Text>
          <Text
            style={{
              fontFamily: FontFamily.interExtraBold,
              fontSize: 15,
              color: Color.colorDarkslateblue_500,
            }}
          >
            {" "}
            [{userName}]!
          </Text>
        </View>
      </View>
      <View
        style={{
          top: hp("40%"),
          position: "absolute",
        }}
      >
        <View
          // vector and account balance
          style={{
            width: wp("90%"),
            backgroundColor: "#FFFFFF",
            height: hp("15%"),
            left: "5%",
            right: "5%",
            borderRadius: 10,
            position: "relative",
          }}
        >
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: "#ECEEF2",
              justifyContent: "center",
              top: 40,
              left: "80%",
              borderRadius: Border.br_3xs,
            }}
          >
            <Ionicons
              style={{
                left: 10,
              }}
              name="wallet"
              size={25}
              color="black"
            />
          </View>
          <Text
            style={{
              left: 24,
              fontFamily: FontFamily.interExtraBold,
              fontSize: 18,
              color: Color.colorDarkslateblue_200,
            }}
          >
            ₵{formatter.format(userBalance)}
          </Text>
          <Text
            style={{
              top: 3,
              left: 24,
              fontFamily: FontFamily.interMedium,
              color: Color.colorSilver,
              fontWeight: "bold",
            }}
          >
            Available Balance
          </Text>
        </View>
      </View>
      <UserDashboard
        isVisible={modalVisible}
        onclose={handleModalClose}
        animation={"fade"}
        logout={handleLogout}
      ></UserDashboard>
      <Alerts
        showAlert={isvisible}
        title={"Confirm LogOut"}
        message={"Are you sure you want to log out?"}
        hideVerifyAlert={logout}
        typeOfAlert={"failed"}
        cancelHide={() => setVisible(false)}
        showCancel={true}
      />
      <Text
        style={{
          top: "60%",
          position: "absolute",
          left: "5%",
          color: Color.colorDarkslateblue_200,
          fontFamily: FontFamily.interExtraBold,
        }}
      >
        Recent Transactions
      </Text>

      <View
        style={{
          height: "30%",
          width: "100%",
          top: "65%",
          left: "4%",
          position: "absolute",
        }}
      >
        <RecentNotification transactions={transactions} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    width: wp("100%"),
    justifyContent: "flex-start",
    backgroundColor: "#ECEEF2",
    height: hp("100%"),
  },
  iconLayout: {
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    position: "absolute",
  },

  bottomLayout: {
    height: 98,
    width: wp("100%"),
    position: "absolute",
  },
  groupChild18Layout: {
    width: 139,
    height: 6,
    position: "absolute",
  },
  parentLayout: {
    height: 49,
    position: "absolute",
  },
  iconlybulkhomePosition: {
    left: "12.81%",
    width: "76.56%",
  },
  moreGroupPosition: {
    height: 46,
    top: 1,
    position: "absolute",
  },
  cardsTypo: {
    color: Color.colorDimgray,
    fontFamily: FontFamily.dMSansMedium,
    fontSize: FontSize.size_xs_2,
    lineHeight: 20,
    textAlign: "left",
    fontWeight: "500",
    position: "absolute",
  },
  iconlybulkticketPosition: {
    bottom: "47.31%",
    height: "52.69%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    top: "0%",
    position: "absolute",
  },

  groupChild: {
    borderColor: Color.colorWhitesmoke_300,
    borderWidth: 1,
    borderStyle: "solid",
    left: 0,
    top: 0,
    height: 64,
    width: 348,
    borderRadius: Border.br_3xs,
    position: "absolute",
    backgroundColor: Color.lightPrimaryKeyBackground,
  },

  n400WasSent: {
    fontFamily: FontFamily.dMSansBold,
    color: Color.colorDarkslateblue_300,
    fontWeight: "700",
    lineHeight: 20,
    fontSize: FontSize.size_2xs,
    left: 0,
    top: 0,
    textAlign: "left",
    position: "absolute",
  },

  iconlybulkdownload: {
    top: "39.06%",
    right: "88.79%",
    bottom: "40.63%",
    left: "7.47%",
  },

  rectangleGroup: {
    marginTop: 7,
  },
  groupParent: {
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    top: hp("5%"),
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_2xs,
    left: wp("3%"),
  },

  ellipseParent: {
    marginLeft: -wp("35%"),
    top: hp("17%"),
    shadowColor: "rgba(0, 0, 0, 0.03)",
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 18,
    backgroundColor: "rgba(49, 52, 95, 0.8)",
    width: 266,
    height: 126,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    left: "50%",
    overflow: "hidden",
    position: "absolute",
  },

  transfer: {
    marginLeft: -28,
    lineHeight: 20,
    textAlign: "left",
    color: Color.colorDarkslateblue_400,
    position: "absolute",
    fontSize: FontSize.size_sm,
  },

  more: {
    marginLeft: -17.5,
    top: 67,
    fontFamily: FontFamily.poppinsRegular,
    left: "50%",
  },
  notificationWrapper: {
    padding: Padding.p_3xs,
    left: 0,
  },
  notificationIcon1: {
    zIndex: 0,
    display: "none",
  },
  notificationMessageChild: {
    top: 9,
    left: 20,
    width: 6,
    zIndex: 1,
    height: 6,
    position: "absolute",
  },
  notificationMessage: {
    left: 1,
    padding: 10,
    height: 39,
    width: 36,
  },
  frameGroup: {
    right: wp("18%"),
    top: hp("8%"),
    position: "absolute",
  },
  bottomBarChild: {
    left: 0,
    top: 0,
  },
  groupChild18: {
    borderRadius: 9,
    backgroundColor: Color.colorDarkslateblue_300,
    left: 0,
    top: 0,
  },
  bottomBarInner: {
    top: 82,
    left: 116,
    display: "none",
  },
  home1: {
    top: 29,
    fontFamily: FontFamily.dMSansMedium,
    fontSize: FontSize.size_xs_2,
    color: Color.colorDarkslateblue_300,
    lineHeight: 20,
    left: 0,
    textAlign: "left",
    fontWeight: "500",
    position: "absolute",
  },
  iconlybulkhome: {
    height: "50.52%",
    right: "10.63%",
    bottom: "49.48%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    position: "absolute",
    top: "0%",
    left: "12.81%",
    width: "76.56%",
  },
  homeParent: {
    width: 32,
    left: 0,
    top: 0,
  },
  cards: {
    top: 27,
    left: 0,
  },
  iconlybulkticket: {
    right: "10.62%",
    left: "12.81%",
    width: "76.56%",
  },
  cardsParent: {
    left: 225,
    width: 32,
  },
  bills: {
    marginLeft: -10.75,
    top: 28,
    left: "50%",
  },
  iconlybulkticket1: {
    height: "51.58%",
    bottom: "48.42%",
    left: "0%",
    right: "0%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    top: "0%",
    width: "100%",
  },
  billsParent: {
    marginLeft: -1.25,
    width: 24,
    height: 48,
    top: 0,
    left: "50%",
    position: "absolute",
  },
  iconlybulkcategory: {
    width: "87.5%",
    right: "12.5%",
    left: "0%",
  },
  moreGroup: {
    left: 297,
    width: 28,
  },
  iconlybulkticket2: {
    width: "50%",
    right: "22.86%",
    left: "27.14%",
  },
  iconlybulkticketParent: {
    height: "95.88%",
    width: "15.1%",
    top: "2.06%",
    right: "62.93%",
    bottom: "2.06%",
    left: "21.97%",
    position: "absolute",
  },
  groupParent1: {
    top: 25,
    left: 26,
    width: 325,
  },
  bottomBar: {
    bottom: 0,
  },
});
export default DashBoard;
