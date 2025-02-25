import { create } from "zustand";
import api from "../API/AxiosInterceptor";

const useLoginAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      console.log("Login started");
      const response = await api.post("/Auth/login", { email, password });
      const { model, status, message } = response.data;
      console.log("API Response:", response.data);
      console.log(message);

      if (status === "Success" && model) {
        console.log("User found, logging in:", model.name);
        // Store the complete user model
        localStorage.setItem("user", JSON.stringify(model));
        localStorage.setItem("token", model.token);

        console.log(localStorage.getItem("token"));

        set({
          user: model, // Store the full user object
          token: model.token,
          isLoading: false,
          error: null,
        });
        return true; // Successful login
      } else {
        console.log("Invalid email or password");
        set({ error: "Invalid email or password", isLoading: false });
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      set({
        error: err.response?.data?.message || "Login failed",
        isLoading: false,
      });
      return false;
    }
  },

  logout: () => {
    console.log("User logged out");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null, error: null });
  },
}));

export default useLoginAuthStore;
