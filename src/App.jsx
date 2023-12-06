import { Container } from "@mui/material";
import LoginForm from "./components/login-form/login-form";
import Notification from "./components/notification/notification";
import NotificationProvider from "./context/notification-context";
import "./App.scss";

function App() {
  return (
    <NotificationProvider>
      <Container className="app" maxWidth={false}>
        <LoginForm />
        <Notification />
      </Container>
    </NotificationProvider>
  );
}

export default App;
