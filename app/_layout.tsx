import React from "react";
import { Stack } from "expo-router";
import AppContextProvider from "../context/context";
import { RootSiblingParent } from "react-native-root-siblings";

const RootLayout = () => {
  return (
    <AppContextProvider>
      <RootSiblingParent>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade_from_bottom",
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="addpatientinfo"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="adddocinfo"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="editdocinfo"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="editpatientinfo"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="addappointment"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="doceditappointment"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="editappointment"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="alert"
            options={{
              headerShown: false,
              presentation: "transparentModal",
              animation: "fade",
              animationDuration: 2,
            }}
          />
        </Stack>
      </RootSiblingParent>
    </AppContextProvider>
  );
};

export default RootLayout;
