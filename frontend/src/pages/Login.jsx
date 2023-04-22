import axios from "axios";
import { useState } from "react";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const { email, password, setter, login } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
    login();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded-md"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setter("email", e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border border-gray-300 p-2 w-full rounded-md"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setter("password", e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
