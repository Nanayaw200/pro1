import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Header from "../components/header";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Toast from "react-native-root-toast";
import { useAppContext } from "../context/context";
import LoadingButton from "../components/loadingbutton";
import AppointmentCardPatient from "../components/appointmentCardPatient";
import { StatusBar } from "expo-status-bar";

const EditAppointmentModal = () => {
  let {
    appointmentdata,
    apiurl,
    userData,
    alertMSG,
    setAlertMSG,
    alertColor,
    setAlertColor,
    toastVisible,
    setToastVisible,
  }: any = useAppContext();
  const [date, setDate] = useState<Date | null>(
    new Date(appointmentdata.current.date)
  );
  const [showDate, setShowDate] = useState<boolean>(false);
  const [time, setTime] = useState<Date | null>(
    new Date(appointmentdata.current.time)
  );
  const [showTime, setShowTime] = useState<boolean>(false);
  const [data, setData] = useState<any>(appointmentdata.current);

  const [loading, setLoading] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const dateChange = (e: any, selecteDate: any) => {
    if (e.type === "set") {
      const currentDate = selecteDate || date;
      setDate(currentDate);
    }
    setShowDate(false);
  };

  const timeChange = (e: any, selecteTime: any) => {
    if (e.type === "set") {
      const currentTime = selecteTime || time;
      setTime(currentTime);
    }
    setShowTime(false);
  };

  // for text button
  const formateTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };
  const formateDate = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // for card
  const formatedTime = (isoString: string): string => {
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

  const formatedDate = (isoString: string): string => {
    const date = new Date(isoString);

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const saveappointment = () => {
    setLoading(true);
    axios
      .patch(`${apiurl}/appointment/doc/update/${appointmentdata.current.id}`, {
        date,
        time,
        doctorid: userData.current.doctorinfo.id,
      })
      .then((res) => {
        if (!res.data.success) {
          setAlertMSG(res.data.message);
          setAlertColor("#FFC107");
          setToastVisible(true);
          setLoading(false);
        } else {
          setData(res.data.docapt);
          setAlertMSG(res.data.message);
          setAlertColor("#59ac60");
          setToastVisible(true);
          setLoading(false);
          setEdit(false);
        }
      })
      .catch((err) => {
        setAlertMSG(`Error ${err}`);
        setAlertColor("#FF6B6B");
        setToastVisible(true);
        setLoading(false);
      });
  };

  const archiveappointment = () => {
    setLoading(true);
    axios
      .patch(
        `${apiurl}/appointment/doc/update/status/${appointmentdata.current.id}`,
        {
          status: "archive",
          doctorid: userData.current.doctorinfo.id,
        }
      )
      .then((res) => {
        if (!res.data.success) {
          setAlertMSG(res.data.message);
          setAlertColor("#FFC107");
          setToastVisible(true);
          setLoading(false);
        } else {
          setAlertMSG(res.data.message);
          setAlertColor("#59ac60");
          setToastVisible(true);
          setLoading(false);
          router.replace("/docappointment");
        }
      })
      .catch((err) => {
        setAlertMSG(`Error ${err}`);
        setAlertColor("#FF6B6B");
        setToastVisible(true);
        setLoading(false);
      });
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
      {edit ? (
        <>
          <Header
            title="Reschedule Appointment"
            onPress={() => router.replace("/docappointment")}
          />
          <View
            style={{
              flex: 1,
              // padding: 10,
            }}
          >
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              scrollEnabled
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.content}>
                <TouchableOpacity
                  style={styles.dateTimeBtn}
                  onPress={() => setShowDate(true)}
                >
                  <AntDesign name="calendar" size={20} style={styles.icon} />
                  <Text style={styles.selectedTextStyle}>
                    {date !== null
                      ? formateDate(date)
                      : "Select appointment date"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dateTimeBtn}
                  onPress={() => setShowTime(true)}
                >
                  <AntDesign
                    name="clockcircleo"
                    size={20}
                    style={styles.icon}
                  />
                  <Text style={styles.selectedTextStyle}>
                    {time !== null
                      ? formateTime(time)
                      : "Select appointment time"}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <View style={styles.bottombtn}>
              {loading ? (
                <LoadingButton
                  title="Sign Up"
                  width="100%"
                  marginVertical={20}
                  padding={15}
                  bgColor="#61a1ddbe"
                  color="#fff"
                />
              ) : (
                <TouchableOpacity
                  style={styles.bookAppointmentBtn}
                  onPress={saveappointment}
                >
                  <Text style={styles.bookApointmentBtntxt}>Save</Text>
                </TouchableOpacity>
              )}
            </View>
            {showDate && (
              <RNDateTimePicker
                is24Hour={false}
                display="calendar"
                value={date || new Date()}
                mode="date"
                onChange={dateChange}
              />
            )}
            {showTime && (
              <RNDateTimePicker
                is24Hour={false}
                display="clock"
                value={time || new Date()}
                mode="time"
                onChange={timeChange}
              />
            )}
          </View>
        </>
      ) : (
        <>
          <Header
            title="Appointment"
            onPress={() => router.replace("/docappointment")}
          />
          <View
            style={{
              flex: 1,
              // padding: 10,
            }}
          >
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              scrollEnabled
              showsVerticalScrollIndicator={false}
            >
              <AppointmentCardPatient
                image={data.patient.avatar}
                name={data.patient.fullname}
                phone={data.patient.phone}
                time={formatedTime(data?.time)}
                date={formatedDate(data?.date)}
              />
            </ScrollView>
            <View style={styles.bottombtn}>
              <View style={styles.optionsBox}>
                <TouchableOpacity
                  style={styles.optionBtn}
                  onPress={() => setEdit(true)}
                >
                  <Text style={styles.bookApointmentBtntxt}>Reschedule</Text>
                </TouchableOpacity>
                {loading ? (
                  <LoadingButton
                    flex={1}
                    // marginVertical={20}
                    padding={15}
                    bgColor="#61a1ddbe"
                    color="#fff"
                  />
                ) : (
                  <TouchableOpacity
                    style={styles.optionBtn}
                    onPress={archiveappointment}
                  >
                    <Text style={styles.bookApointmentBtntxt}>Seen</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </>
      )}

      <Toast
        visible={toastVisible}
        position={40}
        backgroundColor="transparent"
        shadow={false}
        animation={true}
        onPress={() => setToastVisible(false)}
        style={{ zIndex: 2 }}
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

export default EditAppointmentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    // padding: 10,
    gap: 15,
  },

  // dropdown
  dropdown: {
    width: "100%",
    // margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
  },
  icon: {
    marginRight: 10,
  },
  itemContainer: {
    padding: 17,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dateTimeBtn: {
    width: "100%",
    // margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  bottombtn: {
    flex: 1,
    width: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    zIndex: 2,
    bottom: 0,
  },
  bookAppointmentBtn: {
    width: "100%",
    marginBottom: 20,
    paddingVertical: 15,

    // backgroundColor: "#408b40",
    backgroundColor: "#3497F9",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
  bookApointmentBtntxt: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  optionsBox: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  optionBtn: {
    flex: 1,
    marginBottom: 20,
    paddingVertical: 15,

    // backgroundColor: "#408b40",
    backgroundColor: "#3497F9",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
});
