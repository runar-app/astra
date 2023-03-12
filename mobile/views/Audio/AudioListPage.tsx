import * as React from "react";
import { FlatList, View } from "react-native";
import { AudioBook } from "../../../common/AudioBook";
import { getCurrentPlayedAudio, getListOfAudios, playTrack } from "../../services/audios";
import { SmallLoaderPage } from "../../components/Loader/SmallLoaderPage";
import { AudioListElement } from "../../components/AudioListElement/AudioListElement";
import { Background } from "../../components/Background/Background";
import { UIMessage } from "../../data/messages";
import NetInfo from "@react-native-community/netinfo";
import { useTrackPlayerEvents, Event } from "react-native-track-player";
import { BaseText } from "../../components/Typography/BaseText";
import { SmallText } from "../../components/Typography/SmallText";
import PrimaryButton from "../../components/Button/PrimaryButton";
import Purchases, { CustomerInfo } from "react-native-purchases";

export function AudioListPage({ navigation }: any) {
  const [audios, setAudios] = React.useState<AudioBook[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isOnline, setIsOnline] = React.useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = React.useState<AudioBook>();
  const [isPayed, setIsPayed] = React.useState(false);

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

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type !== Event.PlaybackTrackChanged || event.nextTrack === null) {
      return;
    }
    const currentTrack = await getCurrentPlayedAudio();
    setCurrentTrack(currentTrack);
  });

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(!!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (!isOnline) {
      return;
    }
    setLoading(true);
    (async () => {
      const audios = await getListOfAudios();
      setAudios(audios);
      setLoading(false);
    })();
  }, [isOnline]);

  if (!isOnline) {
    return <SmallLoaderPage loadingTextMessage={UIMessage.waitingForInternet} />;
  }

  if (loading) {
    return <SmallLoaderPage loadingTextMessage={UIMessage.loadingDataProgress} />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 0,
        alignItems: "center",
      }}
    >
      <Background>
        {audios.length === 0 && <BaseText>{UIMessage.noAudiosFound}</BaseText>}
        {!isPayed && (
          <View style={{ padding: 10, paddingTop: 20 }}>
            <PrimaryButton
              title={UIMessage.getMoreAudios}
              onPress={async () => {
                navigation.navigate("Menu Section", {
                  screen: "Subscription",
                });
              }}
            />
          </View>
        )}
        <FlatList
          data={audios.filter((audio, index) => isPayed || index < 5)}
          renderItem={({ item, index }) => {
            const isNeedToShowCategory =
              index === 0 || audios[index - 1].category !== item.category;

            const isPlaying = currentTrack?._id === item._id;
            const onPressHandler = async () => {
              if (!isPlaying) {
                await playTrack(item._id);
              }
              navigation.push("MediaPlayerScreen");
            };

            return (
              <View key={item._id}>
                {isNeedToShowCategory && (
                  <View style={{ padding: 20 }}>
                    <SmallText>{item.category}</SmallText>
                  </View>
                )}
                <AudioListElement active={isPlaying} audioData={item} onPress={onPressHandler} />
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
          style={{ width: "100%" }}
        />
      </Background>
    </View>
  );
}
