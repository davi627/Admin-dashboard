import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Sign from './Components/Sign/Sign';
import Reset from './Components/Reset/Reset';
import Admindashboard from './Components/Dashboard/Admindashboard';
import Forgotpassword from './Components/Forgotpassword/Forgotpassword';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/forgot" element={<Forgotpassword />} />
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/reset/:token" element={<Reset />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
