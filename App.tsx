import React from "react";
import { View, Text } from "react-native";
import { ThemeProvider } from "styled-components";
import { LoadingPage } from "@components/SplashScreen";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";

import { Dashboard } from "@screens/Dashboard/";
import Theme from "@global/styles/theme";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    SplashScreen.hideAsync();
    return <LoadingPage />;
  }

  return (
    <ThemeProvider theme={Theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
