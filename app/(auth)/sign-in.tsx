import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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

type Props = {};

const SignIn = (props: Props) => {
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
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errorColor, setErrorColor] = useState<string>("");

  const login = () => {
    if (username === "" || password === "") {
      setAlertMSG("Username and Password cannot be empty");
      setAlertColor("#FF6B6B");
      setToastVisible(true);
    } else {
      setLoading(true);
      axios
        .post(`${apiurl}/auth/login`, {
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
        .catch((err) => {
          setAlertMSG(`Error ${err}`);
          setAlertColor("#FF6B6B");
          setToastVisible(true);
          setLoading(false);
        });
    }
  };

  const closealert = () => {
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };
  useEffect(() => {
    closealert();
  }, [toastVisible]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardDismissMode="interactive"
        contentContainerStyle={{
          flex: 1,
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headercontainer}>
          <Text style={styles.logintxt}>Login</Text>
        </View>
        <View style={styles.form}>
          <TextBox
            label="Username"
            value={username}
            onChangeText={(e) => setUsername(e)}
          />
          <TextBox
            label="Password"
            value={password}
            onChangeText={(e) => setPassword(e)}
          />

          {/* <View style={{ margin: 8 }}>
            <Link href="" style={styles.dntAccTxt}>
              Forgot Password?
            </Link>
          </View> */}

          {loading ? (
            <LoadingButton
              width="100%"
              marginVertical={20}
              padding={15}
              bgColor="#61a1ddbe"
              color="#fff"
            />
          ) : (
            <CustomButton
              title="Login"
              width="100%"
              marginVertical={20}
              padding={15}
              bgColor="#3497F9"
              color="#fff"
              onPress={login}
            />
          )}

          <View style={styles.dntAcc}>
            <Text style={styles.dntAccTxt}>Dont have and account?</Text>
            <Link style={styles.lnktxt} href="/sign-up">
              Signup here
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

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  headercontainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  logintxt: {
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
