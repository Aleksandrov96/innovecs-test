import { useState } from "react";
import { Container } from "@mui/material";
import LoginForm from "./components/login-form/login-form";
import Notification from "./components/notification/notification";
import NotificationProvider from "./context/notification-context";
import "./App.scss";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <NotificationProvider>
      <Container className="app" maxWidth={false}>
        <LoginForm
          loading={loading}
          setLoading={setLoading}
        />
        <Notification
        />
      </Container>
    </NotificationProvider>
  );
}

export default App;
