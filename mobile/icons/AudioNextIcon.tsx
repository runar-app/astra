import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function AudioNextIcon({ color, size }: BaseIconProps) {
  return (
    <Svg width={size || 17} height={size || 17} viewBox="0 0 14 17" fill="none">
      <Path
        d="M11.3711 8.87794L1.14809 15.6929C1.0728 15.743 0.985324 15.7718 0.894985 15.7761C0.804646 15.7804 0.714827 15.7602 0.635093 15.7175C0.55536 15.6748 0.488698 15.6113 0.442208 15.5337C0.395718 15.4561 0.37114 15.3674 0.371094 15.2769V1.14494C0.37114 1.0545 0.395718 0.96576 0.442208 0.888181C0.488698 0.810602 0.55536 0.747086 0.635093 0.704397C0.714827 0.661708 0.804646 0.641445 0.894985 0.645767C0.985324 0.650088 1.0728 0.678833 1.14809 0.728938L11.3711 7.54394V1.21094C11.3711 0.945721 11.4764 0.691367 11.664 0.503831C11.8515 0.316295 12.1059 0.210937 12.3711 0.210938C12.6363 0.210937 12.8907 0.316295 13.0782 0.503831C13.2657 0.691367 13.3711 0.945721 13.3711 1.21094V15.2109C13.3711 15.4762 13.2657 15.7305 13.0782 15.918C12.8907 16.1056 12.6363 16.2109 12.3711 16.2109C12.1059 16.2109 11.8515 16.1056 11.664 15.918C11.4764 15.7305 11.3711 15.4762 11.3711 15.2109V8.87794Z"
        fill={color}
      />
    </Svg>
  );
}
