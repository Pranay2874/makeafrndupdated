import { useState } from "react";
import "./matchmaking.css"; // Importing the new CSS file

function MatchmakingPage() {
    const [interest, setInterest] = useState("");
    const [gender, setGender] = useState("");
    const [genderPreference, setGenderPreference] = useState("");
    const [searching, setSearching] = useState(false);

    const findMatch = async () => {
        if (!interest && (!gender || !genderPreference)) {
            alert("Please enter an interest or specify gender preferences.");
            return;
        }

        setSearching(true);
        setTimeout(() => {
            setSearching(false);
            alert("No match found, connecting to a random user.");
        }, 45000); 
    };

    return (
        <div className="matchmaking-container">
            <div className="matchmaking-box">
                <h2>MakeaFrnd</h2>
                
                {}
                <input
                    type="text"
                    placeholder="Enter interest (e.g., Football)"
                    onChange={(e) => setInterest(e.target.value)}
                />
                <button className="chat-btn" onClick={findMatch}>
                    Chat
                </button>

                <h3>OR</h3>

                {}
                <div className="gender-selection">
                    <h4>Your Gender</h4>
                    <div className="gender-buttons">
                        <button 
                            className={gender === "Male" ? "selected" : ""} 
                            onClick={() => setGender("Male")}
                        >
                            Male
                        </button>
                        <button 
                            className={gender === "Female" ? "selected" : ""} 
                            onClick={() => setGender("Female")}
                        >
                            Female
                        </button>
                        <button 
                            className={gender === "Other" ? "selected" : ""} 
                            onClick={() => setGender("Other")}
                        >
                            Other
                        </button>
                    </div>
                </div>

                <div className="gender-selection">
                    <h4>Gender You Want to Talk To</h4>
                    <div className="gender-buttons">
                        <button 
                            className={genderPreference === "Male" ? "selected" : ""} 
                            onClick={() => setGenderPreference("Male")}
                        >
                            Male
                        </button>
                        <button 
                            className={genderPreference === "Female" ? "selected" : ""} 
                            onClick={() => setGenderPreference("Female")}
                        >
                            Female
                        </button>
                        <button 
                            className={genderPreference === "Other" ? "selected" : ""} 
                            onClick={() => setGenderPreference("Other")}
                        >
                            Other
                        </button>
                    </div>
                </div>

                <button 
                    className="chat-btn-green" 
                    onClick={findMatch}
                >
                    {searching ? "Searching..." : "Chat"}
                </button>
            </div>
        </div>
    );
}

export default MatchmakingPage;
