import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Background } from "../../components/Background/Background";
import { UIMessage } from "../../data/messages";
import { BaseText } from "../../components/Typography/BaseText";
import PrimaryButton from "../../components/Button/PrimaryButton";
import SecondaryButton from "../../components/Button/SecondaryButton";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    gap: 20,
    padding: 30,
    width: "100%",
    height: "100%",
  },
});

export function SubscriptionScreen() {
  return (
    <Background>
      <View style={styles.page}>
        <BaseText>{UIMessage.subscriptionMainInfo1}</BaseText>
        <BaseText>{UIMessage.subscriptionMainInfo2}</BaseText>
        <BaseText>{UIMessage.subscriptionMainInfo3}</BaseText>
        <BaseText>{UIMessage.subscriptionMainInfo4}</BaseText>
        <PrimaryButton
          title={UIMessage.subscriptionPay + " - $7 monthly"}
          onPress={() => console.log("Subscribe")}
        />
        <SecondaryButton
          title={UIMessage.subscriptionPay + " - $2 weekly"}
          onPress={() => console.log("Subscribe")}
        />
        <SecondaryButton
          title={UIMessage.subscriptionPay + " - $32 yearly"}
          onPress={() => console.log("Subscribe")}
        />
      </View>
    </Background>
  );
}
