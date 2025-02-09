import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../api";
import "../App.css";

function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    
    useEffect(() => {
        setError("");
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Username and Password are required.");
            return;
        }

        setLoading(true);
        const result = await signupUser(username, password);
        setLoading(false);

        if (result.error) {
            setError(result.error);
        } else {
            navigate("/matchmaking");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>MakeaFrnd</h2>
                <form onSubmit={handleSignup}>
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
                    <button type="submit">{loading ? "Signing up..." : "Sign Up"}</button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;
