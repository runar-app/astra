import * as React from "react";
import { SmallLoaderPage } from "../../components/Loader/SmallLoaderPage";
import { UIMessage } from "../../data/messages";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import NetInfo from "@react-native-community/netinfo";

export function MediaPlayerPage() {
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
    if (!isOnline) {
      return;
    }
  }, [isOnline]);

  if (!isOnline) {
    return <SmallLoaderPage loadingTextMessage={UIMessage.waitingForInternet} />;
  }

  return <MusicPlayer />;
}
