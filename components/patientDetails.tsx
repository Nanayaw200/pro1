import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Header from "./header";

import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import TextBox from "./textBox";
import axios from "axios";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../context/context";
import LoadingButton from "./loadingbutton";

type Props = {
  modalVisible: boolean;
  onRequestClose: () => void;
};

const genderData = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

type Items = {
  label: string;
  value: string;
};

const PatientsDetailsModal = ({ modalVisible, onRequestClose }: Props) => {
  let { apiurl, userData }: any = useAppContext();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [studentID, setStudentID] = useState<string>("");
  const [showDate, setShowDate] = useState<boolean>(false);

  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [errorColor, setErrorColor] = useState<string>("");

  const formateDate = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const renderItem = (item: Items) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === gender && (
          <AntDesign
            // style={styles.itemIcon}
            color="#3497F9"
            name="checkcircle"
            size={20}
          />
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

  const save = () => {
    if (
      name === "" ||
      phone === "" ||
      email === "" ||
      studentID === "" ||
      gender === ""
    ) {
      setError("All fields are mandatory");
      setErrorColor("#FF6B6B");
      setToastVisible(true);
    } else {
      setLoading(true);
      axios
        .post(`${apiurl}/patient/create`, {
          fullname: name,
          studentid: studentID,
          phone: phone,
          email: email,
          gender: gender,
          dob: date,
          userid: userData.current.id,
        })
        .then(async (res) => {
          if (!res.data.success) {
            setError(res.data.message);
            setErrorColor("#FFC107");
            setToastVisible(true);
            setLoading(false);
          } else {
            setLoading(false);
            await AsyncStorage.setItem(
              "user",
              JSON.stringify(res.data.userInfo)
            );
            userData.current = res.data.userInfo;
            setEmail("");
            setName("");
            setDate(new Date());
            setErrorColor("");
            setPhone("");
            setToastVisible(false);
            setGender("");
            setStudentID("");
            onRequestClose();
          }
        })
        .catch((err) => console.log("error ", err));
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.container}>
        <Header title="Personal Info" onPress={onRequestClose} />

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
          scrollEnabled
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <TextBox
              label="Student ID"
              value={studentID}
              onChangeText={(e) => setStudentID(e)}
            />
            <TextBox
              label="Full name"
              value={name}
              onChangeText={(e) => setName(e)}
            />

            <View>
              <Text style={styles.label}>Date of birth</Text>
              <TouchableOpacity
                style={styles.dateTimeBtn}
                onPress={() => setShowDate(true)}
              >
                <AntDesign name="calendar" size={20} style={styles.icon} />
                <Text style={styles.selectedTextStyle}>
                  {date !== null && formateDate(date)}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.label}>Gender</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={genderData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder=""
                value={gender}
                onChange={(item) => {
                  setGender(item.value);
                }}
                renderItem={renderItem}
              />
            </View>

            <TextBox
              label="Phone number"
              value={phone}
              onChangeText={(e) => setPhone(e)}
            />

            <TextBox
              type="email"
              label="Email address"
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
          </View>
        </ScrollView>
        {showDate && (
          <RNDateTimePicker
            is24Hour={false}
            display="calendar"
            value={date || new Date()}
            mode="date"
            onChange={dateChange}
          />
        )}

        <View
          style={{
            width: "100%",
            padding: 10,
          }}
        >
          {loading ? (
            <LoadingButton
              title="Sign Up"
              width="100%"
              // marginVertical={20}
              padding={15}
              bgColor="#61a1ddbe"
              color="#fff"
            />
          ) : (
            <TouchableOpacity style={styles.bookAppointmentBtn} onPress={save}>
              <Text style={styles.bookApointmentBtntxt}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
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
            backgroundColor: errorColor,
            padding: 15,
            borderRadius: 50,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>
            {error}
          </Text>
        </View>
      </Toast>
    </Modal>
  );
};

export default PatientsDetailsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "red",
    position: "relative",
  },
  content: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    padding: 10,
    gap: 10,
  },

  // dropdown
  dropdown: {
    width: "100%",
    // margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
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
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    alignItems: "center",
    flexDirection: "row",
  },
  bookAppointmentBtn: {
    width: "100%",
    padding: 15,
    marginBottom: 20,
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
  label: {
    color: "#707070",
    fontSize: 16,
    fontWeight: "400",
    margin: 5,
  },
});
