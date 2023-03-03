import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function HomeIcon({ color }: BaseIconProps) {
  return (
    <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
      <Path
        d="M6.28558 18.7733V15.7156C6.28558 14.9351 6.88943 14.3023 7.63431 14.3023H10.3572C10.7149 14.3023 11.058 14.4512 11.3109 14.7163C11.5638 14.9813 11.7059 15.3408 11.7059 15.7156V18.7733C11.7037 19.0978 11.8251 19.4099 12.0433 19.6402C12.2615 19.8705 12.5584 20 12.868 20H14.7257C15.5933 20.0023 16.4262 19.6428 17.0405 19.0008C17.6548 18.3588 18 17.487 18 16.5778V7.86686C18 7.13246 17.6893 6.43584 17.1517 5.96467L10.8322 0.675869C9.73294 -0.251438 8.1579 -0.221498 7.09142 0.746979L0.916117 5.96467C0.353123 6.42195 0.0166285 7.12064 0 7.86686V16.5689C0 18.4639 1.46594 20 3.27427 20H5.08954C5.73274 20 6.25547 19.4562 6.26013 18.7822L6.28558 18.7733Z"
        fill={color}
      />
    </Svg>
  );
}
