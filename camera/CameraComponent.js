import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, Dimensions } from "react-native";
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
} from "react-native-vision-camera";
import { Color } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import constants from "expo-constants";

function CameraComponent({ email }) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraActive, setCameraActive] = useState(true);
  const { preview, setPreview } = useState(true);
  const device = useCameraDevice("back");

  const handlePermission = async () => {
    await requestPermission();
  };

  useEffect(() => {
    if (!hasPermission) {
      handlePermission();
    }
  }, []);

  const renderNoPermission = () => (
    <>
      <StatusBar backgroundColor={Color.colorDarkslateblue_200} />
      <View style={styles.noPermission}>
        <Text>Camera permission is not granted</Text>
        <Button title="Request Permission" onPress={handlePermission} />
      </View>
    </>
  );

  if (!hasPermission) {
    return renderNoPermission();
  }
  if (device == null) {
    console.log("No camera device");
  }
  return (
    <>
      <StatusBar backgroundColor={Color.colorDarkslateblue_200} />
      <View style={styles.camera}>
        <View style={styles.cameraContainer}>
          <View style={styles.cameraWrapper}>
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={cameraActive}
              resizeMode="cover"
              preview={preview}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  noPermission: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: constants.statusBarHeight,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingTop: constants.statusBarHeight,
    width: "100%",
    justifyContent: "center",
    backgroundColor: Color.lightPrimaryKeyBackground,
    height: "100%",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  cameraContainer: {
    top: "38%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: "20%",
  },
  cameraWrapper: {
    width: 250,
    height: 250,
    borderRadius: 150, //
    overflow: "hidden",
  },
});

export default CameraComponent;
