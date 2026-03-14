import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e, demoEmail = null, demoPassword = null) => {

    if (e) e.preventDefault();

    const loginEmail = demoEmail || email;
    const loginPassword = demoPassword || password;

    try {

      if (!loginEmail.trim() || !loginPassword.trim()) {
        setError("Required fields cannot be empty");
        return;
      }

      const res = await API.post("api/auth/login", {
        email: loginEmail,
        password: loginPassword
      });

      const { token, role } = res.data;

      login(token, role);

      if (role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }

  };

  return (

    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

      <h1 className="text-4xl font-bold mb-8">
        Welcome to Assignment Portal! 🎉🎉
      </h1>

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow w-[320px]"
      >

        <h2 className="text-2xl font-bold mb-4 text-center">
          Login ➡️
        </h2>

        {error && (
          <p className="text-red-500 mb-2 text-sm">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-500 text-white w-full py-2 rounded mb-4"
        >
          Login
        </button>


        <div className="flex flex-col gap-2">

          <button
            type="button"
            onClick={() => handleLogin(null, "teacher@test.com", "password123")}
            className="bg-blue-500 text-white py-2 rounded"
          >
            Demo Teacher Login
          </button>

          <button
            type="button"
            onClick={() => handleLogin(null, "student@test.com", "password123")}
            className="bg-purple-500 text-white py-2 rounded"
          >
            Demo Student Login
          </button>

        </div>

      </form>

    </div>
  );
}

export default Login;