import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState, useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Color, FontSize, FontFamily } from "../GlobalStyles";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import Alerts from "../effects/Alerts";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as FileSystem from "expo-file-system";
import { API_END } from "../utils/Config";

function FaceEnrollCamera({ navigation, route }) {
  // route params
  const { email } = route.params;
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [alertBox, setAlertBox] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("nothing");
  const cameraRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [status, setStatus] = useState("");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const renderAlert = () => {
    if (status === "success") {
      setTypeAlert("success");
      setTitle("Enrollment Successful!");
      setMessage("Great Job! Face ID setup finished");
      setAlertBox(true);
    } else {
      alertFailed();
    }
  };

  const alertFailed = () => {
    setTitle("Enrollment Failed!");
    setTypeAlert("failed");
    setMessage("Face not enrolled. Make sure your face is within the frame");
    setAlertBox(true);
  };

  const hideAlert = () => {
    if (status === "success") {
      setAlertBox(false);
      navigation.replace("DashBoard", {
        UserEMail: email,
      });
    } else {
      setAlertBox(false);
      navigation.replace("FaceAuthen", {
        email: email,
      });
    }
  };

  const cancelScan = () => {
    navigation.replace("FaceAuthen", {
      email: email,
    });
  };

  const takePictures = async () => {
    if (cameraRef.current) {
      try {
        const newImages = [];
        await sleep(100);
        for (let i = 0; i < 4; i++) {
          const photo = await cameraRef.current.takePictureAsync({
            quality: 0.7,
            base64: true,
          });
          newImages.push(photo.uri);
          res = await uploadImages(photo.uri);
          if (res) {
            setStatus("success");
            return;
          } else {
            continue;
          }
        }
        // ***************
      } catch (err) {
        console.error(err);
      }
    }
  };

  const uploadImages = async (image) => {
    try {
      const response = await fetch(`${API_END}/api/faceEnroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, image: image }),
      });
      if (response.ok) {
        setStatus("success");
        return true;
      } else {
        setStatus("failed");
        return false;
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };
  const setupCamera = async () => {
    const { status } = await requestPermission();
    if (status === "granted") {
      takePictures();
    } else {
      await requestPermission();
    }
  };
  useEffect(() => {
    setupCamera();

    const timer = setTimeout(() => {
      renderAlert();
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  } else if (permission?.granted) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Color.colorDarkslateblue_200} />
        <View style={styles.displayText}>
          <FontAwesome5
            name="unlock-alt"
            size={24}
            color={Color.colorDarkslateblue_200}
            style={styles.iconlock}
          />
          <Text style={styles.textStyle}>
            Hold the phone still. Rotate your
          </Text>
          <Text style={styles.goslow}> Head. Go slow </Text>
          <Text style={[styles.captureall, styles.defaultTextstyle]}>
            Position your face in the circle
          </Text>
        </View>
        <View style={styles.cameraContainer}>
          <View style={styles.cameraWrapper}>
            <CameraView
              style={styles.camera}
              facing={facing}
              ref={cameraRef}
            ></CameraView>
          </View>
        </View>
        <View style={styles.buttonCancel}>
          <TouchableOpacity onPress={cancelScan}>
            <Text style={styles.textCancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lottieContainer}>
          <LottieView
            source={require("../data/roundSpining.json")}
            autoPlay
            loop
            style={styles.lottie}
          ></LottieView>
        </View>
        <Alerts
          showAlert={alertBox}
          title={title}
          message={message}
          hideVerifyAlert={hideAlert}
          typeOfAlert={typeAlert}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: Color.lightPrimaryKeyBackground,
    paddingTop: Constants.statusBarHeight,
  },
  cameraContainer: {
    top: hp("38%"),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: "20%",
  },
  camera: {
    flex: 1,
  },
  cameraWrapper: {
    width: 250,
    height: 250,
    borderRadius: 150, //
    overflow: "hidden",
  },

  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  displayText: {
    top: hp("10%"),
  },
  textStyle: {
    top: 20,
    width: wp("100%"),
    textAlign: "center",
    fontSize: FontSize.size_xl,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    color: Color.colorDarkslateblue_200,
  },
  iconlock: {
    left: wp("50%"),
  },
  goslow: {
    top: 30,
    textAlign: "center",
    fontSize: FontSize.size_xl,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    color: Color.colorDarkslateblue_200,
  },
  defaultTextstyle: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.interRegular,
    color: Color.colorDarkslateblue_200,
    fontWeight: "400",
  },
  captureall: {
    top: 40,
    textAlign: "center",
  },
  buttonCancel: {
    top: hp("78%"),
    left: wp("5%"),
  },
  textCancel: {
    color: "#248DE2",
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.poppinsLight,
    fontWeight: "bold",
  },
  lottie: {
    width: 450,
    height: 490,
  },
  lottieContainer: {
    position: "absolute",
    top: "23%",
    left: "1%",
    marginLeft: -18,
  },
});

export default FaceEnrollCamera;
