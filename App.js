import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "./firebaseConfig";
import * as React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
const Stack = createNativeStackNavigator();
import LoginScreen from "./screens/LoginScreen";
import StartScreen from "./screens/StartScreen";
import CreateAccountForms from "./screens/CreateAccountForms";
import SplashScreen from "./screens/SplashScreen";
import DashBoard from "./screens/DashBoard";
import OnLoginPass from "./screens/OnLooginPass";
import FaceIdAuthen from "./screens/FaceIdAuthen";
import FaceEnrollCamera from "./other_screens/FaceEnrollCamera";
import BackgroundCamera from "./other_screens/BackgroundCamera";
import ReviewPayment from "./screens/ReviewPayment";
import TransferMainPage from "./screens/TransferMainPage";
import { View } from "react-native-animatable";
import BackgroundFaceScan from "./modals/BackgroundFaceScan";
import CameraComponent from "./camera/CameraComponent";
const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export { auth };
const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  useEffect(() => {
    // Simulate some initialization tasks (e.g., fetching data, initializing services)
    // Replace  actual initialization logic
    setTimeout(() => {
      setHideSplashScreen(false); // Hide splash screen after 2 seconds (adjust as needed)
    }, 2000); // Adjust the delay as needed
  }, []);

  const [fontsLoaded, error] = useFonts({
    "DMSans-Medium": require("./assets/fonts/DMSans-Medium.ttf"),
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "DMSans-Bold": require("./assets/fonts/DMSans-Bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <CameraComponent />
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Start"
    //       component={StartScreen}
    //       options={{ headerShown: false, gestureEnabled: false }}
    //     />
    //     <Stack.Screen
    //       name="Login"
    //       component={LoginScreen}
    //       options={{
    //         headerShown: false,
    //         headerLeft: null,
    //         gestureEnabled: false,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="LoginPass"
    //       component={OnLoginPass}
    //       options={{
    //         headerShown: false,
    //         gestureEnabled: false,
    //         headerLeft: null,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="DashBoard"
    //       component={DashBoard}
    //       options={{
    //         headerShown: false,
    //         gestureEnabled: false,
    //         headerLeft: null,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="Transfer"
    //       component={TransferMainPage}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="Review"
    //       component={ReviewPayment}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="BackgroundCamera"
    //       component={BackgroundCamera}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="createAccount"
    //       component={CreateAccountForms}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="FaceAuthen"
    //       component={FaceIdAuthen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="CameraScan"
    //       component={FaceEnrollCamera}
    //       options={{ headerShown: false }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};
export default App;
