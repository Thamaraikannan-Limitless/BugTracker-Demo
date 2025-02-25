import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useLoginAuthStore from "../../Store/useLoginAuthStore";
import PropType from "prop-types";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setResetPassword, setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, error: loginError, isLoading } = useLoginAuthStore();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {loginError && <p className="text-red-500 text-sm mb-3">{loginError}</p>}

      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="flex items-center border border-white p-3 rounded-lg">
          <FaUser className="text-gray-400 mx-2" />
          <input
            type="email"
            placeholder="email"
            className="bg-transparent w-full outline-none text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="flex items-center border border-white p-3 rounded-lg relative">
          <FaLock className="text-gray-400 mx-2" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="bg-transparent w-full outline-none text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="absolute right-3 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-[#71BF44] to-[#034C41] text-white py-2 rounded-lg ${
            !isFormValid || isLoading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Logging in..." : "LOGIN"}
        </button>
      </form>

      <p className="mt-4 text-[#71BF44] text-sm">
        Forgot password?{" "}
        <button
          onClick={() => setResetPassword(true)}
          className="text-[#71BF44] underline cursor-pointer"
        >
          Reset
        </button>
      </p>

      <p className="mt-2 text-[#71BF44] text-sm">
        Don’t have an account?
        <button
          onClick={() => setIsLogin(false)}
          className="text-[#71BF44] underline ml-2 cursor-pointer"
        >
          Register
        </button>
      </p>
    </>
  );
};
LoginForm.propTypes = {
  setResetPassword: PropType.func.isRequired,
  setIsLogin: PropType.func.isRequired,
};

export default LoginForm;
