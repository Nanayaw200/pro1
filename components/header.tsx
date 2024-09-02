import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ArrowBack from "../assets/svg/ArrowBack";

type Props = {
  title: string;
  onPress: () => void;
};

const Header = ({ title, onPress }: Props) => {
  return (
    <View style={styles.header}>
      <View style={{ position: "absolute", left: 1, padding: 10 }}>
        <TouchableOpacity onPress={onPress}>
          <ArrowBack />
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTxt}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 15,
    gap: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e1e1e",
  },
});
