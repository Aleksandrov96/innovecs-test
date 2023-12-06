import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const NotificationContext = createContext({
  showNotification: () => {},
  hideNotification: () => {},
  notificationData: null,
  isOpen: false,
});

export function NotificationProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationData, setNotificationData] = useState(null);

  const showNotification = ({ severity, message }) => {
    setIsOpen(true);
    setNotificationData({ severity, message });
  };

  const hideNotification = () => {
    setIsOpen(false);
    setNotificationData(null);
  };

  const context = {
    showNotification,
    hideNotification,
    notificationData,
    setNotificationData,
    isOpen,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

NotificationProvider.propTypes = {
  children: PropTypes.element,
};

export default NotificationProvider;
