import { loginUser } from "../api";  // ✅ Now `loginUser` exists in api.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import "../App.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("Username and Password are required.");
            return;
        }

        setLoading(true);
        const result = await loginUser(username, password);
        setLoading(false);

        console.log("🔵 Login Response:", result); // Debugging API response

        if (result.error) {
            alert("Login failed: " + result.error);
            return;
        }

        if (result.token) {
            localStorage.setItem("token", result.token);
            console.log("✅ Token Stored:", result.token);
            navigate("/matchmaking");
        } else {
            console.error("❌ Token missing in response");
            alert("Login failed: No token received");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>MakeaFrnd</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type="submit">{loading ? "Logging in..." : "Log in"}</button>
                </form>
                <p>
                    Do not have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
