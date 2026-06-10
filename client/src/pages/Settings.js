import { useNavigate } from "react-router-dom";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="settings-page">
      <h1>⚙️ Settings</h1>

      <div className="settings-card">
        <h2>Profile Information</h2>

        <input
          type="text"
          placeholder="Full Name"
          defaultValue="Admin"
        />

        <input
          type="email"
          placeholder="Email"
          defaultValue="admin@gmail.com"
        />

        <button className="save-btn">
          Save Changes
        </button>
      </div>

      <div className="settings-card">
        <h2>Change Password</h2>

        <input
          type="password"
          placeholder="Current Password"
        />

        <input
          type="password"
          placeholder="New Password"
        />

        <button className="save-btn">
          Update Password
        </button>
      </div>

      <div className="settings-card">
        <h2>Account</h2>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}