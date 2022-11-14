import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import "./index.css";

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
