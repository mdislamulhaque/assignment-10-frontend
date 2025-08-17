import { useState, useContext } from "react";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/"); // Redirect to home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white py-2 mt-4 rounded w-full hover:bg-red-600 transition"
        >
          Login with Google
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
