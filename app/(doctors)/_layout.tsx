import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Stack, Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "../../context/context";

const TabIcon = ({ icon, color, name, focused }: any) => {
  let { apiurl, userData }: any = useAppContext();

  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user !== null) {
        userData.current = JSON.parse(user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {icon}
      <Text
        style={{
          fontSize: 12,
          fontWeight: focused ? "600" : "400",
          color: color,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#3497F9",
        tabBarInactiveTintColor: "#61a1ddbe",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="dochome"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={<MaterialIcons name="home" size={30} color={color} />}
              color={color}
              focused={focused}
              name="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="docappointment"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={<MaterialIcons name="handshake" size={30} color={color} />}
              color={color}
              focused={focused}
              name="Appointment"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="docprofile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={<MaterialIcons name="person" size={30} color={color} />}
              color={color}
              focused={focused}
              name="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
