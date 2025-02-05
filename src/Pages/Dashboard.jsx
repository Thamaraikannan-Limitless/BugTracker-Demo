import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoginAuthStore from "../store/useLoginAuthStore";
import DeveloperSummary from "../Components/DeveloperSummary";
import ProjectSummary from "../Components/ProjectSummary"; // Import the child component

// Dummy project data
const data = {
  projects: [
    { name: "Project 1", created: 76, assigned: 67, completed: 48 },
    { name: "Project 2", created: 76, assigned: 67, completed: 48 },
    { name: "Project 3", created: 76, assigned: 67, completed: 48 }
  ],
  developers: [
    { name: "Kannan", assigned: 67, completed: 48 },
    { name: "Kannan", assigned: 67, completed: 48 },
    { name: "Kannan", assigned: 67, completed: 48 }
  ]
};


const Dashboard = () => {
  const { user, logout } = useLoginAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  





  return (
    <div className="p-8">
      <section>
      <div className="grid lg:grid-cols-2 gap-x-10 grid-cols-1 ">
        {/* Passing data.projects as props */}
  <span>Welcome, {user?.username}!</span>
        <button
          onClick={() => logout(navigate)}
          className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
        >
          Logout
        </button>
        <ProjectSummary projects={data.projects} />
        <DeveloperSummary developers={data.developers}/>
        </div>
        </section>

    </div>
  );
};

export default Dashboard;