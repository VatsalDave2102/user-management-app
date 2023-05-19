import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="bg-light p-5 rounded-lg m-3 text-center">
      <h1 className="display-4">Welcome, User</h1>
      <p className="lead">Please sign up</p>
      <Button as={Link} to="signup" variant="primary">
        Sign Up
      </Button>
    </div>
  );
};

export default Welcome;
