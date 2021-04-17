import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Campeonatos from "./src/Campeonatos";
import Fases from "./src/Fases";
import Partidas from "./src/Partidas";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Campeonatos"
          component={Campeonatos}
          options={{
            title: "Campeonatos",
            headerTitleAlign: "center",
            headerStyle: {
              elevation: 2,
            },
          }}
        />
        <Stack.Screen
          name="Fases"
          component={Fases}
          options={{
            title: "Fases",
            headerTitleAlign: "center",
            headerStyle: {
              elevation: 2,
            },
          }}
        />
        <Stack.Screen
          name="Partidas"
          component={Partidas}
          options={{
            title: "Partidas",
            headerTitleAlign: "Center",
            headerStyle: {
              elevation: 2,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
