import SignupForm from "../components/form/SignupForm";
import SIGNUPIMG from "../assets/signup.png";
import { Container, Image } from "react-bootstrap";

const Signup = () => {
  return (
    <Container className="shadow rounder d-flex flex-md-row flex-column mt-md-5 p-3">
      <SignupForm />
      <Container className="img-container d-flex align-items-center mt-5 mt-md-0 p-5">
        <Image src={SIGNUPIMG} fluid />
      </Container>
    </Container>
  );
};

export default Signup;
