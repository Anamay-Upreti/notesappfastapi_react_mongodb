import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Error creating account");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-120"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-gray-900 text-white font-bold py-2 rounded  transition cursor-pointer hover:bg-gray-700"
        >
          Log In
        </button>
        <p
          className="text-center mt-3 text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Create an account
        </p>
      </form>
    </div>
  );
}

export default Login;
