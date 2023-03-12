import * as React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Background } from "../../components/Background/Background";
import { MenuScreen } from "./Menu";
import { UIMessage } from "../../data/messages";
import { BaseText } from "../../components/Typography/BaseText";
import { SmallText } from "../../components/Typography/SmallText";
import { SubscriptionScreen } from "./Subscription";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    gap: 20,
    padding: 30,
    width: "94%",
    height: "100%",
  },
});

function AboutScreen() {
  return (
    <Background>
      <ScrollView>
        <View style={styles.page}>
          <BaseText>{UIMessage.aboutLine1}</BaseText>
          <SmallText>{UIMessage.aboutLine2}</SmallText>
          <SmallText>{UIMessage.aboutLine3}</SmallText>
          <SmallText>{UIMessage.aboutLine4}</SmallText>
        </View>
      </ScrollView>
    </Background>
  );
}

const MenuStack = createNativeStackNavigator();

export function MenuStackScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="Menu"
        options={{
          title: UIMessage.menuPageTitle,
        }}
        component={MenuScreen}
      />
      <MenuStack.Screen
        name="About"
        options={{
          title: UIMessage.aboutPageTitle,
        }}
        component={AboutScreen}
      />

      <MenuStack.Screen
        name="Subscription"
        options={{
          title: UIMessage.subscription,
        }}
        component={SubscriptionScreen}
      />
    </MenuStack.Navigator>
  );
}
