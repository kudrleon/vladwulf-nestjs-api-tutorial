import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import { FirstLogin } from "./pages/FirstLogin"
import { Home } from "./pages/Home"
import { LoggedInLayout } from "./layouts/loggedinLayout"
import { Login } from "./pages/Login"
import { NotFound } from "./pages/NotFound"
import { PrivateRouter } from "./pages/PrivateRoutes"
import { Request } from "./pages/Request"
import { SignUp } from "./pages/SignUp"

export default function RoutesMap() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PrivateRouter />}>
          <Route element={<LoggedInLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/new-request" element={<Request />} />
            <Route path="/request/:id" element={<Request />} />
          </Route>
          <Route path="/first-login" element={<FirstLogin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
