import { ErrorMessage, Field } from "formik";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const InputField = ({ field }) => {
  let label = "";
  let type = "";
  switch (field) {
    case "name":
      label = "Name";
      type = "text";
      break;
    case "email":
      label = "Email";
      type = "email";
      break;
    case "password":
      label = "Password";
      type = "password";
      break;
    case "confirmPassword":
      label = "Confirm Password";
      type = "password";
      break;
    case "phone":
      label = "Phone";
      type = "text";
      break;
    default:
      label = "";
      type = "";
      break;
  }
  return (
    <Form.Group controlId={field} className="py-1">
      <Form.Label>{label}</Form.Label>
      <Field
        type={type}
        name={field}
        as={Form.Control}
        style={{ backgroundColor: "#faebd8 " }}
      />
      <ErrorMessage name={field} component="div" className="text-danger" />
    </Form.Group>
  );
};
InputField.propTypes = {
  field: PropTypes.string,
};
export default InputField;
