const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const signupUser = async (username, password) => {
    try {
        console.log("Signup Request:", { username });

        const response = await fetch(`${BASE_URL}/api/user/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log(" Signup Successful:", data);
        return data;
    } catch (error) {
        console.error(" API Error (signupUser):", error.message);
        return { error: error.message };
    }
};




export const loginUser = async (username, password) => {
    try {
        console.log(" Login Request:", { username });

        const response = await fetch(`${BASE_URL}/api/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include",  //  Ensure cookies are sent
        });

        const data = await response.json();
        console.log(" Login API Response:", data); // Debugging API response

        if (!response.ok) {
            throw new Error(data.message);

        }

        return data;  
    } catch (error) {
        console.error(" API Error (loginUser):", error.message);
        return { error: error.message };
    }
};

export const getUserProfile = async () => {
    try {
        console.log(" Fetching profile...");

        const response = await fetch(`${BASE_URL}/api/user/profile`, {
            method: "GET",
            credentials: "include",  //  Ensure cookies are sent
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log(" User Profile Fetched:", data);
        return data;
    } catch (error) {
        console.error(" API Error (getUserProfile):", error.message);
        return { error: error.message };
    }
};



export const changeUsername = async (newUsername) => {
    try {
        console.log(" Change Username Request:", newUsername);

        const response = await fetch(`${BASE_URL}/api/user/change-username`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newUsername }),
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log(" Username Updated:", data);
        return data;
    } catch (error) {
        console.error(" API Error (changeUsername):", error.message);
        return { error: error.message };
    }
};

export const logoutUser = async () => {
    try {
        console.log(" Logging out user...");

        await fetch(`${BASE_URL}/api/user/logout`, {
            method: "POST",
            credentials: "include",
        });

        console.log(" Logout Successful");

    } catch (error) {
        console.error(" Logout Error:", error.message);
    }
};
