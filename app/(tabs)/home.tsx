import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAppContext } from "../../context/context";
import axios from "axios";
import Toast from "react-native-root-toast";
import AppointmentCardPatient from "../../components/appointmentCardPatient";
import AppointmentCard from "../../components/appointmentCard";

type Props = {};

const Home = (props: Props) => {
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
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<any[]>([]);
  const [tip, setTip] = useState<any>();
  const getinitials = (name: string) => {
    let sentence = name;

    // Split the sentence into words
    let words = sentence.split(" ");

    // Get the first character of each word
    let firstChars = words.map((word) => word[0]);

    let initials = firstChars.join("");
    return initials;
  };

  const getData = () => {
    setLoading(true);
    axios
      .get(
        `${apiurl}/appointment/patient/limit/${userData.current.patientinfo.id}`
      )
      .then((res) => {
        if (!res.data.success) {
          setLoading(false);
        } else {
          setData(res.data.appointments);
          setTip(res.data.tips[0].tip);
          setLoading(false);
        }
      })
      .catch((err) => {
        setAlertMSG(`Error ${err}`);
        setAlertColor("#FF6B6B");
        setToastVisible(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (userData.current.patientinfo) {
      getData();
    }
  }, []);

  const formateTime = (isoString: string): string => {
    const date = new Date(isoString);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  const formateDate = (isoString: string): string => {
    const date = new Date(isoString);

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
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
      <View style={styles.header}>
        <View style={styles.profilecontainer}>
          {userData.current.patientinfo &&
          userData.current.patientinfo.avatar ? (
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              style={styles.profileimgbtn}
            >
              <Image
                style={styles.avater}
                resizeMode="cover"
                source={{
                  uri: userData.current.patientinfo.avatar,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.profileimgbtn}
              onPress={() => router.push("/profile")}
            >
              <Text style={styles.profileImgtxt}>
                {userData.current.patientinfo
                  ? getinitials(userData.current.patientinfo?.fullname)
                  : getinitials(userData.current.username)}
              </Text>
            </TouchableOpacity>
          )}
          {userData.current.patientinfo ? (
            <Text style={styles.user}>
              {userData.current.patientinfo.fullname}
            </Text>
          ) : (
            <Text style={styles.user}>{userData.current.username}</Text>
          )}
        </View>
      </View>
      <ScrollView
        keyboardDismissMode="interactive"
        contentContainerStyle={{
          paddingHorizontal: 10,
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
          <Text style={styles.cardHeaderTxt}>My Appointments</Text>
          {loading ? (
            <View style={styles.noap}>
              <ActivityIndicator size={50} color="#fefefe" />
            </View>
          ) : data.length !== 0 ? (
            data.map((data) => (
              <AppointmentCard
                key={data.id}
                image={data.doctor.avatar}
                name={data.doctor.fullname}
                title={data.doctor.title}
                time={formateTime(data.time)}
                date={formateDate(data.date)}
              />
            ))
          ) : (
            <View style={styles.noap}>
              <Text style={styles.noaptxt}>No appointment yet</Text>
            </View>
          )}
        </View>

        <View style={styles.healthTipsCard}>
          <Text style={styles.healthtipsTxt}>Health Tips</Text>
          <View style={styles.healthTipsCardContent}>
            {tip ? (
              <Text style={styles.healthtipsContentTxt}>{tip}</Text>
            ) : (
              <View style={styles.notip}>
                <Text style={styles.healthtipsTxt}>No health tips</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
          <StatusBar style="dark" />

    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e1e1e",
  },

  profilecontainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  profileimgbtn: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 50,
    backgroundColor: "#ccc",
    // elevation: 1
  },

  profileImgtxt: {
    fontSize: 20,
    fontWeight: "700",
    color: "#707070",
  },

  user: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e1e1e",
  },

  cardContainer: {
    width: "100%",
    padding: 10,
    marginTop: 20,

    backgroundColor: "#3497F9",
    borderRadius: 10,
    flexDirection: "column",
  },
  cardHeaderTxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fefefe",
  },
  noap: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  notip: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  noaptxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fefefe",
  },
  notiptxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f1f1f",
  },
  cardcontent: {
    width: "100%",
    flex: 1,
    marginTop: 15,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f7f7f7",
    borderRadius: 10,
  },
  doctorImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  avater: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  doctorDetails: {
    // width: "100%",
    height: "100%",
    justifyContent: "center",
    gap: 1,
  },
  docName: {
    color: "#1e1e1e",
    fontSize: 18,
    fontWeight: "500",
  },
  docTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#1e1e1e",
  },
  calTime: {
    flex: 1,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 20,
  },
  calender: {
    flexDirection: "row",
    gap: 5,
  },
  calendertxt: {
    color: "#1e1e1e",
    fontWeight: "600",
  },

  healthTipsCard: {
    width: "100%",
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 1,
  },
  healthtipsTxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#707070",
  },
  healthTipsCardContent: {
    width: "100%",
    marginTop: 15,
  },
  healthtipsContentTxt: {
    fontSize: 16,
    fontWeight: "400",
    color: "#707070",
  },
});
