import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import MatchmakingPage from "./pages/matchmaking";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<Navigate to="/" />} /> {}
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/matchmaking" element={<MatchmakingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
