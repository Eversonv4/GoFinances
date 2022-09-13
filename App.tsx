import React from "react";
import { ThemeProvider } from "styled-components";
import { LoadingPage } from "@components/SplashScreen";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";

import Theme from "@global/styles/theme";

import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "@routes/app.routes";

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
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
