import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Home } from './layouts/Home';
import { NotFound } from './layouts/NotFound';
import { Login } from './layouts/Login';
import { SignUp } from './layouts/SignUp';
import { PrivateRouter } from './layouts/PrivateRoutes'

export default function RoutesMap() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<PrivateRouter />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
    </Router>
  );
}
