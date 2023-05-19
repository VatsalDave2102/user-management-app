// import { Button, Form } from "react-bootstrap"

import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import UserCard from "../components/usercard/UserCard";

const Home = () => {
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  console.log(loggedInUser);
  return (
    <>
      <Container fluid="md" className="d-flex justify-content-center mt-md-5">
        <UserCard />
      </Container>
    </>
  );
};

export default Home;
