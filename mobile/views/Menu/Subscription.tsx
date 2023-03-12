import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Background } from "../../components/Background/Background";
import { UIMessage } from "../../data/messages";
import { BaseText } from "../../components/Typography/BaseText";
import PrimaryButton from "../../components/Button/PrimaryButton";
import SecondaryButton from "../../components/Button/SecondaryButton";
import Purchases from "react-native-purchases";
import AlertButton from "../../components/Button/AlertButton";
import LinkButton from "../../components/Button/LinkButton";

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
  const [isPayed, setIsPayed] = React.useState(false);
  const [currentSubscriptionType, setCurrentSubscriptionType] = React.useState("");

  const stopSubscription = async () => {
    try {
      console.log("Stop subscription: request started");
      setIsPayed(false);
      setCurrentSubscriptionType("");
    } catch (e) {
      console.log("Error in stopping subscription");
      console.log(e);
    }
  };

  const payWeeklySubscription = async () => {
    try {
      console.log("Pay weekly subscription: request started");
      console.log("Pay weekly subscription: request finished");
      setIsPayed(true);
      setCurrentSubscriptionType(UIMessage.weekly);
    } catch (e) {
      console.log("Error in paying weekly subscription");
      console.log(e);
    }
  };

  const payMonthlySubscription = async () => {
    try {
      console.log("Pay weekly subscription: request started");
      console.log("Pay weekly subscription: request finished");
      setIsPayed(true);
      setCurrentSubscriptionType(UIMessage.monthly);
    } catch (e) {
      console.log("Error in paying weekly subscription");
      console.log(e);
    }
  };

  const payYearlySubscription = async () => {
    try {
      console.log("Pay weekly subscription: request started");
      console.log("Pay weekly subscription: request finished");
      setIsPayed(true);
      setCurrentSubscriptionType(UIMessage.yearly);
    } catch (e) {
      console.log("Error in paying weekly subscription");
      console.log(e);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Offers: request started");
        const offerings = await Purchases.getOfferings();
        console.log("Offerings: ");
        console.log(offerings);
        console.log("Offers: request finished");
      } catch (e) {
        console.log("Error in fetching offers");
        console.log(e);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  return (
    <Background>
      <View style={styles.page}>
        <BaseText>{UIMessage.subscriptionMainInfo1}</BaseText>
        <BaseText>{UIMessage.subscriptionMainInfo2}</BaseText>
        <BaseText>{UIMessage.subscriptionMainInfo3}</BaseText>
        <BaseText>{UIMessage.subscriptionMainInfo4}</BaseText>
        {!isPayed && (
          <>
            <PrimaryButton
              title={`${UIMessage.subscriptionPay} - $7 ${UIMessage.monthly}`}
              onPress={payMonthlySubscription}
            />
            <SecondaryButton
              title={`${UIMessage.subscriptionPay} - $7 ${UIMessage.weekly}`}
              onPress={payWeeklySubscription}
            />
            <SecondaryButton
              title={`${UIMessage.subscriptionPay} - $7 ${UIMessage.yearly}`}
              onPress={payYearlySubscription}
            />
          </>
        )}

        {isPayed && (
          <>
            <AlertButton
              title={`${UIMessage.subscriptionStop} - ${currentSubscriptionType}`}
              onPress={stopSubscription}
            />
          </>
        )}

        <LinkButton title={UIMessage.POCAndTerms} href="https://runar.app/privacy" />
      </View>
    </Background>
  );
}
