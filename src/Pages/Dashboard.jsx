import DeveloperSummary from "../Components/Dashboard/DeveloperSummary";

import ProjectSummary from "../Components/Dashboard/ProjectSummary";
import Header from "../Components/Header/Header";
import { useState } from "react";
import TicketSummary from "../Components/Dashboard/TicketSummary";
import DeveloperWise from "../Components/Dashboard/DeveloperWise";
// Dummy project data
const data = {
  projects: [
    { name: "Project 1", created: 76, assigned: 67, completed: 48 },
    { name: "Project 2", created: 76, assigned: 67, completed: 48 },
    { name: "Project 3", created: 76, assigned: 67, completed: 48 },
  ],
  developers: [
    { name: "Kannan", assigned: 67, completed: 48, reoccur: 37 },
    { name: "Kannan", assigned: 67, completed: 48, reoccur: 37 },
    { name: "Kannan", assigned: 67, completed: 48, reoccur: 37 },
  ],
};
const ticketData = [
  {
    date: "2025-FEB-10",
    created: 8,
    assigned: 8,
    completed: 8,
    reoccur: 20,
    retest: 8,
  },
  {
    date: "2025-FEB-11",
    created: 6,
    assigned: 6,
    completed: 6,
    reoccur: 6,
    retest: 6,
  },
  {
    date: "2025-FEB-12",
    created: 4,
    assigned: 8,
    completed: 4,
    reoccur: 2,
    retest: 3,
  },
  {
    date: "2025-FEB-13",
    created: 6,
    assigned: 9,
    completed: 2,
    reoccur: 5,
    retest: 6,
  },
  {
    date: "2025-FEB-14",
    created: 2,
    assigned: 4,
    completed: 6,
    reoccur: 8,
    retest: 3,
  },
  {
    date: "2025-FEB-03",
    created: 8,
    assigned: 8,
    completed: 8,
    reoccur: 20,
    retest: 8,
  },
  {
    date: "2025-FEB-04",
    created: 6,
    assigned: 6,
    completed: 6,
    reoccur: 6,
    retest: 6,
  },
  {
    date: "2025-FEB-05",
    created: 4,
    assigned: 8,
    completed: 4,
    reoccur: 2,
    retest: 3,
  },
  {
    date: "2025-FEB-06",
    created: 6,
    assigned: 9,
    completed: 2,
    reoccur: 5,
    retest: 6,
  },
  {
    date: "2025-FEB-07",
    created: 2,
    assigned: 4,
    completed: 6,
    reoccur: 8,
    retest: 3,
  },
];

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <Header />
      <div className="mt-10 ">
        <section className=" flex flex-col gap-10">
          <div className="grid lg:grid-cols-2 gap-x-10 gap-y-5 grid-cols-1">
            <ProjectSummary projects={data.projects} />
            <DeveloperSummary developers={data.developers} />
          </div>
          <div className=" bg-[#F5F5F5] rounded-tl-[60px] rounded-br-[60px]">
            <h1 className="text-2xl font-[400] mb-4 py-8 px-6">OSEL Signage</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-9 md:px-7">
              <TicketSummary
                ticketData={ticketData}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
             <DeveloperWise/>
      
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
