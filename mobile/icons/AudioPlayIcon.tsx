import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function AudioPlayIcon({ color, size }: BaseIconProps) {
  return (
    <Svg width={size || 17} height={size || 17} viewBox="0 0 41 41" fill="none">
      <Path
        d="M20.3711 0.210938C9.33109 0.210938 0.371094 9.17094 0.371094 20.2109C0.371094 31.2509 9.33109 40.2109 20.3711 40.2109C31.4111 40.2109 40.3711 31.2509 40.3711 20.2109C40.3711 9.17094 31.4111 0.210938 20.3711 0.210938ZM16.3711 29.2109V11.2109L28.3711 20.2109L16.3711 29.2109Z"
        fill={color}
      />
    </Svg>
  );
}
