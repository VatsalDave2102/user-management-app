import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const ProtectedRoutes = ({ Element }) => {
  const navigate = useNavigate();
  let loggedInUser = useSelector((state) => state.auth.loggedInUser);
  useEffect(() => {
    if (Object.keys(loggedInUser).length == 0) {
      navigate("/login");
    }
  });
  return (
    <>
      <Element />
    </>
  );
};

ProtectedRoutes.propTypes = {
  Element: PropTypes.func,
};
export default ProtectedRoutes;
