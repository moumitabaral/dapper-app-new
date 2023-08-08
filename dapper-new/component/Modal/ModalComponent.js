import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MessageModal, StyledButton, StyledText } from "../Index";
import { MessageTypes } from "./MessageTypes";

function ModalComponent(props) {
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [requiredMessageModalProps, setRequiredMessageModalProps] = useState({
    messageType: MessageTypes.INFO,
    headerText: "",
    messageText: "",
    onDismiss: () => {},
    onProceed: () => {},
  });
  const [extraMessageModalProps, setExtraMessageModalProps] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isProceeding, setIsProceeding] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const hideModal = () => {
    setMessageModalVisible(false);
  };
  const showMessageModal = (
    messageType,
    headerText,
    messageText,
    onProceed,
    extraProps
  ) => {
    setMessageModalVisible(true);
    setRequiredMessageModalProps({
      messageType,
      headerText,
      messageText,
      onProceed,
      onDismiss: hideModal,
    });
    console.log("I am modal", messageType, headerText, messageText);
    setExtraMessageModalProps(extraProps);
  };

  const messageModalState = {
    messageModalVisible,
    ...requiredMessageModalProps,
    ...extraMessageModalProps,
    isLoading,
    isProceeding,
    isRejecting,
  };

  const handleProceed = () => {
    console.log("Proceeding");
    hideModal();
  };
  return (
    <View style={styles.modalWrapper}>
      <StyledText>I am here</StyledText>
      <StyledButton
        onPress={() => {
          showMessageModal(
            MessageTypes.FAIL,
            "LOGIN FAILED",
            "No Account with your email address. Please Sign uo first.",
            handleProceed
          );
        }}
      >
        <StyledText>Fail</StyledText>
      </StyledButton>
      <MessageModal {...messageModalState} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ModalComponent;
