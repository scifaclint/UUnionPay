import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../components/BackArrow";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Alerts from "../effects/Alerts";
import { API_END } from "../utils/Config";
import BackgroundFaceScan from "../modals/BackgroundFaceScan";
import { date, number } from "yup";

function ReviewPayment({ type, navigation, route }) {
  const {
    currentBalance,
    receiverNam,
    tax,
    receiverEmail,
    amount_s,
    senderEmail,
    transactions,
  } = route.params;
  const getid = () => {
    if (transactions == []) {
      return 1;
    } else {
      return transactions[transactions.length - 1].id + 1;
    }
  };



  const int_tax = parseFloat(tax);
  const int_currBal = parseFloat(currentBalance);
  const int_amount_s = parseFloat(amount_s).toFixed(2);
  const balanceRemaining =
    Number(int_currBal) - (Number(int_amount_s) + Number(int_tax));

  const [receiverName, setReceivername] = useState("");
  const [faceScanVisible, setFaceScanVisible] = useState(false);
  const [alertBox, setAlertBox] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const successState = "true";
  const formatter = new Intl.NumberFormat("en-US");

  //

  // sleep here
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  // update balance
  const updateBothUsersBalance = (sender, receiver) => {
    // logic here
  };
  // scan
  const startScan = async () => {
    // l
    setFaceScanVisible(true);

    try {
      currD = new Date();
      await fetch(`${API_END}/api/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: senderEmail,
          receiver: receiverEmail,
          addToReceiver: Number(amount_s),
          subsctractSender: Number(amount_s) + Number(tax),
          transactions: {
            amount: Number(amount_s),
            date: new Date().toLocaleDateString(),
          },
        }),
      });
      await sleep(5000);
    } catch (err) {
      console.log(err);
    }

    //

    setFaceScanVisible(false); // close camera on response
    // by updating success to false/true
    // if model verifies with true
    // call updateBothUserBalance and update server
    // base on response render alert success or failed
    // ******************************************************

    //***************************************************** */
    if (successState == "true") {
      alertSuccess();
    } else {
      alertFailed();
    }
  };
  // success
  const alertSuccess = () => {
    setTypeAlert("success");
    setTitle("Payment Complete !");
    setMessage("Your payment has been completed.");
    setAlertBox(true);

    // logic to update both users balance on server
  };

  // failed
  const alertFailed = () => {
    setTitle(" Payment Declined!");
    setTypeAlert("failed");
    setMessage("There was a problem verifying your face. Please try again.");
    setAlertBox(true);
  };
  const hideAlert = () => {
    // implement either to hide and nav to dashboard
    // assuming of it being success for now
    setAlertBox(false);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "DashBoard",
          params: { UserEMail: senderEmail },
        },
      ],
    });
  };

  const handlePay = () => {
    /*
    implement firebase logic here
    to authorise user ones everything set 
    then continue with face scan 
    */
    if (!faceScanVisible) {
      startScan();
    }
  };

  return (
    <>
      <SafeAreaView>
        <StatusBar
          style="auto"
          backgroundColor={Color.colorDarkslateblue_200}
        />
        <View style={styles.container}>
          <View style={styles.reviewPayment}>
            <View style={[styles.arrowAndText, styles.arrowOnly]}></View>
            <Text style={[styles.textStyle, styles.arrowAndText]}>
              Review and Pay{" "}
            </Text>
          </View>
          <View
            style={{
              height: hp("80%"),
            }}
          >
            <View style={styles.confirmSendPayment}>
              <Text style={styles.transferstyle}>confirm Transfer Details</Text>
              <Text style={styles.sendingtextstyle}>
                Sending money to {receiverEmail}
              </Text>
            </View>
            <View style={styles.transferdetails}>
              <Text style={styles.transdettext}> Transfer Details</Text>
              <View style={styles.inline} />
            </View>
            <View
              style={{
                flexDirection: "row",
                top: "40%",
                left: "5%",
              }}
              // container sending payment details
              // get data and render here
              // recipient
            >
              <Text
                style={{
                  width: 100,
                }}
              >
                Recipient Name
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  paddingLeft: 90,
                }}
              >
                {receiverNam}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                top: "40%",
                left: "5%",
              }}
              // container sending payment details
              // get data and render here
              // amount
            >
              <Text
                style={{
                  width: 100,
                }}
              >
                {" "}
                Amount
              </Text>
              <Text
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  paddingLeft: 90,
                }}
              >
                ₵{int_amount_s}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                top: "40%",
                left: "5%",
              }}
              // container sending payment details
              // get data and render here
              // tax
            >
              <Text
                style={{
                  width: 100,
                }}
              >
                {" "}
                Tax
              </Text>
              <Text
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  paddingLeft: 90,
                }}
              >
                ₵{int_tax}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                top: "40%",
                left: "5%",
              }}
              // container sending payment details
              // get data and render here
              // total
            >
              <Text
                style={{
                  width: 100,
                  fontWeight: "bold",
                  top: 30,
                }}
              >
                {" "}
                Total
              </Text>
              <Text
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  paddingLeft: 90,
                  fontWeight: "bold",
                  top: 30,
                }}
              >
                ₵{Number(amount_s) + Number(int_tax)}
              </Text>
            </View>
            <View
              // balance amount remaining if proceeded
              style={styles.balanceContainer}
            >
              <Text style={styles.containtextbalance}>
                Current Balance ₵{formatter.format(currentBalance)}
              </Text>
            </View>
            <View
              // amount remaining if proceeded
              style={styles.remainbalance}
            >
              <Text style={styles.textstyleremainconfirm}>
                ₵{formatter.format(parseFloat(balanceRemaining).toFixed(2))}{" "}
                left if you complete this payment.
              </Text>
            </View>
            <View
              style={styles.paybutton}
              // button pay
            >
              <TouchableOpacity onPress={handlePay} style={styles.bottomStyle}>
                <Text style={styles.bottomText}>Pay</Text>
              </TouchableOpacity>
            </View>
            <View
              // cancel button
              style={styles.cancelbutton}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack("Transfer")}
                style={styles.stylecancelellipse}
              >
                <Text style={styles.canceltext}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
          <BackgroundFaceScan
            isVisible={faceScanVisible}
            // would implement proper logic later
            onClose={() => setFaceScanVisible(false)}
            type={"payment"}
            email={senderEmail}
          />
          <Alerts
            showAlert={alertBox}
            title={title}
            message={message}
            hideVerifyAlert={hideAlert}
            typeOfAlert={typeAlert}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    width: wp("100%"),
    justifyContent: "flex-start",
  },
  arrowAndText: {
    top: 20,
  },
  arrowOnly: {
    left: "3%",
  },
  reviewPayment: {
    top: 0,
    height: 70,
    position: "absolute",
    backgroundColor: Color.colorDarkslateblue_600,
    width: wp("100%"),
  },
  containtextbalance: {
    top: 15,
    left: 5,
    color: Color.colorDarkslateblue_400,
    fontWeight: "bold",
  },
  textstyleremainconfirm: {
    top: 8,
    color: Color.colorDarkslateblue_400,
    left: 5,
    fontWeight: "heavy",
    fontFamily: FontFamily.dMSansBold,
  },
  balanceContainer: {
    top: "35%",
    backgroundColor: "#F2EFEF",
    height: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "90%",
    left: "5%",
    position: "relative",
  },
  remainbalance: {
    top: "35%",
    height: 45,
    width: "90%",
    left: "5%",
    backgroundColor: "#E8E8E8",
    position: "relative",
  },
  textStyle: {
    marginLeft: -99.5,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
    textAlign: "left",
    color: Color.lightPrimaryKeyBackground,
    left: "55%",
    position: "absolute",
  },
  confirmSendPayment: {
    top: "8%",
    backgroundColor: "#F2EFEF",
    height: 80,
  },
  transferstyle: {
    color: Color.colorDarkslateblue_400,
    textAlign: "center",
    fontSize: 15,
    top: 8,
    fontFamily: FontFamily.dMSansMedium,
  },
  sendingtextstyle: {
    top: 13,
    textAlign: "center",
    color: Color.colorDarkslateblue_400,
    fontWeight: "bold",
  },
  transferdetails: {
    top: "17%",
    left: "7%",
  },
  transdettext: {
    color: Color.colorDarkslateblue_400,
    fontSize: 15,
    fontWeight: "bold",
  },
  inline: {
    backgroundColor: "#F2EFEF",
    width: "100%",
    height: 2,
    top: 3,
  },

  bottomStyle: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorDarkslateblue_200,
    width: wp("25%"),
    position: "absolute",
    height: 43,
    position: "absolute",
  },
  bottomText: {
    color: Color.lightPrimaryKeyBackground,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    fontSize: FontSize.size_xl,
    position: "absolute",
    left: wp("7%"),
    top: 5,
  },
  paybutton: {
    top: "48%",
    left: "60%",
    position: "relative",
  },
  cancelbutton: {
    top: "48%",
    left: "20%",
    position: "relative",
  },
  stylecancelellipse: {
    borderRadius: Border.br_xl,
    width: wp("25%"),
    position: "absolute",
    height: 43,
    borderColor: "black",
    borderWidth: 2,
  },
  canceltext: {
    color: "black",
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    fontSize: FontSize.size_xl,
    position: "absolute",
    left: wp("4%"),
    top: 5,
  },
});

export default ReviewPayment;
