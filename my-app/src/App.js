import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Routes from "./routes/routes.jsx"
import {UserProvider} from "./routes/context.jsx"

const Example = () => {
  return (
    <Router>
      <Routes/>
    </Router>   
  );
}

export default Example