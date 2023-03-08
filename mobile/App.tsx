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
import TrackPlayer, { Capability } from "react-native-track-player";
import { getListOfAudios } from "./services/audios";
import { getLibraryNodes } from "./services/library";

const Tab = createBottomTabNavigator();

export default function App() {
  React.useEffect(() => {
    console.log("Init App");
    (async () => {
      console.log("Init: Before Player init");
      getListOfAudios();
      getLibraryNodes();
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SeekTo,
            Capability.Stop,
            Capability.SkipToPrevious,
          ],
          compactCapabilities: [Capability.Play, Capability.Stop, Capability.Pause],
        });
      } catch (e) {
        console.log("Init: Error in TrackPlayer setupPlayer: ", e);
      }
      console.log("Init: After Player init");
    })();

    return () => {
      console.log("Reset: Before");

      try {
        TrackPlayer.reset();
      } catch (e) {
        console.log("Error in TrackPlayer.reset: ", e);
      }
      console.log("Reset: After");
    };
  }, []);

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
