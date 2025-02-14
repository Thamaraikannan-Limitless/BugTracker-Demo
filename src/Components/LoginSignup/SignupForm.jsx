import { useState, useEffect } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useSignupAuthStore from "../../Store/useSignupAuthStore";
import PropType from "prop-types";
const SignupForm = ({ setIsLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [position, setPosition] = useState("developer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    signup,
    error: signupError,
    success,
    successMessage,
  } = useSignupAuthStore();

  useEffect(() => {
    if (confirmPassword && password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }, [confirmPassword, password]);

  useEffect(() => {
    if (email) {
      if (!email.includes("@") || !email.includes(".com")) {
        setEmailError("Invalid email format. Example: user@example.com");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    const allFieldsFilled =
      username && email && password && confirmPassword && position;
    const passwordsMatch = password.trim() === confirmPassword.trim();
    const emailIsValid = email.includes("@") && email.includes(".com");

    if (allFieldsFilled && passwordsMatch && emailIsValid) {
      setIsFormValid(true);
      setShowTooltip(false);
    } else {
      setIsFormValid(false);
    }
  }, [username, email, password, confirmPassword, position]);

  const clearFormFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPosition("developer");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isFormValid) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000); // Tooltip hides after 3 seconds
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError("");
    }

    await signup(
      username,
      email,
      position,
      password,
      confirmPassword,
      clearFormFields
    );
  };

  return (
    <div>
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

        <div className="flex items-center border border-white p-3 rounded-lg">
          <FaEnvelope className="text-gray-400 mx-2" />
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent w-full outline-none text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

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
        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}

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
        {confirmPasswordError && (
          <p className="text-red-500 text-sm">{confirmPasswordError}</p>
        )}

        <div className="relative">
          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-[#71BF44] to-[#034C41] text-white py-2 rounded-lg relative ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={!isFormValid}
            onMouseEnter={() => {
              if (!isFormValid) setShowTooltip(true);
            }}
            onMouseLeave={() => setShowTooltip(false)}
          >
            SIGN UP
          </button>
          {showTooltip && !isFormValid && (
            <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 shadow-md">
              Please fill the form
            </div>
          )}
        </div>
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

SignupForm.propTypes = {
  setIsLogin: PropType.func.isRequired,
};

export default SignupForm;
