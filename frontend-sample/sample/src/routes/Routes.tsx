import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home";
import Something from "../pages/HouseSalesByPostcode";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/houseSalesByPostcode/:postcode", element: <Something /> },
    ],
  },
]);
