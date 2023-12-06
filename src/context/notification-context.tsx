import { createContext, useState } from "react";

type NotificationProviderProps = {
  children: React.ReactNode;
};

interface Notification {
  severity: string;
  message: string;
}

export const NotificationContext = createContext<{
  showNotification: (notification: {
    severity: string;
    message: string;
  }) => void;
  hideNotification: () => void;
  notificationData: { severity: string; message: string } | null;
  isOpen: boolean;
}>({
  showNotification: () => {},
  hideNotification: () => {},
  notificationData: null,
  isOpen: false,
});

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notificationData, setNotificationData] = useState<Notification | null>(
    null
  );

  const showNotification = ({ severity, message }: Notification) => {
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
};

export default NotificationProvider;
