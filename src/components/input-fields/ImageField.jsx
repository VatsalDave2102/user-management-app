import { ErrorMessage, Field } from "formik";
import { Form, Image } from "react-bootstrap";
import PropTypes from "prop-types";

const ImageField = ({ previewImage, handleImageChange, setFieldValue }) => {
  return (
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

      {/* Image preview element */}
      <div className="preview-container col-sm-12 col-lg-3 col-md-6 ">
        {previewImage && (
          <Image src={previewImage} alt="Preview" thumbnail className="mt-2" />
        )}
      </div>

      <ErrorMessage name="image" component="div" className="text-danger" />
    </Form.Group>
  );
};
ImageField.propTypes = {
  previewImage: PropTypes.string,
  handleImageChange: PropTypes.func,
  setFieldValue: PropTypes.func,
};
export default ImageField;
