import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", { email, username, password });
      alert("Signup successful! Please log in.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Error creating account");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleSignup}
        className="bg-gray-100 p-8 rounded-xl shadow-md w-120 "
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          className="cursor-pointer w-full bg-gray-900 text-white font-bold py-2 rounded hover:bg-gray-700 transition"
        >
          Sign Up
        </button>
        <p
          className="text-center mt-3 text-blue-600 cursor-pointer hover:text-blue-950 transition"
          onClick={() => navigate("/login")}
        >
          Already have an account?
        </p>
      </form>
    </div>
  );
}

export default Signup;
