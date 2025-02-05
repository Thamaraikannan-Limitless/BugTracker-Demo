import { create } from "zustand";

const useSignupAuthStore = create((set) => ({
  isLoading: false,
  error: null,
  success: false,
  successMessage: "",

  signup: async (
    username,
    position,
    password,
    confirmPassword,
    clearFormFields
  ) => {
    set({ isLoading: true, error: null, success: false, successMessage: "" });

    try {
      console.log("Signup process started");
      let users = JSON.parse(localStorage.getItem("users")) || [];

      console.log("Existing users:", users);

      if (users.some((u) => u.username === username)) {
        console.log("Username already exists!");
        set({
          error: "Username already exists!",
          isLoading: false,
          success: false,
          successMessage: "",
        });
        return;
      }

      if (password !== confirmPassword) {
        console.log("Passwords do not match!");
        set({
          error: "Passwords do not match!",
          isLoading: false,
          success: false,
          successMessage: "",
        });
        return;
      }

      const newUser = { username, position, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users)); // Save to localStorage
      console.log("User successfully added:", newUser);

      // Call clearFormFields to reset the input fields
      clearFormFields();

      set({
        success: true,
        isLoading: false,
        error: null,
        successMessage: "User registered successfully!",
      });

      setTimeout(() => {
        set({ successMessage: "", success: false, error: null }); // Clear success message and error after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);
      set({
        error: "Error signing up! Please try again.",
        isLoading: false,
        success: false,
        successMessage: "",
      });
    }
  },
}));

export default useSignupAuthStore;
