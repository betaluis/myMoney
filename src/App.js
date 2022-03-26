import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

export default function App() {

  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {user && <Home />}
              {!user && <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {!user && <Login />}
              {user && <Redirect to="/" />}
            </Route>
            <Route path="/signup">
            {!user && <Signup />}
              {user && <Redirect to="/" />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  )
}