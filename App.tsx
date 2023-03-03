import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RunicDrawsStackScreen } from "./views/RunicDraws";
import { SettingsStackScreen } from "./views/Settings";
import { LibraryStackScreen } from "./views/Library";
import { GeneratorStackScreen } from "./views/Generator";
import HomeIcon from "./icons/HomeIcon";
import LibraryIcon from "./icons/LibraryIcon";
import { useColorScheme } from "react-native";
import { RunarTheme } from "./commonStyle";

const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={RunarTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Runic Draws"
          component={RunicDrawsStackScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => <HomeIcon color={color} />,
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryStackScreen}
          options={{
            tabBarLabel: "Library page",
            tabBarIcon: ({ color, size }) => <LibraryIcon color={color} />,
          }}
        />
        <Tab.Screen
          name="Generator"
          component={GeneratorStackScreen}
          options={{
            tabBarLabel: "Generator",
            tabBarIcon: ({ color, size }) => <HomeIcon color={color} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => <HomeIcon color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
