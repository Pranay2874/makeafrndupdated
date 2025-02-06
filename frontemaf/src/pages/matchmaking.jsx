import { useState, useEffect } from "react";
import "./matchmaking.css";

function MatchmakingPage() {
    const [interest, setInterest] = useState("");
    const [gender, setGender] = useState("");
    const [genderPreference, setGenderPreference] = useState("");
    const [searching, setSearching] = useState(false);
    const [match, setMatch] = useState(null);

    useEffect(() => {
        let interval;
        if (searching) {
            interval = setInterval(async () => {
                try {
                    const response = await fetch("/api/matchmaking", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ interest, gender, genderPreference })
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

    const findMatch = () => {
        if (!interest && (!gender || !genderPreference)) {
            alert("Please enter an interest or specify gender preferences.");
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
                <img className="user-profile" src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid" alt="User Profile" />
            </header>
            
            <div className="matchmaking-box">
                <h3>Chat with Common Interests</h3>
                <input
                    type="text"
                    placeholder="Common Interest (e.g., Football)"
                    onChange={(e) => setInterest(e.target.value)}
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
