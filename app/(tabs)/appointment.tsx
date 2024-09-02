import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/button";
import AppointmentCard from "../../components/appointmentCard";
import NewAppointmentModal from "../../components/newAppointmentModal";
import Plus from "../../assets/svg/Plus";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useAppContext } from "../../context/context";
import axios from "axios";
import Toast from "react-native-root-toast";

const Appointment = () => {
  let {
    apiurl,
    userData,
    appointmentdata,
    alertMSG,
    setAlertMSG,
    alertColor,
    setAlertColor,
    toastVisible,
    setToastVisible,
  }: any = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [errorColor, setErrorColor] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const gotoappointment = () => {
    if (!userData.current.patientinfo) {
      router.push("/addpatientinfo");
    } else {
      router.push("/addappointment");
    }
  };

  const deleteApointment = (id: string) => {
    setLoading(true);
    axios
      .delete(`${apiurl}/appointment/delete/${id}`)
      .then((res) => {
        if (!res.data.success) {
          setAlertMSG(res.data.message);
          setAlertColor("#FF6B6B");
          setToastVisible(true);
          setLoading(false);
        } else {
          setAlertMSG(res.data.message);
          setAlertColor("#59ac60");
          setToastVisible(true);
          setLoading(false);
          getApointment();
        }
      })
      .catch((err) => {
        setError(`Error ${err}`);
        setErrorColor("#FF6B6B");
        setToastVisible(true);
        setLoading(false);
      });
  };

  const getApointment = () => {
    setLoading(true);
    axios
      .get(`${apiurl}/appointment/${userData.current.patientinfo.id}`)
      .then((res) => {
        if (!res.data.success) {
          setAlertMSG("wrong ", res.data.message);
          setAlertColor("#FFC107");
          setToastVisible(true);
          setLoading(false);
        } else {
          setData(res.data.patientappointment);
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
    if (!userData.current.patientinfo) {
      router.push("/addpatientinfo");
    } else {
      getApointment();
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

  const navigate = (data: any) => {
    appointmentdata.current = data;
    router.push("/editappointment");
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
        <Text style={styles.appointmentTxt}>My Appointments</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={gotoappointment}>
          <MaterialIcons
            name="add-circle-outline"
            size={30}
            color="#1e1e1eb3"
          />
        </TouchableOpacity>
      </View>
      {data.length !== 0 ? (
        <View
          style={{ width: "100%", paddingHorizontal: 10, marginBottom: 10 }}
        >
          <FlatList
            refreshing={loading && true}
            onRefresh={getApointment}
            style={{ paddingHorizontal: 1 }}
            data={data}
            renderItem={({ item }: any) => {
              return (
                <AppointmentCard
                  image={item.doctor.avatar}
                  name={item.doctor.fullname}
                  title={item.doctor.title}
                  time={formateTime(item?.time)}
                  date={formateDate(item?.date)}
                  onPress={() => navigate(item)}
                  onLongPress={() => deleteApointment(item.id)}
                />
              );
            }}
          />
        </View>
      ) : loading ? (
        <View
          style={{
            width: "100%",
            height: 200,
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <ActivityIndicator color="#3497F9" size={30} />
        </View>
      ) : loading ? (
        <View
          style={{
            width: "100%",
            height: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color="#3497F9" size={30} />
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            height: 200,
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <Text style={styles.noAppointmentTxt}>No appointments yet</Text>
          <Pressable onPress={gotoappointment}>
            <Text style={styles.noinfobtntxt}>Add</Text>
          </Pressable>
        </View>
      )}
      <NewAppointmentModal
        modalVisible={showModal}
        onRequestClose={closeModal}
      />
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

export default Appointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 5,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    // backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    // elevation: 1,
  },
  appointmentTxt: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e1e1e",
  },
  noAppointmentTxt: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1e1e1e",
  },
  noinfobtntxt: {
    color: "#3497F9",
    fontSize: 18,
    fontWeight: "600",
  },
});
