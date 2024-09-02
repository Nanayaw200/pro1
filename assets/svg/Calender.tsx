import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

type Props = {};

const CalenderIcon = (props: Props) => {
  return (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <Path
        d="M0 19.0001C0.00158786 20.3257 0.528882 21.5965 1.46622 22.5339C2.40356 23.4712 3.6744 23.9985 5 24.0001H19C20.3256 23.9985 21.5964 23.4712 22.5338 22.5339C23.4711 21.5965 23.9984 20.3257 24 19.0001V10.0001H0V19.0001ZM17 14.5001C17.2967 14.5001 17.5867 14.588 17.8334 14.7529C18.08 14.9177 18.2723 15.152 18.3858 15.4261C18.4993 15.7001 18.5291 16.0017 18.4712 16.2927C18.4133 16.5837 18.2704 16.851 18.0607 17.0607C17.8509 17.2705 17.5836 17.4134 17.2926 17.4713C17.0017 17.5291 16.7001 17.4994 16.426 17.3859C16.1519 17.2724 15.9176 17.0801 15.7528 16.8334C15.588 16.5868 15.5 16.2967 15.5 16.0001C15.5 15.6023 15.658 15.2207 15.9393 14.9394C16.2206 14.6581 16.6022 14.5001 17 14.5001ZM12 14.5001C12.2967 14.5001 12.5867 14.588 12.8334 14.7529C13.08 14.9177 13.2723 15.152 13.3858 15.4261C13.4994 15.7001 13.5291 16.0017 13.4712 16.2927C13.4133 16.5837 13.2704 16.851 13.0607 17.0607C12.8509 17.2705 12.5836 17.4134 12.2926 17.4713C12.0017 17.5291 11.7001 17.4994 11.426 17.3859C11.1519 17.2724 10.9176 17.0801 10.7528 16.8334C10.588 16.5868 10.5 16.2967 10.5 16.0001C10.5 15.6023 10.658 15.2207 10.9393 14.9394C11.2206 14.6581 11.6022 14.5001 12 14.5001ZM7 14.5001C7.29667 14.5001 7.58668 14.588 7.83336 14.7529C8.08003 14.9177 8.27229 15.152 8.38582 15.4261C8.49935 15.7001 8.52906 16.0017 8.47118 16.2927C8.4133 16.5837 8.27044 16.851 8.06066 17.0607C7.85088 17.2705 7.58361 17.4134 7.29264 17.4713C7.00166 17.5291 6.70006 17.4994 6.42597 17.3859C6.15189 17.2724 5.91762 17.0801 5.7528 16.8334C5.58797 16.5868 5.5 16.2967 5.5 16.0001C5.5 15.6023 5.65804 15.2207 5.93934 14.9394C6.22064 14.6581 6.60218 14.5001 7 14.5001V14.5001Z"
        fill="#707070"
      />
      <Path
        d="M19 2H18V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0C16.7348 0 16.4804 0.105357 16.2929 0.292893C16.1054 0.48043 16 0.734784 16 1V2H8V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V2H5C3.6744 2.00159 2.40356 2.52888 1.46622 3.46622C0.528882 4.40356 0.00158786 5.6744 0 7L0 8H24V7C23.9984 5.6744 23.4711 4.40356 22.5338 3.46622C21.5964 2.52888 20.3256 2.00159 19 2V2Z"
        fill="#707070"
      />
    </Svg>
  );
};

export default CalenderIcon;