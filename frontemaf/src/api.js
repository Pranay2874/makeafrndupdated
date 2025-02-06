const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


export const signupUser = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/user/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include",
        });

        if (!response.ok) throw new Error("Signup failed");
        return await response.json();
    } catch (error) {
        console.error("API Error:", error.message);
        return { error: error.message };
    }
};


export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include",
        });

        if (!response.ok) throw new Error("Login failed");
        return await response.json();
    } catch (error) {
        console.error("API Error:", error.message);
        return { error: error.message };
    }
};
