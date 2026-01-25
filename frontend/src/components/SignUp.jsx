import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); 
    try {
      const response = await axios.post(
        "http://localhost:8000/signup",
        formData
      );
      setIsError(false);
      setMessage(response.data.message);
      
      // Auto-redirect to Login after 2 seconds on success
      setTimeout(() => navigate("/Login"), 2000);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex items-center h-screen bg-black justify-center">
      <div className="mr-48">
        <h1 className="text-6xl text-white font-bold mb-1">Welcome</h1>
        <h1 className="text-5xl font-bold mb-1 text-blue-600">To</h1>
        <h1 className="text-4xl text-white font-bold mb-6">Y Chat</h1>
      </div>
      <div className="flex flex-col bg-transparent text-white p-6 justify-center items-center shadow-2xl rounded-md">
        <h1 className="text-4xl font-bold">Register Here</h1>
        <h1 className="text-3xl font-bold">To Connect.</h1>
        <h1 className="text-5xl  mb-3">And Find Your Heart</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="firstname"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="border-2 px-4 py-3 rounded-md border-gray-800 w-[350px] text-white focus:border-blue-600 font-semibold transition-all bg-transparent outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="border-2 px-4 py-3 rounded-md border-gray-800 w-[350px] text-white focus:border-blue-600 font-semibold transition-all bg-transparent outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="border-2 px-4 py-3 rounded-md border-gray-800 w-[350px] text-white focus:border-blue-600 font-semibold transition-all mb-3 bg-transparent outline-none"
          />
          <button type="submit" className="bg-blue-700 p-2 text-white font-semibold hover:bg-blue-600 transition-all rounded-md">
            Signup
          </button>
        </form>
        <div className="text-gray-500 text-sm flex flex-col">
          <p>
            By clicking signup you will agree with
            <strong className="text-blue-500"> terms of services</strong> and
          </p>
          <p>
            <strong className="text-blue-500">privacy policy</strong>, along
            with <strong className="text-blue-500">cokkies</strong>
          </p>
        </div>
        
        <p className="text-gray-500 mt-3 text-xl mb-2">
          already have account ?
        </p>
          <Link to="/Login" className="text-white border-2 border-gray-800 rounded-md p-2 w-[350px] text-center">
            Login Here
          </Link>

        {message && (
          <p className={`mt-3 text-sm font-bold text-center ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;