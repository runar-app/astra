import * as React from "react";
import { FlatList, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LibraryNode } from "../../../common/LibraryNode";
import { getLibraryNodes } from "../../services/library";
import { SmallLoaderPage } from "../../components/Loader/SmallLoaderPage";
import { LibraryListElement } from "../../components/LibraryListElement/LibraryListElement";
import { Background } from "../../components/Background/Background";
import { UIMessage } from "../../data/messages";
import NetInfo from "@react-native-community/netinfo";
import { LibraryNavigationProps, LibraryPage } from "./LibraryPage";

const LibraryStack = createNativeStackNavigator();

export function LibraryStackScreen() {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="Library"
        options={{
          title: UIMessage.libraryPageTitle,
        }}
        component={LibraryPage}
      />
      <LibraryStack.Screen
        name="LibraryPage"
        component={LibraryPage}
        options={({ route }) => {
          const pageProps = (route?.params as LibraryNavigationProps) || {};
          const pageLabel = pageProps.pageLabel || UIMessage.libraryPageTitle;

          return {
            title: pageLabel,
          };
        }}
      />
    </LibraryStack.Navigator>
  );
}
