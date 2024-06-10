import "./App.css";
import { Route } from "react-router-dom";

import homepage from "./Pages/homepage";
import ChatPage from "./Pages/ChatPage";




function App() {
  return (
    <div className="App">
      <Route path="/" component={homepage} exact />
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;
