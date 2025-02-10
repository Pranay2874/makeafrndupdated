import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeUsername } from "../api";
import "../changeusername.css";  // Import the CSS file

function ChangeUsernamePage() {
    const [newUsername, setNewUsername] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!newUsername.trim()) {
            setMessage("Username cannot be empty");
            return;
        }

        const response = await changeUsername(newUsername);
        
        if (response.error) {
            setMessage(response.error);
        } else {
            setMessage("Username changed successfully!");
            setTimeout(() => navigate("/profile"), 1500);
        }
    };

    return (
        <div className="change-username-container">
            <div className="form-wrapper">
                <h2>Change Username</h2>

                <form onSubmit={handleUsernameChange}>
                    <input
                        type="text"
                        placeholder="New Username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>

                {/* Message displayed dynamically */}
                {message && (
                    <p className={message.includes("successfully") ? "success" : "error"}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default ChangeUsernamePage;