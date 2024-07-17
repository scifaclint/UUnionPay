import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useState, useEffect, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { API_END } from "../utils/Config";
function BackgroundCamera({ type, email }) {
  const [facing, setFacing] = useState("front");
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [status, setStatus] = useState("");

  // take pictues or videos
  const takePictures = async () => {
    if (cameraRef.current) {
      try {
        const newImages = [];
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

  // upload pictures
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
  // setUp camera
  const setupCamera = async () => {
    const { status } = await requestPermission();
    if (status === "granted") {
      takePictures();
    } else {
      await requestPermission();
    }
  };
  // ***************************************************
  if (!permission) {
    // Camera permissions are still loading.
    // record video not
    return <View />;
  }
  if (!permission.granted) {
    // Camera not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to Use the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  if (type == "payment") {
    return (
      <View
      //camera implementations
      >
        <View style={styles.cameraContainer}>
          <View style={styles.cameraWrapper}>
            <CameraView style={styles.camera} facing={facing}></CameraView>
          </View>
        </View>
      </View>
    );
  }
  if (type == "login") {
    return (
      // logic and api stuffs here

      <View
      //camera implementations
      >
        <View style={styles.cameraContainer}>
          <View style={styles.cameraWrapper}>
            <CameraView style={styles.camera} facing={facing}></CameraView>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cameraContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cameraWrapper: {
    width: 250,
    height: 250,
    borderRadius: 150, //
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
});
export default BackgroundCamera;
