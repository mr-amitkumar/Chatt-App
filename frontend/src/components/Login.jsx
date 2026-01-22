import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import axios from "axios";

const Login = () => {
  const navigate = useNavigate(); // Hook for redirection
  const [credient, setCredient] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false); // Added isError state

  const onhandleChange = (e) => {
    setCredient({ ...credient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message on new attempt
    setIsError(false); // Reset error state

    try {
      const response = await axios.post(
        "http://localhost:8000/Login",
        credient
      );

      setIsError(false);
      setMessage(response.data.message);
      
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log("Login Success:", response.data.user);

      // Redirect to home/dashboard after 1.5 seconds
      setTimeout(() => navigate("/"), 1500); 

    } catch (error) {
      setIsError(true);
      // Display error from Flask or default message
      setMessage(error.response?.data?.error || "Invalid login credentials");
    }
  };

  return (
    <div className="flex align-middle items-center h-screen bg-violet-700 justify-center">
      <div className="flex flex-col bg-white w-[400px] h-[450px] justify-center items-center shadow-2xl rounded-md">
        <h1 className="text-5xl font-bold mb-1">Welcome</h1>
        <h1 className="text-4xl font-bold mb-1 text-blue-600">To</h1>
        <h1 className="text-3xl font-bold mb-6">The XYZ Chat</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            name="email"
            onChange={onhandleChange}
            placeholder="Email"
            required
            autoComplete="off"
            className="border-2 p-2 rounded-md border-blue-400 w-[250px] text-black outline-blue-600 font-semibold transition-all"
          />
          <input
            type="password"
            name="password"
            onChange={onhandleChange}
            placeholder="Password"
            required
            autoComplete="off"
            className="border-2 p-2 rounded-md border-blue-400 w-[250px] text-black outline-blue-600 font-semibold mb-3 transition-all"
          />
          <button
            type="submit"
            className="bg-blue-700 p-2 text-white font-semibold hover:bg-blue-600 transition-all rounded-md"
          >
            Login
          </button>
        </form>

        <p className="flex text-sm gap-2 font-semibold mt-4">
          don't have an account?
          <Link to="/SignUp" className="hover:underline text-blue-500">
            Create One
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

export default Login;