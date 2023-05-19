import { ErrorMessage, Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authAction } from "../../store/authSlice";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is required"),
  password: Yup.string().required("Password is  required"),
});

const LoginForm = () => {
  const dipatch = useDispatch();
  const userList = useSelector((state) => state.auth.userList);
  console.log(userList);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const loggedInUser = useSelector(state=> state.auth.loggedInUser)

  useEffect(()=>{
    if(!Object.keys(loggedInUser).length == 0){
        navigate('/home')
    }
  })
  
  const checkUserPresence = (values) => {
    console.log(values);
    let userPresence = userList.find(
      (user) => user.email == values.email && user.password == values.password
    );
    if (userPresence !== undefined) {
      return userPresence;
    } else {
      return false;
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    let currentUser = checkUserPresence(values);
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

  return (
    <Container fluid="md">
      <h1 className="mb-3">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="py-1">
              <Form.Label>Email</Form.Label>
              <Field
                type="email"
                name="email"
                as={Form.Control}
                style={{ backgroundColor: "#faebd8 " }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            <Form.Group controlId="password" className="py-1">
              <Form.Label>Password</Form.Label>
              <Field
                type="password"
                name="password"
                as={Form.Control}
                style={{ backgroundColor: "#faebd8 " }}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {errorMessage && <div className="text-danger">{errorMessage}</div>}
            <Button
              className="my-3"
              variant="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
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
