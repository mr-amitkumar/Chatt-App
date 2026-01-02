import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [credient, setCredient] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const onhandleChange = (e) => {
    setCredient({ ...credient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIXED: Changed 'port' to 'post'
      const response = await axios.post(
        "http://localhost:8000/Login",
        credient
      );

      // FIXED: Changed 'response.get.message' to 'response.data.message'
      setMessage(response.data.message);

      console.log("User data:", response.data.user);

      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      // This will display the error message from your Flask 'jsonify'
      setMessage(error.response?.data?.error || "An error occurred");
    }
  };
  return (
    <div className="flex align-middle items-center h-screen bg-violet-700 justify-center">
      <div className="flex flex-col bg-white w-[400px] h-[400px] justify-center items-center shadow-2xl rounded-md shadow-gray-800 drop-shadow-2xl">
        <h1 className="text-3xl font-bold mb-4">Welcome to the XYZ </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            name="email"
            onChange={onhandleChange}
            placeholder="email"
            required
            autoComplete="off"
            className="border-b-2 border-gray-400 w-[250px] text-green-600 outline-none font-semibold mb-4"
          />
          <input
            type="password"
            name="password"
            onChange={onhandleChange}
            placeholder="password"
            required
            autoComplete="off"
            className="border-b-2 border-gray-400 w-[250px] text-red-600 outline-none font-semibold mb-4"
          />
          <button
            type="submit"
            className="border-none outline-none bg-green-700 p-2 text-white font-semibold font-sans hover:bg-green-600 transition-all durations-700 mb-2 rounded-md"
          >
            Login
          </button>
        </form>
        <p className="flex text-sm gap-2 font-semibold">
          {" "}
          dont have account ?
          <Link to="/SignUp"
            className="hover:underline text-blue-500 visited:text-purple-700 mb-2"
          >
            Create One
          </Link>
        </p>
        {message && <p className="text-blue-600 font-bold text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
