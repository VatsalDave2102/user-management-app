import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authAction } from "../../store/authSlice";

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
  const userList = useSelector((state) => state.auth.userList);
  console.log(userList);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
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
  };

  const handleImageChange = (event, setFieldValue) => {
    setPreviewImage(null);
    event.preventDefault();
    let reader = new FileReader();
    const file = event.target.files[0];

    setFieldValue("image", file);

    if (file) {
      reader.onloadend = () => {
        console.log(file);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
            <Form.Group controlId="image" className="py-1 text-center">
              <Form.Label className="text-center">Photo +</Form.Label>
              <Field
                type="file"
                name="image"
                value={undefined}
                onChange={(e) => handleImageChange(e, setFieldValue)}
                as={Form.Control}
                className="d-none"
                accept="image/png, image/jpg, image/jpeg"
              />
              <div className="preview-container col-sm-12 col-lg-3 col-md-6 ">
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    thumbnail
                    className="mt-2"
                  />
                )}
              </div>

              <ErrorMessage
                name="image"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* Name field */}
            <Form.Group controlId="name" className="py-1">
              <Form.Label>Name</Form.Label>
              <Field
                type="text"
                name="name"
                as={Form.Control}
                style={{ backgroundColor: "#faebd8 " }}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* Email field */}
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

            {/* Phone field */}
            <Form.Group controlId="phone" className="py-1">
              <Form.Label>PhoneNo</Form.Label>
              <Field
                type="text"
                name="phone"
                as={Form.Control}
                style={{ backgroundColor: "#faebd8 " }}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-danger"
              />
            </Form.Group>

            {/* Password field */}
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

            {/* confirmPassword field */}
            <Form.Group controlId="confirmPassword" className="py-1">
              <Form.Label>Confirm Password</Form.Label>
              <Field
                type="password"
                name="confirmPassword"
                as={Form.Control}
                style={{ backgroundColor: "#faebd8 " }}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <div className="btn-container d-flex justify-content-start py-3">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? "Submitting..." : "Sign up"}
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
