import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RunicDrawsStackScreen } from "./views/RunicDraws";
import { MenuStackScreen } from "./views/Menu";
import { LibraryStackScreen } from "./views/Library";
import { GeneratorStackScreen } from "./views/Generator";
import HomeIcon from "./icons/HomeIcon";
import LibraryIcon from "./icons/LibraryIcon";
import { useColorScheme } from "react-native";
import { RunarTheme } from "./commonStyle";
import GridIcon from "./icons/GridIcon";
import MenuIcon from "./icons/MenuIcon";

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
            tabBarLabel: "Runic Draws",
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
            tabBarIcon: ({ color, size }) => <GridIcon color={color} />,
          }}
        />
        <Tab.Screen
          name="Menu"
          component={MenuStackScreen}
          options={{
            tabBarLabel: "Menu",
            tabBarIcon: ({ color, size }) => <MenuIcon color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
