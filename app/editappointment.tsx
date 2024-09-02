import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Header from "../components/header";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Toast from "react-native-root-toast";
import { useAppContext } from "../context/context";
import LoadingButton from "../components/loadingbutton";
import { StatusBar } from "expo-status-bar";

type Props = {
  modalVisible: boolean;
  onRequestClose: () => void;
};

type UserInfo = {
  id?: string;
  createAt?: Date;
  updatedAt?: Date;
  fullname?: string;
  title?: string;
  phone?: string;
  studentid?: string;
  email?: string;
  gender?: string;
  dob?: Date | string;
  avatar: string | null;
};

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

type Items = {
  label: string;
  value: string;
};

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
  const [value, setValue] = useState<string>(appointmentdata.current.doctorid);
  const [date, setDate] = useState<Date | null>(
    new Date(appointmentdata.current.date)
  );
  const [showDate, setShowDate] = useState<boolean>(false);
  const [time, setTime] = useState<Date | null>(
    new Date(appointmentdata.current.time)
  );
  const [showTime, setShowTime] = useState<boolean>(false);
  const [docs, setDocs] = useState<Items[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [docloading, setDocLoading] = useState<boolean>(false);

  const renderItem = (item: Items) => {
    return (
      <View style={styles.itemContainer}>
        {docloading ? (
          <Text style={styles.textItem}>Loading...</Text>
        ) : (
          <Text style={styles.textItem}>{item.label}</Text>
        )}
      </View>
    );
  };

  const dateChange = (e: any, selecteDate: any) => {
    if (e.type === "set") {
      const currentDate = selecteDate || date;
      console.log(currentDate);
      setDate(currentDate);
    }
    setShowDate(false);
  };

  const timeChange = (e: any, selecteTime: any) => {
    if (e.type === "set") {
      const currentTime = selecteTime || time;
      console.log(currentTime);
      setTime(currentTime);
    }
    setShowTime(false);
  };

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

  const getdoctors = () => {
    setDocLoading(true);
    axios
      .get(`${apiurl}/doctor/all`)
      .then((res) => {
        if (!res.data.success) {
        } else {
          setDocLoading(false);
          const data = res.data.docs.map((item: any) => ({
            label: item.fullname,
            value: item.id,
          }));
          setDocs(data);
        }
      })
      .catch((err) => console.log("error ", err));
  };

  const saveappointment = () => {
    if (value === "") {
      setAlertMSG("Please select a doctor");
      setAlertColor("#FF6B6B");
      setToastVisible(true);
    } else {
      setLoading(true);
      axios
        .patch(`${apiurl}/appointment/update/${appointmentdata.current.id}`, {
          date,
          time,
          patientid: userData.current.patientinfo.id,
          doctorid: value,
        })
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
            router.replace("/appointment");
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

  useEffect(() => {
    getdoctors();
  }, []);

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
      <Header
        title="Edit Appointment"
        onPress={() => router.replace("/appointment")}
      />
      <View
        style={{
          flex: 1,
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
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={docs}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select a doctor for appointment"
              searchPlaceholder="Search for a doctor..."
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="user"
                  size={20}
                />
              )}
              renderItem={renderItem}
            />

            <TouchableOpacity
              style={styles.dateTimeBtn}
              onPress={() => setShowDate(true)}
            >
              <AntDesign name="calendar" size={20} style={styles.icon} />
              <Text style={styles.selectedTextStyle}>
                {date !== null ? formateDate(date) : "Select appointment date"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateTimeBtn}
              onPress={() => setShowTime(true)}
            >
              <AntDesign name="clockcircleo" size={20} style={styles.icon} />
              <Text style={styles.selectedTextStyle}>
                {time !== null ? formateTime(time) : "Select appointment time"}
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
});
