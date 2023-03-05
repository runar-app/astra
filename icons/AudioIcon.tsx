import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function AudioIcon({ color }: BaseIconProps) {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18">
      <Path
        d="M18 0H3.6V14.4H18V0ZM14.4 4.5H11.7V9.45C11.7 10.692 10.692 11.7 9.45 11.7C8.208 11.7 7.2 10.692 7.2 9.45C7.2 8.208 8.208 7.2 9.45 7.2C9.963 7.2 10.422 7.371 10.8 7.659V2.7H14.4V4.5ZM1.8 3.6H0V18H14.4V16.2H1.8V3.6Z"
        fill={color}
      />
    </Svg>
  );
}
