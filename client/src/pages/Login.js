import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const res = await axios.post(
  "http://127.0.0.1:5001/api/auth/login",
  formData
);
      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/dashboard");
    } catch (err) {
  console.log(err);
  console.log(err.response);

  alert(
    err.response?.data?.message ||
    err.message ||
    "Login Failed"
  );
}
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>💰 Finance Tracker</h1>
        <p>Manage your money smartly</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}