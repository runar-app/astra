import * as React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Background } from "../../components/Background/Background";
import { MenuScreen } from "./Menu";
import { UIMessage } from "../../data/messages";
import { BaseText } from "../../components/Typography/BaseText";
import { SmallText } from "../../components/Typography/SmallText";

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
          <BaseText>Версия приложения 1.0</BaseText>
          <SmallText>
            Runar Astra — это приложение с викинг-помощником, чат-ботом ассистентом, который может
            ответить на любой вопрос о скандинавской мифологии.
          </SmallText>
          <SmallText>Помощник обладает огромным знанием о богах, героях и сказаниях. </SmallText>
          <SmallText>
            Приложение также содержит аудиосказки о битвах богов и приключениях викингов.{" "}
          </SmallText>
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
      <MenuStack.Screen name="About" component={AboutScreen} />
    </MenuStack.Navigator>
  );
}
