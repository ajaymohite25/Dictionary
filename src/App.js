import "./App.css";
import Navbar from "./component/navbar";
import Home from "./component/Home";
import Login from "./component/login";
import Register from "./component/register";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginContext from "./context/IsloginContext";

function App() {
  return (
    <div className="App">
      <Router>
        <LoginContext>
          <Navbar />
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </LoginContext>
      </Router>
    </div>
  );
}

export default App;
