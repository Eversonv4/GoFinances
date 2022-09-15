import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import { LoadingPage } from "@components/SplashScreen";

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
import { AppRoutes } from "@routes/app.routes";
import { SignIn } from "@screens/SignIn";

import { AuthContext } from "@hooks/auth";

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
        <StatusBar barStyle="light-content" />
        <AuthContext.Provider value={["Deus ajuda o meu denguinho!"]}>
          <SignIn />
          {/* <AppRoutes /> */}
        </AuthContext.Provider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
