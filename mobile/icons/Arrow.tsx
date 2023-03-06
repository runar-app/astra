import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function RightArrowIcon({ color }: BaseIconProps) {
  return (
    <Svg width="8" height="14" viewBox="0 0 8 14" fill="none">
      <Path
        d="M7.71406 6.99828L1.70306 0.988281L0.289062 2.40228L4.88906 7.00228L0.289062 11.5953L1.70306 13.0093L7.71406 6.99828Z"
        fill={color || "#919191"}
      />
    </Svg>
  );
}
