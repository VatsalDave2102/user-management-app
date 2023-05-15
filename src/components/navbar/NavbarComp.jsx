import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarComp() {
  return (
    <Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand>User Management App</Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to='signup'>Signup</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  );
}
