import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UIMessage } from "../../data/messages";
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
