import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authAction } from "../../store/authSlice";

export default function NavbarComp() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)
  const path = location.pathname;
  let navLink = "/login";
  let navText = "Login";
  if (path == "/login") {
    navLink = "/signup";
    navText = "Signup";
  } else if (path == "/home") {
    navLink = "/login";
    navText = "Logout";
  }
  const handleNavClick = () => {
    if (navText == "Logout") {
      if (confirm("Are you sure want to logout?")) {
        dispatch(authAction.setLoggedInUser({}))
        navigate(navLink);
      }
    }else if(navText == 'Signup'){
      navigate(navLink)
    }else if(navText == 'Login'){
      navigate(navLink)
    }
  };
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>User Management App</Navbar.Brand>
        <Nav>
          <Nav.Link onClick={handleNavClick}>{navText}</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
