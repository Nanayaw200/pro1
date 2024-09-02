import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import React, { useState } from "react";

type Props = {
  modalVisible: boolean;
  onRequestClose: () => void;
};

const AlertDialog = ({ modalVisible, onRequestClose }: Props) => {
  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={onRequestClose}
      transparent={true}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          
          <ActivityIndicator size={50} color="#3497F9" />
        </View>
      </View>
    </Modal>
  );
};

export default AlertDialog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: 200,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
