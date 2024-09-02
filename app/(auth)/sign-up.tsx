import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TextBox from "../../components/textBox";
import CustomButton from "../../components/button";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { useAppContext } from "../../context/context";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingButton from "../../components/loadingbutton";

const SignUp = () => {
  let {
    apiurl,
    userData,
    alertMSG,
    setAlertMSG,
    alertColor,
    setAlertColor,
    toastVisible,
    setToastVisible,
  }: any = useAppContext();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conPass, setConPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errorColor, setErrorColor] = useState<string>("");

  const signup = () => {
    if (username === "" || password === "") {
      setError("All fields are required");
      setErrorColor("#FF6B6B");
      setToastVisible(true);
    } else if (password !== conPass) {
      setError("Passwords do not match");
      setErrorColor("#FF6B6B");
      setToastVisible(true);
    } else {
      setLoading(true);
      axios
        .post(`${apiurl}/auth/register`, {
          username,
          password,
        })
        .then(async (res) => {
          if (!res.data.success) {
            setAlertMSG(res.data.message);
            setAlertColor("#FFC107");
            setToastVisible(true);
            setLoading(false);
          } else {
            await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
            userData.current = res.data.user;
            setLoading(false);
            setToastVisible(false);
            if (res.data.user.role === "patient") router.replace("/home");
            if (res.data.user.role === "doctor") router.replace("/dochome");
          }
        })
        .catch((err) => console.log("error ", err));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardDismissMode="interactive"
        contentContainerStyle={{
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headercontainer}>
          <Text style={styles.signuptxt}>Sign Up</Text>
        </View>
        <View style={styles.form}>
          <TextBox
            label="Username"
            value={username}
            onChangeText={(e) => setUsername(e)}
          />
          {/* <TextBox
            type="email"
            label="Email"
            value={email}
            onChangeText={(e) => setEmail(e)}
          /> */}
          <TextBox
            label="Password"
            value={password}
            onChangeText={(e) => setPassword(e)}
          />

          <TextBox
            label="Confirm Password"
            value={conPass}
            onChangeText={(e) => setConPass(e)}
          />

          {loading ? (
            <LoadingButton
              title="Sign Up"
              width="100%"
              marginVertical={20}
              padding={15}
              bgColor="#61a1ddbe"
              color="#fff"
              onPress={signup}
            />
          ) : (
            <CustomButton
              title="Sign Up"
              width="100%"
              marginVertical={20}
              padding={15}
              bgColor="#3497F9"
              color="#fff"
              onPress={signup}
            />
          )}

          <View style={styles.dntAcc}>
            <Text style={styles.dntAccTxt}>Already have an account?</Text>
            <Link style={styles.lnktxt} href="/sign-in">
              Login here
            </Link>
          </View>
        </View>
      </ScrollView>
      <Toast
        visible={toastVisible}
        position={40}
        backgroundColor="transparent"
        shadow={false}
        animation={true}
        onPress={() => setToastVisible(false)}
        // hideOnPress={true}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: alertColor,
            padding: 15,
            borderRadius: 50,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>
            {alertMSG}
          </Text>
        </View>
      </Toast>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  signuptxt: {
    fontSize: 30,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  form: {
    flex: 1,
    width: "100%",
    gap: 5,
  },
  forgotAcc: {},
  dntAcc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  dntAccTxt: {
    fontSize: 16,
    fontWeight: "500",
  },
  lnktxt: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3497F9",
  },
});
