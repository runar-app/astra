import * as React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Background } from "../../components/Background/Background";
import { UIMessage } from "../../data/messages";
import { BaseText } from "../../components/Typography/BaseText";
import PrimaryButton from "../../components/Button/PrimaryButton";
import Purchases, { PurchasesPackage } from "react-native-purchases";
import AlertButton from "../../components/Button/AlertButton";
import { Colors } from "../../commonStyle";
import { SmallText } from "../../components/Typography/SmallText";
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
  const [purchasesPackages, setPurchasesPackages] = React.useState<PurchasesPackage[]>([]);

  const stopSubscription = async () => {
    try {
      console.log("Stop subscription: request started");
      setIsPayed(false);
    } catch (e) {
      console.log("Error in stopping subscription");
      console.log(e);
      Alert.alert(`Error in stopping subscription`);
    }
  };

  const syncSubscription = async () => {
    try {
      console.log("Sync subscription: request started");
      const purchaserInfo = await Purchases.getCustomerInfo();
      console.log("purchaserInfo");
      console.log(purchaserInfo);
      setIsPayed(purchaserInfo.activeSubscriptions.length > 0);
    } catch (e) {
      console.log("Error in syncing subscription");
      console.log(e);
      Alert.alert(`Error in syncing subscription`);
    }
  };

  const paySubscription = async (packageItem: PurchasesPackage) => {
    try {
      console.log("Pay  subscription: request started");
      console.log("Pay  subscription: request finished");
      console.log(packageItem);
      await Purchases.purchasePackage(packageItem);
      syncSubscription();
    } catch (e) {
      console.log("Error in paying subscription");
      console.log(e);
      Alert.alert(`Error in paying subscription`);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Offers: request started");
        const offerings = await Purchases.getOfferings();
        console.log("Offerings: ");
        console.log(JSON.stringify(offerings));
        console.log("Offers: request finished2");

        if (offerings.current === null) {
          console.log("offerings.current is null");
          return;
        }
        if (!offerings.current.availablePackages) {
          return;
        }
        const packages: PurchasesPackage[] = [];
        offerings.current.availablePackages.forEach((item) => {
          console.log("item");
          console.log(item);
          packages.push(item);
        });
        setPurchasesPackages(packages);
        syncSubscription();
      } catch (e) {
        console.log("Error in fetching offers");
        console.log(e);
        Alert.alert(`Error in fetching offers`);
      }
    };
    fetchData();
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
            {purchasesPackages.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.primary,
                    borderRadius: 10,
                    padding: 10,
                    display: "flex",
                    gap: 15,
                  }}
                >
                  <BaseText center>{item.product.description}</BaseText>
                  <SmallText center>{item.product.title}</SmallText>
                  <PrimaryButton
                    title={`${UIMessage.subscriptionPay} • ${item.product.priceString}`}
                    onPress={() => paySubscription(item)}
                  />
                </View>
              );
            })}
          </>
        )}

        {isPayed && (
          <>
            <AlertButton title={`${UIMessage.subscriptionStop}`} onPress={stopSubscription} />
          </>
        )}

        <LinkButton title={UIMessage.POCAndTerms} href="https://runar.app/privacy" />
      </View>
    </Background>
  );
}
