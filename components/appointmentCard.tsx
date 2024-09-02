import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CalenderIcon from "../assets/svg/Calender";
import ClockIcon from "../assets/svg/ClockIcon";

type Props = {
  name?: string;
  title?: string;
  date?: string;
  time?: string;
  image?: string;
  onPress?: () => void;
  onLongPress?: () => void;
};

const AppointmentCard = ({
  image,
  name,
  title,
  date,
  time,
  onPress,
  onLongPress,
}: Props) => {
  const getinitials = () => {
    let fname = name;
    // Split the sentence into words
    let words = fname && fname.split(" ");

    // Get the first character of each word
    let firstChars = words && words.map((word) => word[0]);

    let user = firstChars && firstChars.join("");
    return user;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.cardcontent}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          style={styles.doctorImg}
        />
      ) : (
        <View style={styles.doctorImg}>
          <Text style={styles.patientImgtxt}>{getinitials()}</Text>
        </View>
      )}

      <View style={styles.doctorDetails}>
        <Text style={styles.docName}>{name}</Text>
        <Text style={styles.docTitle}>{title}</Text>

        <View style={styles.calTime}>
          <View style={styles.calender}>
            <CalenderIcon />
            <Text style={styles.calendertxt}>{date}</Text>
          </View>

          <View style={styles.calender}>
            <ClockIcon />
            <Text style={styles.calendertxt}>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  cardcontent: {
    width: "100%",
    flex: 1,
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: "#f7f7f7",
    borderRadius: 10,
    backgroundColor: "#fff",
    // elevation: 5,
  },
  doctorImg: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
  patientImgtxt: {
    fontSize: 20,
    fontWeight: "600",
    color: "#707070",
  },
  doctorDetails: {
    // width: "100%",
    height: "100%",
    justifyContent: "center",
    gap: 1,
  },
  docName: {
    color: "#707070",
    fontSize: 16,
    fontWeight: "500",
  },
  docTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#707070",
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
    color: "#707070",
    fontWeight: "500",
  },
});
