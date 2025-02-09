import { loginUser } from "../api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // State to store error message
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Username and Password are required.");
            return;
        }

        setLoading(true);
        const result = await loginUser(username, password);
        setLoading(false);

        console.log(" Login Response:", result); // Debugging API response

        if (result.error) {
            setError(result.error);

            return;
        }

        if (result.token) {
            localStorage.setItem("token", result.token);
            console.log(" Token Stored:", result.token);
            navigate("/matchmaking");
        } else {
            console.error(" Token missing in response");
            setError("Login failed: No token received");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>MakeaFrnd</h2> {/* Changed heading */}
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)} 
                        className={error ? "error-input" : ""}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        className={error ? "error-input" : ""}
                    />
                    {error && <p className="error-message">{error}</p>}  {/* Error in red */}
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
