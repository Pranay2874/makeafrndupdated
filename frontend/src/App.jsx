import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import MatchmakingPage from "./pages/matchmaking";
import ProfilePage from "./pages/Profile";
import ChangeUsernamePage from "./pages/ChangeUsername";
import { useRef } from "react";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition key={location.pathname} classNames="fade" timeout={200} nodeRef={useRef(null)}>
                <Routes location={location}>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<Navigate to="/" />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/matchmaking" element={<MatchmakingPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/change-username" element={<ChangeUsernamePage />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
}

function App() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

export default App;
