import { Path, Svg } from "react-native-svg";

const ProfileIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 48 48" fill="none">
      <Path
        d="M40 42V38C40 35.8783 39.1571 33.8434 37.6569 32.3431C36.1566 30.8429 34.1217 30 32 30H16C13.8783 30 11.8434 30.8429 10.3431 32.3431C8.84285 33.8434 8 35.8783 8 38V42M32 14C32 18.4183 28.4183 22 24 22C19.5817 22 16 18.4183 16 14C16 9.58172 19.5817 6 24 6C28.4183 6 32 9.58172 32 14Z"
        stroke="#1E1E1E"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ProfileIcon;