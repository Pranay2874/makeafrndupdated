import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeUsername } from "../api";

function ChangeUsernamePage() {
    const [newUsername, setNewUsername] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = async () => {
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
            <h2>Change Username</h2>
            <input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
            />
            <button onClick={handleUsernameChange}>Submit</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ChangeUsernamePage;
