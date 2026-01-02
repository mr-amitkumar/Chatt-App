import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/signup",
        formData
      );
      setMessage(response.data.message); // This will show "Welcome [firstname]!"
    } catch (error) {
      setMessage(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex align-middle items-center h-screen bg-violet-700 justify-center">
      <div className="flex flex-col bg-white w-[350px] h-[450px] justify-center items-center shadow-2xl rounded-md shadow-gray-800 drop-shadow-2xl align-middle">
          <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <form
          onSubmit={handleSubmit}
          className = "flex flex-col gap-4"
        >
          <input
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            required
            className="border-b-2 border-gray-400 w-[250px] text-green-600 outline-none font-semibold "
          />
          <input
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            required
            className="border-b-2 border-gray-400 w-[250px] text-green-600 outline-none font-semibold"
          />
          <input
            name="phonenumber"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
            className="border-b-2 border-gray-400 w-[250px] text-blue-600 outline-none font-semibold"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="border-b-2 border-gray-400 w-[250px] text-yellow-600 outline-none font-semibold"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="border-b-2 border-gray-400 w-[250px] text-red-600 outline-none font-semibold"
          />
          <button type="submit" className="border-none outline-none bg-green-700 p-2 text-white font-semibold font-sans hover:bg-green-600 transition-all durations-700 mb-2 rounded-md">
            Signup
          </button>
        </form>
          <p className="flex text-sm gap-2 font-semibold">
          {" "}
          already have account ?
          <Link to="/Login"
            className="hover:underline text-blue-500 visited:text-purple-700 mb-2"
          >
            Login Here
          </Link>
        </p>
          {message && (
            <p className="text-blue-600 font-bold text-center">{message}</p>
          )}
      </div>
    </div>
  );
};

export default Signup;
