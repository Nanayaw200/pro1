import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Header from "./header";

import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import TextBox from "./textBox";

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

const PatientsDetailsEditModal = ({ modalVisible, onRequestClose }: Props) => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [bloodGroup, setBloodGroup] = useState<string>("");
  const [showDate, setShowDate] = useState<boolean>(false);

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

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.container}>
        <Header title="Edit Personal Info" onPress={onRequestClose} />

        <View style={styles.content}>
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

          <TextBox
            label="Phone number"
            value={name}
            onChangeText={(e) => setName(e)}
          />
          <View>
            <Text style={styles.label}>Date of birth</Text>
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

          {showDate && (
            <RNDateTimePicker
              is24Hour={false}
              display="calendar"
              value={date || new Date()}
              mode="date"
              onChange={dateChange}
            />
          )}

          <TouchableOpacity
            style={styles.bookAppointmentBtn}
            onPress={() => {}}
          >
            <Text style={styles.bookApointmentBtntxt}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PatientsDetailsEditModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cccccc3e",
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
    position: "absolute",
    bottom: 20,
    width: "100%",
    padding: 15,
    // backgroundColor: "#408b40",
    backgroundColor: "#3497F9",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 20,
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
