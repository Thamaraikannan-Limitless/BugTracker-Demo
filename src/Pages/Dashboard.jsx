import DeveloperSummary from "../Components/Dashboard/DeveloperSummary";
import ProjectSummary from "../Components/Dashboard/ProjectSummary";
import Header from "../Components/Header/Header";

// Dummy project data
const data = {
  projects: [
    { name: "Project 1", created: 76, assigned: 67, completed: 48 },
    { name: "Project 2", created: 76, assigned: 67, completed: 48 },
    { name: "Project 3", created: 76, assigned: 67, completed: 48 },
  ],
  developers: [
    { name: "Kannan", assigned: 67, completed: 48 },
    { name: "Kannan", assigned: 67, completed: 48 },
    { name: "Kannan", assigned: 67, completed: 48 },
  ],
};

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="mt-10">
        <section className="">
          <div className="grid lg:grid-cols-2 gap-x-10 gap-y-5 grid-cols-1">
            <ProjectSummary projects={data.projects} />
            <DeveloperSummary developers={data.developers} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
