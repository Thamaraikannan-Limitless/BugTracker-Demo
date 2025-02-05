import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useSignupAuthStore from "../store/useSignupAuthStore";

const SignupForm = ({ setIsLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [position, setPosition] = useState("developer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const {
    signup,
    error: signupError,
    success,
    successMessage,
  } = useSignupAuthStore();

  // Function to clear form fields
  const clearFormFields = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setPosition("developer");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    await signup(
      username,
      position,
      password,
      confirmPassword,
      clearFormFields
    );
  };

  return (
    <div className="">
      {success && (
        <p className="text-green-500 text-sm mb-3">{successMessage}</p>
      )}
      {signupError && (
        <p className="text-red-500 text-sm mb-3">{signupError}</p>
      )}
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center border border-white p-3 rounded-lg">
          <FaUser className="text-gray-400 mx-2" />
          <input
            type="text"
            placeholder="Username"
            className="bg-transparent w-full outline-none text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <select
          className="bg-transparent w-full text-white p-3 rounded-lg border border-white"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <option value="developer" className="text-black">
            Developer
          </option>
          <option value="tester" className="text-black">
            Tester
          </option>
          <option value="admin" className="text-black">
            Admin
          </option>
        </select>

        <div className="flex items-center border border-white p-3 rounded-lg relative">
          <FaLock className="text-gray-400 mx-2" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="bg-transparent w-full outline-none text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        <div className="flex items-center border border-white p-3 rounded-lg relative">
          <FaLock className="text-gray-400 mx-2" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="bg-transparent w-full outline-none text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 text-gray-400"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#71BF44] to-[#034C41] text-white py-2 rounded-lg"
        >
          SIGN UP
        </button>
      </form>

      <p className="mt-4 text-[#71BF44] text-sm">
        Already have an account?{" "}
        <button
          onClick={() => setIsLogin(true)}
          className="text-[#71BF44] underline cursor-pointer"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default SignupForm;
