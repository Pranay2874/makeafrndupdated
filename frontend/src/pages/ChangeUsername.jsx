import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function ChangeUsernamePage() {
    const [newUsername, setNewUsername] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/user/change-username`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newUsername }),
                credentials: "include",
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            navigate("/profile");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Change Username</h2>
            <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
            <button onClick={handleUsernameChange}>Submit</button>
        </div>
    );
}

export default ChangeUsernamePage;
