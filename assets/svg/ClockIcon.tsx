import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const ClockIcon = () => {
  return (
    <Svg width="20" height="20" viewBox="0 0 48 48" fill="none">
      <Path
        d="M24 12V24L32 28M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z"
        stroke="#707070"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ClockIcon;
