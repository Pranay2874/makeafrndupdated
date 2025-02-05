import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Matchmaking = () => {
  const [interest, setInterest] = useState("");
  const [gender, setGender] = useState("");
  const [targetGender, setTargetGender] = useState("");
  const navigate = useNavigate();

  const handleMatch = async () => {
    try {
      const response = await axios.post("http://localhost:3000/match", {
        interest,
        gender,
        targetGender,
      });

      if (response.data.success) {
        navigate(`/chat?room=${response.data.roomId}`);
      } else {
        alert("No match found, connecting to a random user...");
        navigate(`/chat?room=random`);
      }
    } catch (error) {
      alert("Error finding match. Try again.");
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      {/* ✅ Top Navigation Bar */}
      <div className="w-full flex justify-between items-center p-4 bg-gray-800 shadow-md">
        <div className="text-2xl cursor-pointer">☰</div>
        <h2 className="text-2xl font-bold">MakeaFrnd</h2>
        <div className="w-10 h-10 rounded-full bg-gray-700"></div>
      </div>

      {/* ✅ Chat with Common Interest Section */}
      <div className="w-80 mt-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Chat with Common Interest</h3>
        <input
          type="text"
          placeholder="Enter interest (e.g., Football)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full px-4 py-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleMatch}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 mt-3 rounded transition duration-300"
        >
          Chat
        </button>
      </div>

      {/* OR Separator */}
      <p className="mt-6 mb-2">OR</p>

      {/* ✅ Chat with Specific Gender Section */}
      <div className="w-80 text-center">
        <h3 className="text-lg font-semibold mb-2">Chat with Specific Gender</h3>

        {/* Select User Gender */}
        <label className="block text-sm mb-2">Your Gender</label>
        <div className="flex gap-3 mb-4">
          {["male", "female", "other"].map((g) => (
            <button
              key={g}
              className={`w-1/3 px-4 py-2 rounded ${gender === g ? "bg-blue-600" : "bg-gray-700"}`}
              onClick={() => setGender(g)}
            >
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>

        {/* Select Target Gender */}
        <label className="block text-sm mb-2">Gender You Want to Talk To</label>
        <div className="flex gap-3 mb-4">
          {["male", "female", "other"].map((tg) => (
            <button
              key={tg}
              className={`w-1/3 px-4 py-2 rounded ${targetGender === tg ? "bg-green-600" : "bg-gray-700"}`}
              onClick={() => setTargetGender(tg)}
            >
              {tg.charAt(0).toUpperCase() + tg.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={handleMatch}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 mt-3 rounded transition duration-300"
        >
          Chat
        </button>
      </div>
    </div>
  );
};

export default Matchmaking;