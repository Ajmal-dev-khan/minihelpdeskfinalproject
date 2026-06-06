import { useState } from "react";

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#0f0f0f" }}>
      <div style={{ background: "#1a1a1a", padding: "40px", borderRadius: "10px", width: "350px" }}>
        <h2 style={{ color: "white", marginBottom: "20px", textAlign: "center" }}>MiniHelpDesk Login</h2>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #333", background: "#2a2a2a", color: "white" }} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #333", background: "#2a2a2a", color: "white" }} />
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <button onClick={handleLogin}
          style={{ width: "100%", padding: "10px", background: "#4f8ef7", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;