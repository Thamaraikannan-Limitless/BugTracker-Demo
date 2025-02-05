import { create } from "zustand";

const useLoginAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  error: null,

  login: async (username, password, navigate) => {
    set({ isLoading: true, error: null });

    try {
      console.log("Login process started");
      let users = JSON.parse(localStorage.getItem("users")) || [];
      console.log("Existing users:", users);

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        console.log("User found, logging in:", user);
        localStorage.setItem("user", JSON.stringify(user)); // Save logged-in user
        set({ user, isLoading: false, error: null }); // Ensure error is cleared on success
        navigate("/dashboard");
      } else {
        console.log("Invalid username or password");
        set({ error: "Invalid username or password", isLoading: false });
      }
    } catch (err) {
      console.error("Login error:", err);
      set({ error: "Error logging in", isLoading: false });
    }
  },

  logout: (navigate) => {
    console.log("User logged out");
    localStorage.removeItem("user"); // Clear persistence
    set({ user: null, error: null }); // Ensure error is reset on logout
    navigate("/");
  },
}));

export default useLoginAuthStore;
