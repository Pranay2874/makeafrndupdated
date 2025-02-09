import { signupUser } from "../api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css"; // Ensure this CSS file has the necessary styles

function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Store error messages

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message on new attempt

        if (!username || !password) {
            setErrorMessage("Username and Password are required.");
            return;
        }

        setLoading(true);
        const result = await signupUser(username, password);
        setLoading(false);

        if (result.error) {
            setErrorMessage(result.error.replace("Signup failed: ", "")); // Remove "Signup failed: "
        } else {
            navigate("/matchmaking");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="heading">MakeaFrnd</h2>
                <form onSubmit={handleSignup}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        className={errorMessage ? "error-input" : ""}
                    />
                    
                    {/* Display error message without "Signup failed: " */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
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
