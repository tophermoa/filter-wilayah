import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FilterWilayah from "./FilterWilayah";
import { filterPageLoader } from "./FilterWilayah.loader";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FilterWilayah />,
    loader: filterPageLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);