import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

type Props = {
  width?: any;
  flex?: number;
  borderWidth?: number;
  color: string;
  padding?: number;
  marginVertical?: number;
  title: string;
  bgColor?: string;
  onPress: () => void;
};

const CustomButton = ({
  width,
  flex,
  color,
  borderWidth,
  padding,
  marginVertical,
  title,
  bgColor,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        flex: flex,
        width: width,
        marginBottom: 20,
        paddingVertical: padding,
        marginVertical: marginVertical,
        backgroundColor: bgColor,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: borderWidth,
        borderColor: "#ccc",
        // elevation: 1,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: color,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
