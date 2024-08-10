import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

import { Home } from './layouts/Home';
import { Login } from './layouts/Login';
import { NotFound } from './layouts/NotFound';
import { PrivateRouter } from './layouts/PrivateRoutes'
import React from "react";
import { SignUp } from './layouts/SignUp';

export default function RoutesMap() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<PrivateRouter />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}
