import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import CreateJob from "../Pages/CreateJob";
import MineJob from "../Pages/MineJob";
import Login from "../components/Login";
import Signup from "../components/Signup";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {path: "/", element: <Home/> },
        {
          path: "/post-job",
          element:<CreateJob/>
        },
        {
          path: "/my-job",
          element:<MineJob/>
        },
        {
          path: "/login",
          element:<Login/>
        },
        {
          path: "/sign-up",
          element:<Signup/>
        },
      ],
    },
  ]);

  export default router;
