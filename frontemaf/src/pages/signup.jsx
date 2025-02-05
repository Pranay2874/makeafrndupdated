// signup.jsx
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Track loading state

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // ✅ Input validation
    if (!username.trim() || !password.trim()) {
      alert("❌ Username and password are required!");
      return;
    }

    try {
      setLoading(true);
      console.log("📢 Sending signup request...", { username, password });

      const response = await axios.post(
        "http://localhost:3000/user/signup",  // ✅ Ensure backend URL is correct
        { username, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      console.log("✅ Signup successful:", response.data);
      
      window.location.href = "/match"; // ✅ Fixed redirection
      
    } catch (error) {
      console.error("❌ Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed. Try again.");
      
    } finally {
      setLoading(false); // ✅ Reset loading state
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">MakeaFrnd</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded transition duration-300"
            disabled={loading} // ✅ Disable button while processing
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
