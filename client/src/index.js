import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import '@popperjs/core/dist/umd/popper.min.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './App';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Planner from './components/planner/Planner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='planner' element={<Planner />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
