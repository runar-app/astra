import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UIMessage } from "../../data/messages";
import { MediaPlayerPage } from "./MediaPlayerPage";
import { AudioListPage } from "./AudioListPage";

const AudioStack = createNativeStackNavigator();

export function AudioStackScreen() {
  return (
    <AudioStack.Navigator>
      <AudioStack.Screen
        name="Audio"
        options={{
          title: UIMessage.audioPageTitle,
        }}
        component={AudioListPage}
      />

      <AudioStack.Screen
        name="MediaPlayerScreen"
        options={{
          title: UIMessage.audioPageTitle,
        }}
        component={MediaPlayerPage}
      />
    </AudioStack.Navigator>
  );
}
