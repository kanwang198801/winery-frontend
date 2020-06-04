import React from 'react';
import Routes from './routes';
import "./App.css";
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => (
  <Router>
    <Routes />
  </Router>
);

export default App;