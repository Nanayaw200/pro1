import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import CustomButton from "../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../context/context";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
type Props = {};

const Alert = (props: Props) => {
  let { userData }: any = useAppContext();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      userData.current = null;
      router.replace("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.closebtn}></Pressable>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.title}>
            <Text style={styles.headerTxt}>
              Are you sure you want to logout?
            </Text>
          </View>
          <View style={styles.gbtgrp}>
            <CustomButton
              flex={1}
              title="Cancel"
              width="100%"
              marginVertical={20}
              padding={15}
              bgColor="#3497F9"
              color="#fff"
              onPress={() => router.back()}
            />
            <CustomButton
              flex={1}
              title="Logout"
              width="100%"
              marginVertical={20}
              padding={15}
              bgColor="#3497F9"
              color="#fff"
              onPress={logout}
            />
          </View>
        </View>
      </View>
      <StatusBar style="dark" />

    </SafeAreaView>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  closebtn: {
    width: "100%",
    height: "100%",
    // backgroundColor:"red",
    position: "absolute",
  },

  cardContainer: { width: "100%", height: "auto", paddingHorizontal: 15 },
  title: { flex: 1, alignItems: "center", justifyContent: "center" },
  card: {
    width: "100%",
    height: 207,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 50,
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: "500",
    color: "#1e1e1e",
  },
  gbtgrp: {
    // marginTop: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 10,
  },
});
