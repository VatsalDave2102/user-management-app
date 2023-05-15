import { Container } from "react-bootstrap";
import NavbarComp from "../components/navbar/NavbarComp";

const Error = () => {
  return <>
  <NavbarComp/>
  <Container fluid="md" className="p-5">
    <h1 className="text-center">Error 404</h1>
    <h3 className="text-center">Page not found</h3>
  </Container>
  </>;
};

export default Error;
