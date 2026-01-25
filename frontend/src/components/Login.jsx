import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// MODIFICATION 1: Accept 'setUser' as a prop from App.jsx
const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const [credient, setCredient] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const onhandleChange = (e) => {
    setCredient({ ...credient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const response = await axios.post(
        "http://localhost:8000/Login",
        credient,
      );

      setIsError(false);
      setMessage(response.data.message);

      // MODIFICATION 2: Persist data to LocalStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // MODIFICATION 3: Update the Global State in App.jsx
      // This is the most important part! It triggers the App to show the Navbar and Home page.
      if (setUser) {
        setUser(response.data.user);
      }

      console.log("Login Success:", response.data.user);

      // Use a shorter timeout or move instantly for a snappier feel
      setTimeout(() => {
        navigate("/"); 
      }, 1000);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.error || "Invalid login credentials");
    }
  };

  return (
    <div className="flex align-middle gap-10 items-center h-screen bg-black justify-center">
      <div className="mr-48">
        <h1 className="text-6xl text-white font-bold mb-1">Welcome</h1>
        <h1 className="text-5xl font-bold mb-1 text-blue-600">To</h1>
        <h1 className="text-4xl text-white font-bold mb-6">Y Chat</h1>
      </div>
      <div className="flex flex-col bg-transparent justify-center items-center shadow-2xl rounded-md">
        <h1 className=" text-white font-bold text-4xl text-right">
          Connect Now.
        </h1>
        <h1 className="text-white text-5xl mb-10"> And Share Your Heart</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            name="email"
            onChange={onhandleChange}
            placeholder="Email"
            required
            autoComplete="off"
            className="border-2 px-4 py-3 rounded-md border-gray-800 focus:border-blue-600 w-[350px] text-white font-semibold transition-all bg-transparent outline-none"
          />
          <input
            type="password"
            name="password"
            onChange={onhandleChange}
            placeholder="Password"
            required
            autoComplete="off"
            className="border-2 px-4 py-3 rounded-md border-gray-800 w-[350px] text-white focus:border-blue-600 font-semibold mb-3 transition-all bg-transparent outline-none"
            />
          <button
            type="submit"
            className="bg-blue-700 p-2 text-white font-semibold hover:bg-blue-600 transition-all rounded-md"
          >
            Login
          </button>
        </form>
        <div className="text-gray-500 text-sm flex flex-col mt-4">
          <p>
            By using signup you will agree with
            <strong className="text-blue-500"> terms of services</strong> and
          </p>
          <p>
            <strong className="text-blue-500">privacy policy</strong>, along
            with <strong className="text-blue-500">cokkies</strong>
          </p>
        </div>

        <p className="text-gray-500 mt-2 text-xl mb-3">
          don't have an account?
        </p>
        <Link
          to="/SignUp"
          className="text-white border-2 border-gray-800 rounded-md p-2 w-[350px] text-center"
        >
          Sign Up
        </Link>

        {message && (
          <p
            className={`mt-3 text-sm font-bold text-center ${isError ? "text-red-600" : "text-green-600"}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;