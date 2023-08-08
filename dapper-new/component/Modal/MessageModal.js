import {
  Modal,
  Pressable,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyledButton, StyledText } from "../Index";
import { appColors } from "../../config/theme";
import { MessageTypes } from "./MessageTypes";

export default function MessageModal({
  messageModalVisible,
  messageType,
  headerText,
  messageText,
  buttonText,
  altButtonText,
  onDismiss,
  onProceed,
  onReject = () => {},
  isLoading,
  isProceeding,
  isRejecting,
}) {
  let messageIconName,
    messageThemeColor = "";
  switch (messageType) {
    case MessageTypes.FAIL:
      messageIconName = "close";
      messageThemeColor = appColors.fail;
      break;
    case MessageTypes.SUCCESS:
      messageIconName = "check";
      messageThemeColor = appColors.success;
      break;
    case MessageTypes.WARNING:
      messageIconName = "alert-circle-outline";
      messageThemeColor = appColors.warning;
      break;
    case MessageTypes.DECISION:
      messageIconName = "alert-circle-check-outline";
      messageThemeColor = appColors.decision;
      break;
    case MessageTypes.DANGEROUS_DECISION:
      messageIconName = "alert-circle-check-outline";
      messageThemeColor = appColors.fail;
      break;

    default:
      messageIconName = "information-variant";
      messageThemeColor = appColors.info;
      break;
  }
  console.log("I am modal component", messageType, headerText, messageText);
  return (
    <Modal
      animationType="slide"
      visible={messageModalVisible}
      transparent={true}
    >
      <Pressable onPress={onDismiss} style={styles.container}>
        {isLoading && <ActivityIndicator size={70} color={appColors.white} />}
        {!isLoading && (
          <View style={styles.modalView}>
            <View
              style={[styles.modalIcon, { backgroundColor: messageThemeColor }]}
            >
              <MaterialCommunityIcons
                name={messageIconName}
                size={75}
                color={appColors.white}
              />
            </View>
            <View style={styles.modalContent}>
              <StyledText style={styles.headerText}>
                {headerText || "HEADER"}
              </StyledText>
              <StyledText style={styles.messageText}>
                {messageText || "MESSAGE"}
              </StyledText>
              {messageType === MessageTypes.DECISION ||
              messageType === MessageTypes.DANGEROUS_DECISION ? (
                <View style={styles.decisionRow}>
                  <StyledButton
                    style={[styles.decisionButton]}
                    onPress={onReject}
                    isLoading={isRejecting}
                  >
                    {altButtonText || (
                      <>
                        NO
                        <MaterialCommunityIcons
                          name="close"
                          size={16}
                          color={appColors.white}
                        />
                      </>
                    )}
                  </StyledButton>
                  <StyledButton
                    style={[
                      styles.decisionButton,
                      { backgroundColor: messageThemeColor },
                    ]}
                    onPress={onProceed}
                    isLoading={isProceeding}
                  >
                    {buttonText || (
                      <>
                        YES
                        <MaterialCommunityIcons
                          name="check"
                          size={16}
                          color={appColors.white}
                        />
                      </>
                    )}
                  </StyledButton>
                </View>
              ) : (
                <StyledButton
                  style={{ backgroundColor: messageThemeColor }}
                  onPress={onProceed}
                  isLoading={isProceeding}
                >
                  {buttonText || "OKAY"}
                </StyledButton>
              )}
            </View>
          </View>
        )}
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    backgroundColor: appColors.secondary,
    width: "100%",
    alignItems: "center",
    paddingTop: 45,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  modalIcon: {
    backgroundColor: appColors.neutral,
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -50,
    shadowOffset: { width: 0, height: 2 },
  },
  modalContent: {
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    textTransform: "uppercase",
  },
  messageText: {
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins_400Regular",
  },
  decisionRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  decisionButton: {
    width: "auto",
  },
});
