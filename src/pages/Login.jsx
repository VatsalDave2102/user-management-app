import { Container } from "react-bootstrap";
import LoginForm from "../components/form/LoginForm";

const Login = () => {
  return (
    <Container
      className="mt-md-5 d-flex justify-content-center flex-column shadow p-3 rounded"
      fluid="md"
    >
      <LoginForm />
    </Container>
  );
};

export default Login;
