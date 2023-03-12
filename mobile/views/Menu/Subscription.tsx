import * as React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Background } from "../../components/Background/Background";
import { UIMessage } from "../../data/messages";
import { BaseText } from "../../components/Typography/BaseText";
import PrimaryButton from "../../components/Button/PrimaryButton";
import Purchases, { CustomerInfo, PurchasesPackage } from "react-native-purchases";
import AlertButton from "../../components/Button/AlertButton";
import { Colors } from "../../commonStyle";
import { SmallText } from "../../components/Typography/SmallText";
import LinkButton from "../../components/Button/LinkButton";
import { SmallLoaderPage } from "../../components/Loader/SmallLoaderPage";
import NetInfo from "@react-native-community/netinfo";

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
  const [loading, setLoading] = React.useState(false);

  const [purchasesPackages, setPurchasesPackages] = React.useState<PurchasesPackage[]>([]);

  const [isOnline, setIsOnline] = React.useState<boolean>(false);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(!!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const listener = (purchaserInfo: CustomerInfo) => {
      console.log("purchaserInfo from listener");
      console.log(purchaserInfo);
      setIsPayed(purchaserInfo.activeSubscriptions.length > 0);
    };
    Purchases.addCustomerInfoUpdateListener(listener);

    (async () => {
      try {
        const customerInfo = await Purchases.getCustomerInfo();
        setIsPayed(customerInfo.activeSubscriptions.length > 0);
        console.log("!!! CustomerInfo");
        console.log(customerInfo);
      } catch (e) {
        console.log("Error in fetching customer info");
        console.log(e);
      }
    })();

    return () => {
      Purchases.removeCustomerInfoUpdateListener(listener);
    };
  }, []);

  const paySubscription = async (packageItem: PurchasesPackage) => {
    setLoading(true);
    try {
      console.log("Pay  subscription: request started");

      await Purchases.purchasePackage(packageItem);
      console.log("Pay  subscription: request finished");
    } catch (e) {
      console.log("Error in paying subscription");
      console.log(e);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Offers: request started");
        const offerings = await Purchases.getOfferings();
        console.log("Offerings FROM global fetch: ");
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
          packages.push(item);
        });
        setPurchasesPackages(packages);
      } catch (e) {
        console.log("Error in fetching offers");
        console.log(e);
        Alert.alert(`Error in fetching offers`);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (!isOnline) {
    return <SmallLoaderPage loadingTextMessage={UIMessage.waitingForInternet} />;
  }

  if (loading) {
    return <SmallLoaderPage loadingTextMessage={UIMessage.loadingDataProgress} />;
  }

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
            <BaseText>{UIMessage.subscriptionPaymentCompleted}</BaseText>
          </>
        )}

        <LinkButton title={UIMessage.POCAndTerms} href="https://runar.app/privacy" />
      </View>
    </Background>
  );
}
