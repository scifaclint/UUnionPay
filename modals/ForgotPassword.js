import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ScrollView } from "react-native";
import Modal from "react-native-modal";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AppBottom from "../components/AppBottom";
import Alerts from "../effects/Alerts";
function ForgotPassword({ isVisible, onClose }) {
  const [email, setEmail] = useState("");
  const [isvisible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [typealert, setTypeAlert] = useState("");
  const handleReset = () => {
    // implement link sending logic here
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (pattern.test(email)) {
      setTitle("Reset Link sent");
      setTypeAlert("success");
      setMessage(`Password reset link sent to ${email}. Check your email`);
      setVisible(true);
    } else {
      setTitle("Invalid Email");
      setTypeAlert("failed");
      setMessage("Please enter a valid email address");
      setVisible(true);
    }
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboarview}
      >
        <ScrollView>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.message}>
              Please enter the email address associated with your account. A
              password reset link will be sent to your inbox.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            ></TextInput>
            <View style={styles.appbottom}>
              <AppBottom onPress={handleReset} text="Reset" />
            </View>
            <Alerts
              showAlert={isvisible}
              title={title}
              message={message}
              hideVerifyAlert={() => setVisible(false)}
              typeOfAlert={typealert}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "#E8E8E8",
  },
  modalContent: {
    backgroundColor: Color.lightPrimaryKeyBackground,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    height: hp("80%"),
  },
  title: {
    fontFamily: FontFamily.poppinsBold,
    fontSize: FontSize.size_5xl,
    color: Color.colorDarkslateblue_200,
  },
  message: {
    top: 20,
    fontFamily: FontFamily.interMedium,
    fontSize: FontSize.size_xl,
    color: Color.colorDarkslateblue_100,
  },
  input: {
    top: 100,
    left: "2%",
    borderColor: Color.colorGray_200,
    borderWidth: 1,
    height: 55,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.lightPrimaryKeyBackground,
    width: "90%",
    padding: 10,
  },
  keyboarview: {},
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appbottom: {
    top: 120,
    right: "30%",
  },
});

export default ForgotPassword;
