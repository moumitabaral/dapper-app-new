import { StyleSheet, Text, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyledText } from "../Index";
import { appColors } from "../../config/theme";

const StyledButton = ({
  children,
  style,
  textStyle,
  isLoading,
  disabled,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      disabled={disabled || isLoading}
    >
      <StyledText style={[styles.buttonText, textStyle]}>
        {isLoading ? <ActivityIndicator size="small" /> : children}
      </StyledText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.neutral,
    width: "100%",
    borderRadius: 8,
    marginVertical: 9,
  },
  buttonText: {
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    textAlign: "center",
    padding: 20,
  },
});

export default StyledButton;
