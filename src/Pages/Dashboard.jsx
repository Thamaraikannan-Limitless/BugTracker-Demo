import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoginAuthStore from "../store/useLoginAuthStore";

const Dashboard = () => {
  const { user, logout } = useLoginAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <span>Welcome, {user?.username}!</span>
        <button
          onClick={() => logout(navigate)}
          className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
        >
          Logout
        </button>
      </header>
      <div className="flex-grow flex justify-center items-center">
        <h2 className="text-3xl">
          Welcome to your Dashboard, {user?.username}!
        </h2>
      </div>
    </div>
  );
};

export default Dashboard;
