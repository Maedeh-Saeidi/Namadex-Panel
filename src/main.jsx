import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import SectionList from "./pages/SectionList";
import AppLayout from "./pages/AppLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Login />} />
      <Route path="dashboard" element={<SectionList />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
