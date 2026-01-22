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
    <div className="flex items-center h-screen bg-violet-700 justify-center">
      <div className="flex flex-col bg-white w-[350px] p-6 justify-center items-center shadow-2xl rounded-md">
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="firstname"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="border-2 p-2 rounded-md border-blue-400 w-[250px] outline-blue-600 font-semibold"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="border-2 p-2 rounded-md border-blue-400 w-[250px] outline-blue-600 font-semibold"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="border-2 p-2 rounded-md border-blue-400 w-[250px] outline-blue-600 font-semibold"
          />
          <button type="submit" className="bg-blue-700 p-2 text-white font-semibold hover:bg-blue-600 transition-all rounded-md">
            Signup
          </button>
        </form>
        
        <p className="flex text-sm gap-2 font-semibold mt-4">
          already have account ?
          <Link to="/Login" className="hover:underline text-blue-500">
            Login Here
          </Link>
        </p>

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