/*****************************************************************************
 * Import
 *****************************************************************************/
import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

import Header from "./header";

/* Pages */
import Home from "screens/home";

/*****************************************************************************
 * Router
 *****************************************************************************/
export default function Router() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<Home />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const Layout = () => {
  return (
    <React.Fragment>
      {/* <Header /> */}
      <Outlet />
    </React.Fragment>
  );
}
