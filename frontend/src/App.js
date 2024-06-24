import "./App.css";
import React from "react";
import Chatpage from "./Pages/Chatpage";
import Homepage from "./Pages/Homepage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EmailPage from "./components/Authentication/EmailPage";
import OTPPage from "./components/Authentication/OTPPage";
import NamePage from "./components/Authentication/NamePage";
import Signup from "./components/Authentication/Signup";




function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Homepage} exact />
        <Route path="/chats" component={Chatpage} />

        <Route path="/e" exact component={EmailPage} />
        <Route path="/otp" component={OTPPage} />
        <Route path="/signup" component={Signup} />
      </div>
    </Router>
  );
}

export default App;
