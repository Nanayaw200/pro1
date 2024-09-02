import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  multiline?: boolean;
  type?: Type | string;
  secureTextEntry?: boolean;
  onChangeText: (e: any) => void;
};

enum Type {
  Default = "default",
  Number = "number",
  Phone = "phone",
  Email = "email",
}

let focuscolor: string = "#3BC9A4";

const TextBox = ({
  label,
  value,
  placeholder,
  multiline,
  type,
  secureTextEntry,
  onChangeText,
}: Props) => {
  const [ispass, setIspass] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const onFocus = () => {
    setFocus(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        // onTouchStart={onFocus}
        style={styles.inputBox}
      >
        <TextInput
          multiline={multiline}
          numberOfLines={multiline ? 6 : 1}
          textAlignVertical={multiline ? "top" : "auto"}
          keyboardAppearance="default"
          keyboardType={
            type === "phone"
              ? "phone-pad"
              : type === "number"
              ? "number-pad"
              : type === "email"
              ? "email-address"
              : type === "default"
              ? "default"
              : "default"
          }
          maxLength={250}
          value={value}
          style={{width:"100%", fontSize: 14, fontWeight: "500" }}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#ccc"
          cursorColor="#606060"
          secureTextEntry={label === "Password" && true}
          returnKeyType="next"
          // onFocus={() => onFocus()}
        />
      </View>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    color: "#707070",
    fontSize: 16,
    fontWeight: "400",
    margin: 5,
  },
  inputBox: {
    // marginTop: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 5,
  },
});
