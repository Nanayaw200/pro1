import { Link, Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAppContext } from "../context/context";
import { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  let { userData }: any = useAppContext();

  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        userData.current = JSON.parse(user);
        if (userData.current.role === "patient") router.replace("/home");
        if (userData.current.role === "doctor") router.replace("/dochome");
      } else {
        router.replace("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getUserData();
    }, 10);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size={50} color="#3497F9" />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
