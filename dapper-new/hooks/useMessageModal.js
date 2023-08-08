import { useState } from "react";
import { MessageTypes } from "../component/Modal/MessageTypes";

const useMessageModal = () => {
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

  return {
    messageModalState,
    hideModal,
    showMessageModal,
    setIsLoading,
    setIsProceeding,
    setIsRejecting,
  };
};

export default useMessageModal;
