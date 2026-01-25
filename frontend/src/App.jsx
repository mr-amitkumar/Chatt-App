import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from "./components/Login";
import SignUp from './components/SignUp';
import Home from './components/Home';
import Navbar from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(() => {
    const loggedInUser = localStorage.getItem("user");
    return loggedInUser ? JSON.parse(loggedInUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="flex h-screen bg-black overflow-hidden">
        {user && <Navbar user={user} handleLogout={handleLogout} />}

        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/Login" />} 
            />
            <Route 
              path='/Login' 
              element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} 
            />
            <Route path='/SignUp' element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;