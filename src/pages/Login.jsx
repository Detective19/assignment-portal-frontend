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

  const handleLogin = async (e) => {

    e.preventDefault();

    try {
        if (!email.trim() || !password.trim()) {
            setError("Required fields cannot be empty");
            return;  // Could implement more specific validation here (e.g., email format, password strength) but keeping it simple for now
            
        }
      const res = await API.post("/auth/login", {
        email,
        password
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
    Welcome to Assignment Portal!
  </h1>

  <form
    onSubmit={handleLogin}
    className="bg-white p-8 rounded shadow w-[300px] h-[300px]"
  >

    <h2 className="text-2xl font-bold mb-4 text-center">
      Login
    </h2>

    {error && (
      <p className="text-red-500 mb-2">{error}</p>
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
      className="bg-green-500 text-white w-full py-2"
    >
      Login
    </button>

  </form>

</div>
  );
}

export default Login;