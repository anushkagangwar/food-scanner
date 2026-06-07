import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2>🍎 AI Scanner</h2>

      <div>
        <Link to="/dashboard" style={{ marginRight: 10 }}>
          Dashboard
        </Link>

        <Link to="/">
          Login
        </Link>
      </div>
    </div>
  );
}