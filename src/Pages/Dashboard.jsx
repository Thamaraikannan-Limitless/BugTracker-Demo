
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






  return (
    <div className="p-8">
      <section>
      <div className="grid lg:grid-cols-2 gap-x-10 grid-cols-1 ">
        {/* Passing data.projects as props */}
  
        <ProjectSummary projects={data.projects} />
        <DeveloperSummary developers={data.developers}/>
        </div>
        </section>

    </div>
  );
};

export default Dashboard;