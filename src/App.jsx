import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Root from "./pages/Root";
import Error from "./pages/Error";
import Welcome from "./components/welcome/Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error/>,
    children: [
      {path: '', element:<Welcome/>},
      { path: "home", element: <Home /> },
      { path: "signup", element: <Signup />, index:true},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
