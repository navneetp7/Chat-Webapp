import "./App.css";
import React from "react";
import Chatpage from "./Pages/Chatpage";
import Homepage from "./Pages/homepage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EmailPage from "./components/Authentication/EmailPage";
import OTPPage from "./components/Authentication/OTPPage";
import Signup from "./components/Authentication/Signup";


function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Homepage} exact />
        <Route path="/chat" component={Chatpage} />

        <Route path="/register/step1" exact component={EmailPage} />
        <Route path="/register/step2" component={OTPPage} />
        <Route path="/register/step3" component={Signup} />

      </div>
    </Router>
  );
}

export default App;
