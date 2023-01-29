import Registration from "./pages/Registration";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import RootLayout from "./components/RootLayout";
import { Message } from "@mui/icons-material";

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Registration />} />

      <Route path="/login" element={<SignIn />} />
      <Route path="/home" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="message" element={<Message />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
