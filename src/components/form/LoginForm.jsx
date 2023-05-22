import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authAction } from "../../store/authSlice";
import InputField from "../input-fields/InputField";

// Initial values for form fields
const initialValues = {
  email: "",
  password: "",
};

// Yup validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is required"),
  password: Yup.string().required("Password is  required"),
});

const LoginForm = () => {
  const dipatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const userList = useSelector((state) => state.auth.userList);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const navigate = useNavigate();

  // to navigate user if he's already logged in
  useEffect(() => {
    if (!Object.keys(loggedInUser).length == 0) {
      navigate("/home");
    }
  });

  // checks if user is present in database or not
  const checkUserPresence = (values) => {
    let userPresence = userList.find(
      (user) => user.email == values.email && user.password == values.password
    );
    if (userPresence !== undefined) {
      return userPresence;
    } else {
      return false;
    }
  };

  // to handle login submission
  const handleSubmit = (values, { setSubmitting }) => {
    let currentUser = checkUserPresence(values);
    // if user is present then login else show error
    if (currentUser) {
      dipatch(authAction.setLoggedInUser(currentUser));
      setTimeout(() => {
        setSubmitting(false);
        navigate("/home");
      }, 1000);
    } else {
      setErrorMessage("Invalid email or password");
      setSubmitting(false);
    }
  };

  // to reset form
  const handleReset = (resetForm) => {
    resetForm();
  };

  return (
    <Container fluid="md">
      <h1 className="mb-3">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting, resetForm }) => (
          <Form onSubmit={handleSubmit}>

            {/* Email field */}
            <InputField field="email" />

            {/* Password field */}
            <InputField field="password" />

            {errorMessage && <div className="text-danger">{errorMessage}</div>}

            {/* Submit button container*/}
            <div className="btn-container d-flex justify-content-start py-3">
              <Button
                className="my-3"
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
              <Button
                variant="danger"
                className="ms-5 my-3"
                type="reset"
                onClick={() => handleReset(resetForm)}
              >
                Reset
              </Button>
            </div>

          {/* New user link */}
            <p className="mt-1">
              New User? <Link to={"/signup"}>Sign up here</Link>
            </p>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
