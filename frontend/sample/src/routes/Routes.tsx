import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home";
import HouseSalesByPostcode from "../pages/HouseSalesByPostcode";
import HouseSaleInfo from "../pages/HouseSaleInfo";

//This route setup enables navigation within the application, rendering different components based on the current URL path.
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "/houseSalesByPostcode/:postcode",
        element: <HouseSalesByPostcode />,
      },
      {
        path: "/houseSalesByPostcode/selected/:selectedArea",
        element: <HouseSalesByPostcode />,
      },
      {
        path: "/houseSaleInfo/:_id",
        element: <HouseSaleInfo />,
      },
    ],
  },
]);
