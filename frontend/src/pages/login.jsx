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
        localStorage.setItem("token" ,result.data.token);
        setLoading(false);

        if (result.error) {
            alert("Login failed");
        } else {
            navigate("/matchmaking");
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
                    Do noave an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
