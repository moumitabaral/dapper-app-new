import { Text } from "react-native";

const StyledText = ({ children, style }) => {
  return <Text style={style}>{children}</Text>;
};

export default StyledText;
