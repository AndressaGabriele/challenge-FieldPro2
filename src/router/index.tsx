import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Home } from "page/Home";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/*"
        element={
          <>
            <p>Not Found</p>
          </>
        }
      ></Route>
    </>
  )
);
