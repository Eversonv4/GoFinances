import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "@screens/Dashboard";
import { Register } from "@screens/Register";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="Listagem" component={Dashboard} />
      <Screen name="Cadastro" component={Register} />
      <Screen name="Resumo" component={Register} />
    </Navigator>
  );
}