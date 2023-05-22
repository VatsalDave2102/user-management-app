import { Outlet } from "react-router-dom";
import NavbarComp from "../components/navbar/NavbarComp";

const Root = () => {
  return (
    <>
      <NavbarComp />
      <Outlet />
    </>
  );
};

export default Root;
