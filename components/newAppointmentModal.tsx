import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Header from "./header";

import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type Props = {
  modalVisible: boolean;
  onRequestClose: () => void;
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

const NewAppointmentModal = ({ modalVisible, onRequestClose }: Props) => {
  const [value, setValue] = useState<any>(null);
  const [date, setDate] = useState<Date | null>(new Date());
  const [showDate, setShowDate] = useState<boolean>(false);
  const [time, setTime] = useState<Date | null>(new Date());
  const [showTime, setShowTime] = useState<boolean>(false);

  const renderItem = (item: Items) => {
    return (
      <View style={styles.itemContainer}>
        
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            // style={styles.itemIcon}
            color="#408b40"
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

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.container}>
        <Header title="Book Appointment" onPress={onRequestClose} />

        <View style={styles.content}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
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
          <TouchableOpacity
            style={styles.bookAppointmentBtn}
            onPress={() => {}}
          >
            <Text style={styles.bookApointmentBtntxt}>Book Appointment</Text>
          </TouchableOpacity>
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
      </View>
    </Modal>
  );
};

export default NewAppointmentModal;

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
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
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
});
