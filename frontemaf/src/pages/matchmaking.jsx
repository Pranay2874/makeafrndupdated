import { useState, useEffect } from "react";
import "./matchmaking.css";

function MatchmakingPage() {
    const [interest, setInterest] = useState("");
    const [interests, setInterests] = useState([]);
    const [gender, setGender] = useState("");
    const [genderPreference, setGenderPreference] = useState("");
    const [searching, setSearching] = useState(false);
    const [match, setMatch] = useState(null);
    const [username, setUsername] = useState("User"); // Default username

    useEffect(() => {
        // Fetch logged-in user's username from API or local storage
        const fetchUsername = async () => {
            try {
                const response = await fetch("/api/getUsername"); // Adjust API endpoint as needed
                const data = await response.json();
                if (data.username) {
                    setUsername(data.username);
                }
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        };

        fetchUsername();
    }, []);

    useEffect(() => {
        let interval;
        if (searching) {
            interval = setInterval(async () => {
                try {
                    const response = await fetch("/api/matchmaking", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ interests, gender, genderPreference })
                    });
                    const data = await response.json();
                    if (data.matchFound) {
                        setMatch(data.match);
                        setSearching(false);
                        clearInterval(interval);
                    }
                } catch (error) {
                    console.error("Matchmaking error:", error);
                }
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [searching]);

    const handleInterestKeyDown = (e) => {
        if (e.key === "Enter" && interest.trim()) {
            setInterests([...interests, interest.trim()]);
            setInterest("");
            e.preventDefault();
        }
    };

    const removeInterest = (index) => {
        setInterests(interests.filter((_, i) => i !== index));
    };

    const findMatch = () => {
        if (interests.length === 0 && (!gender || !genderPreference)) {
            alert("Please enter at least one interest or specify gender preferences.");
            return;
        }
        setSearching(true);
        setMatch(null);
    };

    return (
        <div className="matchmaking-container">
            <header>
                <div className="menu-icon">☰</div>
                <h2>MakeaFrnd</h2>
                <div className="profile-container">
                    <img className="user-profile" src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid" alt="User Profile" />
                    <p className="username-text" style={{ color: "white", fontWeight: "bold" }}>{username}</p>
                </div>
            </header>
            
            <div className="matchmaking-box">
                <h3>Chat with Common Interests</h3>
                <div className="interests-container">
                    {interests.map((int, index) => (
                        <span key={index} className="interest-tag">
                            {int} <button onClick={() => removeInterest(index)}>×</button>
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Type interest and press Enter"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    onKeyDown={handleInterestKeyDown}
                />
                <button className="chat-btn" onClick={findMatch}>Chat</button>
                
                <h3>OR</h3>
                
                <h4>Chat with Specific Gender</h4>
                <h4>Your Gender</h4>
                <div className="gender-selection">
                    <button onClick={() => setGender("Male")}>Male</button>
                    <button onClick={() => setGender("Female")}>Female</button>
                    <button onClick={() => setGender("Other")}>Other</button>
                </div>
                
                <h4>Gender You Want to Talk To</h4>
                <div className="gender-selection">
                    <button onClick={() => setGenderPreference("Male")}>Male</button>
                    <button onClick={() => setGenderPreference("Female")}>Female</button>
                    <button onClick={() => setGenderPreference("Other")}>Other</button>
                </div>
                
                <button className="chat-btn" onClick={findMatch}>Chat</button>
                <h3>OR</h3>
                <button className="random-chat-btn">Random Chat</button>
                
                {searching && <p>Searching for a match...</p>}
                {match && <p>Match found! Chat with {match.username}</p>}
            </div>
        </div>
    );
}

export default MatchmakingPage;
