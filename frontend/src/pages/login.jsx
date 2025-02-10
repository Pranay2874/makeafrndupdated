import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";
import "../App.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        setError("");
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Username and Password are required.");
            return;
        }

        setLoading(true);
        const result = await loginUser(username, password);
        setLoading(false);

        if (result.error) {
            setError(result.error);
        } else {
            localStorage.setItem("token", result.token);
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
                        className={error ? "error-input" : ""}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        className={error ? "error-input" : ""}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">{loading ? "Logging in..." : "Log in"}</button>
                </form>
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;