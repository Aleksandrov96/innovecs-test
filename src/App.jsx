import { Container } from "@mui/material";
import LoginForm from "./components/login-form/login-form";
import "./App.scss";

function App() {
  return (
    <Container className="app" maxWidth={false}>
      <LoginForm />
    </Container>
  );
}

export default App;
