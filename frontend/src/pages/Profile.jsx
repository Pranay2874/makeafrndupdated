import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, logoutUser } from "../api";
import "../profile.css";

function ProfilePage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("Loading...");
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await getUserProfile();

            if (data.error) {
                console.error(" Error fetching user profile:", data.error);
                setError(true);
            } else {
                setUsername(data.username);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };

    if (error) {
        return (
            <div className="profile-container">
                <div className="profile-box">
                    <h2 className="profile-title">Session Expired</h2>
                    <p>Please login again</p>
                    <button className="profile-btn logout-btn" onClick={handleLogout}>
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <h1 className="profile-username">Welcome, {username}!</h1> {/*  Applied class here */}
            <button className="profile-btn" onClick={() => navigate("/change-username")}>Change Username</button>
            <button className="profile-btn logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default ProfilePage;