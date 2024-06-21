import "./App.css";

import Chatpage from "./Pages/Chatpage";
import Homepage from "./Pages/Homepage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmailPage from "../components/Authentication/EmailPage";
import OTPPage from "../components/Authentication/OTPPage";
import NamePage from "../components/Authentication/NamePage";




function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />

      <Route path="/" element={<EmailPage />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route path="/name" element={<NamePage />} />
    </div>
  );
}

export default App;
