import FormComp from "../components/form/FormComp";
import SIGNUPIMG from "../assets/signup.png";
import { Container, Image } from "react-bootstrap";

const Signup = () => {
  return (
    <Container className="d-flex flex-md-row flex-column mt-md-5">
      <FormComp />
      <Container className="img-container d-flex align-items-center mt-5 mt-md-0">
        <Image src={SIGNUPIMG} fluid />
      </Container>
    </Container>
  );
};

export default Signup;
