import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="bg-light p-5 rounded-lg m-3 text-center">
      <h1 className="display-4">Welcome, User</h1>
      <div className="auth-btn-container d-flex justify-content-center">
        <div className="">
          <p className="lead">Please sign up.</p>
          <Button as={Link} to="signup" variant="primary">
            Sign Up
          </Button>
        </div>
        <div className="vr mx-3" />
        <div className="">
          <p className="lead">Already a user? Login here.</p>
          <Button as={Link} to="login" variant="primary">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
