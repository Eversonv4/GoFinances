import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import { LoadingPage } from "@components/SplashScreen";

import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";

import Theme from "@global/styles/theme";

import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";
import { AppRoutes } from "@routes/app.routes";

import { AuthProvider } from "@hooks/auth";

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
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
