import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MenuStackScreen } from "./views/Menu";
import { AudioStackScreen } from "./views/Audio";
import HomeIcon from "./icons/HomeIcon";
import LibraryIcon from "./icons/LibraryIcon";
import { RunarTheme } from "./commonStyle";
import MenuIcon from "./icons/MenuIcon";
import { AssistantStackScreen } from "./views/Assistant";
import { LibraryStackScreen } from "./views/Library";
import AudioIcon from "./icons/AudioIcon";
import { UIMessage } from "./data/messages";
import "expo-dev-client";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer theme={RunarTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Assistant Section"
          component={AssistantStackScreen}
          options={{
            tabBarLabel: UIMessage.assistantMainMenuTitle,
            tabBarIcon: ({ color, size }) => <HomeIcon color={color} />,
          }}
        />

        <Tab.Screen
          name="Audio Section"
          component={AudioStackScreen}
          options={{
            tabBarLabel: UIMessage.audioMainMenuTitle,
            tabBarIcon: ({ color, size }) => <AudioIcon color={color} />,
          }}
        />

        <Tab.Screen
          name="Library Section"
          component={LibraryStackScreen}
          options={{
            tabBarLabel: UIMessage.libraryMainMenuTitle,
            tabBarIcon: ({ color, size }) => <LibraryIcon color={color} />,
          }}
        />

        <Tab.Screen
          name="Menu Section"
          component={MenuStackScreen}
          options={{
            tabBarLabel: UIMessage.menuPageTitle,
            tabBarIcon: ({ color, size }) => <MenuIcon color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
