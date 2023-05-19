// import { Button, Form } from "react-bootstrap"

import { Container } from "react-bootstrap";
import UserCard from "../components/usercard/UserCard";

const Home = () => {
  return (
    <>
      <Container fluid="md" className="d-flex justify-content-center mt-md-5">
        <UserCard />
      </Container>
    </>
  );
};

export default Home;
