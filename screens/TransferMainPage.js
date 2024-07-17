import * as React from "react";
import { Image } from "expo-image";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Loading from "../modals/Loading";
import { debounce } from "lodash";
import BackArrow from "../components/BackArrow";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";
import AppBottom from "../components/AppBottom";
import Alerts from "../effects/Alerts";
import { API_END } from "../utils/Config";


const TransferMainPage = ({ navigation, route }) => {
  const { senderEmail, senderBalance, url, transactions } = route.params;
  const [getDestination, setDestination] = React.useState();
  const [amount, setAmount] = React.useState();
  const [loading, setloading] = React.useState(false);
  const [receiver, setReceiver] = React.useState();
  const [debouncedEmail, setDebouncedEmail] = React.useState();
  const ball = senderBalance;
  const debouncedSetEmail = React.useCallback(
    debounce((text) => {
      setDebouncedEmail(text);
    }, 1000),
    []
  );
  // alerts
  const [title, setTitle] = React.useState("");
  const [message, setmessage] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);
  const [typeOfAlert, setTypeAlert] = React.useState("");

  const hideAlert = () => {
    setShowAlert(false);
  };
  // check receiver email
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const verifyEmail = async () => {
    if (!debouncedEmail || !pattern.test(debouncedEmail)) {
      return;
    }

    try {
      const response = await fetch(`${API_END}/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: debouncedEmail }),
      });
      if (response.ok) {
        data = await response.json();
        setReceiver(data);
        setloading(false);
      } else {
        setloading(false);
        setTitle("Invalid Email");
        setTypeAlert("failed");
        setmessage("We couldn't find an account associated with this email");
        setShowAlert(true);
      }
    } catch (err) {
      setloading(false);
      setTitle("Network Error");
      setTypeAlert("failed");
      setmessage(
        "Looks Like you're offline.Check your connection and try again"
      );
      showAlert(true);
    }
  };
  React.useEffect(() => {
    verifyEmail();
  }, [debouncedEmail]);

  //handle proceed button
  const handPressed = () => {
    if ((!receiver && !parseFloat(amount)) || receiver.email == senderEmail) {
      setTitle("Transfer Not Possible");
      setmessage(
        "Please enter a valid amount and receiver email.You cannot send funds to your own account"
      );
      setTypeAlert("failed");
      setShowAlert(true);
      return;
    }

    if (
      receiver &&
      Number(parseFloat(amount).toFixed(2)) > 0 &&
      Number(senderBalance) >
        Number(parseFloat(amount).toFixed(2)) +
          Number(parseFloat(amount * 0.02).toFixed(2)) &&
      senderEmail != receiver.email
    ) {
      navigation.navigate("Review", {
        currentBalance: senderBalance,
        receiverNam: `${receiver.firstname} ${receiver.lastname}`,
        tax: parseFloat(amount * 0.02).toFixed(2),
        receiverEmail: receiver.email,
        amount_s: amount,
        senderEmail: senderEmail,
        transactions: transactions,
      });
    } else {
      return;
    }
  };
  return (
    <View style={styles.transferMainPage}>
      <Image
        style={[styles.groupIcon, styles.groupLayout]}
        contentFit="cover"
        source={require("../assets/group2.png")}
      />
      <Text style={[styles.beneficiaries, styles.viewAllTypo]}>
        Beneficiaries
      </Text>
      <TouchableOpacity style={styles.viewAllWrapper}>
        <Text style={[styles.viewAll, styles.viewAllTypo]}>View All</Text>
      </TouchableOpacity>
      <View style={styles.rectangleParent}>
        <View style={[styles.frameChild, styles.frameLayout]} />
        <View style={[styles.frameItem, styles.frameLayout]} />
        <Image
          style={[styles.frameInner, styles.frameInnerLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-6461.png")}
        />
        <Text style={[styles.koredeOjo, styles.koredeOjoTypo]}>GT Bank</Text>
        <Text style={[styles.opeyemiFalogun, styles.koredeOjoTypo]}>
          Venus Bank
        </Text>
        <Image
          style={[styles.ellipseIcon, styles.frameInnerLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-6451.png")}
        />
      </View>
      <View style={styles.groupParent}>
        <View
          // destination box
          style={[styles.rectangleContainer, styles.groupParentLayout]}
        >
          <TextInput
            // implement logic to check account number being correct

            placeholder="Enter Recipient Email Address"
            value={getDestination}
            onChangeText={(text) => {
              setDestination(text);
              debouncedSetEmail(text);
            }}
            style={styles.groupChild}
          />
          <Text style={styles.sourceAccount}>Destination Account</Text>
        </View>
        <View style={[styles.groupView, styles.groupParentLayout]}>
          <TextInput
            placeholder="0.00"
            value={amount}
            onChangeText={(text) => setAmount(text)}
            style={styles.groupChild}
          />
          <Text style={styles.sourceAccount}>Amount (GH₵ )</Text>
        </View>
      </View>
      <View style={styles.AppBottom}>
        <AppBottom text="Proceed" onPress={handPressed}></AppBottom>
      </View>
      <View style={styles.backArrow}>
        <Text style={styles.transferPayment}>{`Transfer & Payment`}</Text>
        <View
          style={{
            top: 33,
            left: "5%",
          }}
        ></View>
      </View>
      <Loading style={{}} isVisible={loading} />
      <Alerts
        message={message}
        showAlert={showAlert}
        hideVerifyAlert={hideAlert}
        title={title}
        typeOfAlert={typeOfAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  backArrow: {
    top: 0,
    height: 70,
    backgroundColor: Color.colorDarkslateblue_600,
    width: "100%",
  },
  AppBottom: {
    top: hp("65%"),
    left: wp("25%"),
  },
  viewAllTypo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xs,
    textAlign: "left",
    color: Color.colorDarkslateblue_400,
  },
  frameLayout: {
    height: 100,
    width: 111,
    backgroundColor: Color.colorWhitesmoke_200,
    borderRadius: 19,
  },
  frameInnerLayout: {
    height: 31,
    width: 31,
    top: 19,
    position: "absolute",
  },
  koredeOjoTypo: {
    fontSize: FontSize.textSublabel_size,
    top: 60,
    textAlign: "left",
    color: Color.colorDarkslateblue_400,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  groupParentLayout: {
    height: 89,
    width: 348,
  },
  textTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
  },
  text1Typo: {
    color: Color.colorDarkslateblue_300,
    fontSize: FontSize.size_6xs,
    top: 67,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    position: "absolute",
  },
  groupChildLayout: {
    height: 20,
    width: 20,
    borderWidth: 0.7,
    borderColor: Color.colorDarkslateblue_300,
    backgroundColor: Color.colorLavender,
    borderRadius: Border.br_29xl,
    left: 0,
    borderStyle: "solid",
    position: "absolute",
  },
  finishPosition: {
    top: 93,
    left: "50%",
    position: "absolute",
  },
  saveBeneficiaryTypo: {
    color: Color.lightText,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_2xs,
    left: 28,
    textAlign: "left",
    position: "absolute",
  },
  bottomLayout: {
    height: 98,
    width: 375,
    position: "absolute",
  },
  groupChild5Layout: {
    height: 6,
    width: 139,
    position: "absolute",
  },
  homeParentLayout: {
    height: 49,
    position: "absolute",
  },
  homeTypo: {
    fontFamily: FontFamily.dMSansMedium,
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.size_xs_2,
    color: Color.colorDimgray,
    textAlign: "left",
    position: "absolute",
  },
  iconlybulkhomePosition: {
    left: "12.81%",
    width: "76.56%",
  },
  parentPosition: {
    height: 46,
    top: 1,
    position: "absolute",
  },
  cardsTypo: {
    top: 27,
    fontFamily: FontFamily.dMSansMedium,
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.size_xs_2,
    left: 0,
    textAlign: "left",
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
  iconLayout: {
    height: 11,
    position: "absolute",
  },
  groupIcon: {
    height: "100.74%",
    bottom: "-0.74%",
    opacity: 0.15,
    left: "0%",
    right: "0%",
    maxHeight: "100%",
    maxWidth: "100%",
    top: "0%",
    width: "100%",
  },
  beneficiaries: {
    marginLeft: -159.5,
    width: 86,
    textAlign: "left",
    color: Color.colorDarkslateblue_400,
    left: "50%",
    top: 93,
    position: "absolute",
  },
  viewAll: {
    textAlign: "left",
    color: Color.colorDarkslateblue_400,
  },
  viewAllWrapper: {
    top: 83,
    left: 285,
    alignItems: "center",
    justifyContent: "center",
    padding: Padding.p_3xs,
    flexDirection: "row",
    position: "absolute",
  },
  transferPayment: {
    marginLeft: -76.5,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "700",
    textAlign: "left",
    color: Color.lightPrimaryKeyBackground,
    left: "50%",
    position: "absolute",
    top: 33,
  },
  frameChild: {
    zIndex: 0,
  },
  frameItem: {
    marginLeft: 20,
    zIndex: 1,
  },
  frameInner: {
    left: 38,
    zIndex: 2,
  },
  koredeOjo: {
    left: 24,
    zIndex: 3,
  },
  opeyemiFalogun: {
    left: 150,
    zIndex: 4,
  },
  ellipseIcon: {
    left: 170,
    zIndex: 5,
  },
  rectangleParent: {
    top: 135,
    width: 247,
    height: 104,
    left: 28,
    flexDirection: "row",
    position: "absolute",
  },
  groupChild: {
    marginLeft: -174,
    borderRadius: Border.br_3xs,
    borderColor: Color.colorWhitesmoke_300,
    borderWidth: 1,
    height: 64,
    borderStyle: "solid",
    top: 25,
    width: 348,
    left: "50%",
    position: "absolute",
    backgroundColor: Color.lightPrimaryKeyBackground,
    padding: 15,
  },
  currencyIcon: {
    left: 10,
    width: 19,
    height: 19,
    top: 42,
    overflow: "hidden",
    position: "absolute",
  },
  sourceAccount: {
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_2xs,
    left: 0,
    top: 0,
    textAlign: "left",
    color: Color.colorDarkslateblue_400,
    position: "absolute",
  },
  text: {
    left: 32,
    color: Color.colorDarkslateblue_200,
    fontFamily: FontFamily.poppinsRegular,
    top: 42,
  },
  iconParkSoliddownC: {
    top: 45,
    left: 100,
    height: 15,
    width: 15,
    overflow: "hidden",
    position: "absolute",
  },
  davidAdebayo: {
    left: 14,
  },
  rectangleGroup: {
    zIndex: 0,
  },
  rectangleContainer: {
    marginTop: 16,
    zIndex: 1,
  },
  groupView: {
    marginTop: 16,
    zIndex: 2,
  },
  groupChild1: {
    height: "15.73%",
    width: "4.02%",
    top: "58.43%",
    right: "5.17%",
    bottom: "25.84%",
    left: "90.8%",
  },
  rectangleParent1: {
    marginTop: 16,
    zIndex: 3,
  },
  rectangleParent2: {
    marginTop: 16,
    zIndex: 4,
  },
  groupChild3: {
    top: 0,
  },
  groupChild4: {
    top: 34,
  },
  proceed: {
    marginTop: -10.5,
    marginLeft: -29,
    top: "50%",
    fontFamily: FontFamily.poppinsBold,
    color: Color.lightPrimaryKeyBackground,
    fontWeight: "700",
    left: "50%",
  },
  finish: {
    marginLeft: -134.5,
    borderRadius: Border.br_31xl,
    backgroundColor: Color.colorDarkslateblue_200,
    width: 296,
    height: 51,
    left: "50%",
    overflow: "hidden",
  },
  scheduleTransfer: {
    top: 36,
  },
  saveBeneficiary: {
    top: 2,
  },
  rectangleParent3: {
    width: 323,
    height: 144,
    marginTop: 16,
    zIndex: 5,
  },
  text1: {
    left: 114,
    zIndex: 6,
  },
  groupParent: {
    marginLeft: -173.5,
    top: 263,
    height: 792,
    left: "50%",
    position: "absolute",
  },
  bottomBarChild: {
    left: 0,
    top: 0,
  },
  groupChild5: {
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
  home: {
    top: 29,
    color: Color.colorDimgray,
    left: 0,
  },
  iconlybulkhome: {
    height: "50.52%",
    right: "10.63%",
    bottom: "49.48%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
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
    color: Color.colorDimgray,
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
    color: Color.colorDimgray,
    left: "50%",
  },
  iconlybulkticket1: {
    height: "51.58%",
    bottom: "48.42%",
    left: "0%",
    right: "0%",
    maxHeight: "100%",
    maxWidth: "100%",
    top: "0%",
    width: "100%",
  },
  billsParent: {
    marginLeft: -1.25,
    height: 48,
    width: 24,
    top: 0,
    left: "50%",
    position: "absolute",
  },
  iconlybulkcategory: {
    width: "87.5%",
    right: "12.5%",
    left: "0%",
  },
  moreParent: {
    left: 297,
    width: 28,
  },
  iconlybulkticket2: {
    width: "50%",
    right: "22.86%",
    left: "27.14%",
  },
  transfers: {
    color: Color.colorDarkslateblue_400,
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
  groupContainer: {
    left: 26,
    width: 325,
    top: 25,
    height: 49,
  },
  bottomBar: {
    marginLeft: -187.5,
    bottom: 0,
    left: "50%",
  },
  batteryIcon: {
    right: 15,
    top: 17,
    height: 11,
    width: 24,
  },
  wifiIcon: {
    right: 44,
    top: 17,
    height: 11,
    width: 15,
  },
  cellularConnectionIcon: {
    top: 18,
    right: 64,
    width: 17,
  },
  text2: {
    top: 16,
    left: 22,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.textSublabel,
    color: Color.colorDarkslateblue_600,
    fontWeight: "700",
    textAlign: "left",
    position: "absolute",
  },
  statusBar: {
    top: -1,
    height: 44,
    width: 375,
    left: 0,
    overflow: "hidden",
    position: "absolute",
  },
  transferMainPage: {
    flex: 1,
    height: hp("100"),
    width: wp("100%"),
    backgroundColor: Color.lightPrimaryKeyBackground,
  },
});

export default TransferMainPage;
