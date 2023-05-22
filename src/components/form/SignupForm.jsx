import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authAction } from "../../store/authSlice";
import ImageField from "../input-fields/ImageField";
import InputField from "../input-fields/InputField";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  image: "",
};

const MAX_SIZE = 2 * 1024 * 1024;

const validationSchema = Yup.object({
  // name validation
  name: Yup.string().max(40, "Too Long!").required("Name is required!"),

  // email validation
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  // phone number validation
  phone: Yup.string()
    .matches(/^\d{10}$/, "Invalid mobile number")
    .required("Mobile number is required!"),

  // password validation
  password: Yup.string()
    .min(6, "Password must be atleast 6 characters long")
    .required("Password is required"),

  // confirm password validation
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Enter password again to confirm"),

  // image validation
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "Image size should be less than 2mb",
      (value) => value && value.size <= MAX_SIZE
    ),
});

const FormComp = () => {
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const userList = useSelector((state) => state.auth.userList);

  // to navigate user to home if he's already logged in
  useEffect(() => {
    if (!Object.keys(loggedInUser).length == 0) {
      navigate("/home");
    }
  });

  // to check if email is already used for any other account
  const checkUserExist = (values) => {
    let userExist = userList.find((user) => user.email == values.email);
    if (userExist !== undefined) {
      return userExist;
    } else {
      return false;
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (!checkUserExist(values)) {
      // saving new user data by dispatching
      dispatch(
        authAction.signup({
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          image: previewImage,
        })
      );
      setTimeout(() => {
        setSubmitting(false);
        navigate("/login");
      }, 1000);
    } else {
      setErrorMessage("User already exists, try logging in.");
      setSubmitting(false);
    }
  };

  // function to handle image input changes
  const handleImageChange = (event, setFieldValue) => {
    setPreviewImage(null);
    event.preventDefault();
    let reader = new FileReader();
    const file = event.target.files[0];
    setFieldValue("image", file);

    if (file) {
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // to reset form
  const handleReset = (resetForm) => {
    setPreviewImage("");
    resetForm();
  };

  return (
    <Container fluid="md">
      <h1 className="mb-3">Sign up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
      >
        {({
          handleSubmit,
          setFieldValue,
          resetForm,
          isSubmitting,
          isValid,
        }) => (
          <Form onSubmit={handleSubmit}>
            {/* Image field */}
            <ImageField
              handleImageChange={handleImageChange}
              setFieldValue={setFieldValue}
              previewImage={previewImage}
            />

            {/* Name field */}
            <InputField field="name" />

            {/* Email field */}
            <InputField field="email" />

            {/* Phone field */}
            <InputField field="phone" />

            {/* Password field */}
            <InputField field="password" />

            {/* Confirm password field */}
            <InputField field="confirmPassword" />

            {errorMessage && <div className="text-danger">{errorMessage}</div>}

            {/* Button container */}
            <div className="btn-container d-flex justify-content-start py-3">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? "Signing up..." : "Sign up"}
              </Button>
              <Button
                variant="danger"
                className="ms-5"
                type="reset"
                onClick={() => handleReset(resetForm)}
              >
                Reset
              </Button>
            </div>

            {/* Login link */}
            <p className="mt-1">
              Already a User? <Link to={"/login"}>Login here</Link>
            </p>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default FormComp;
