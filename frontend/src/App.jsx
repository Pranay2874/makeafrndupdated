import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { lazy, Suspense, useRef } from "react";

// Lazy Load Pages for Performance Optimization
const LoginPage = lazy(() => import("./pages/login"));
const SignupPage = lazy(() => import("./pages/signup"));
const MatchmakingPage = lazy(() => import("./pages/matchmaking"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const ChangeUsernamePage = lazy(() => import("./pages/ChangeUsername"));

function AnimatedRoutes() {
    const location = useLocation();
    const nodeRef = useRef(null); // Ensure ref is properly handled

    return (
        <TransitionGroup>
            <CSSTransition key={location.pathname} classNames="fade" timeout={200} nodeRef={nodeRef}>
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
            <Suspense fallback={<div>Loading...</div>}>
                <AnimatedRoutes />
            </Suspense>
        </Router>
    );
}

export default App;
