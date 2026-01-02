import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import SignUp from './components/SignUp';
// import Home from './components/Home'; // We can create this next!

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect empty path to Login or a Home page */}
        <Route path="/" element={<Navigate to="/Login" />} />
        
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        
        {/* This will be the page users see AFTER logging in */}
        {/* <Route path='/Home' element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;