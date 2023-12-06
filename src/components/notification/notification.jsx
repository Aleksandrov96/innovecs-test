import { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { NotificationContext } from "../../context/notification-context";

function Notification() {
  const { hideNotification, isOpen, notificationData } = useContext(NotificationContext);

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={3000}
      onClose={hideNotification}
      message={notificationData?.message}
    >
      <Alert
        onClose={hideNotification}
        severity={notificationData?.severity}
        sx={{ width: "100%" }}
      >
        {notificationData?.message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
