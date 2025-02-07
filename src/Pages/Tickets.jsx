import TicketTable from "../Components/TicketGrid/TicketTable";
import TicketDetails from "../Components/Ticket/TicketDetails";
import Header from "../Components/Header/Header";
import TicketBtn from "../Components/Ticket/TicketBtn";

import { useState } from "react";

const rowData = [
  {
    id: 1,
    priority: "High",
    ticket: "TK000001",
    project: "Project 1",
    createdOn: "20 Jan",
    assignedOn: "21 Jan",
    completedOn: "28 Jan",
    status: "Completed",
    timeToAllocate: "2 days (16 hrs)",
    timeToFinish: "2 days (16 hrs)",
    
    createdBy: {
      name: "Kannan",
      date: "20 Jan",
      image:"https://picsum.photos/seed/picsum/200/300"
    },
    assignedBy: {
      name: "Kannan",
      date: "21 Jan",
      image:"https://picsum.photos/seed/picsum/200/300"
    },
    assignedTo: {
      name: "Syed",
      date: "21 Jan",
      image:"https://picsum.photos/seed/picsum/200/300"
    },
    retestBy: {
      name: "Jasper",
      date: "28 Jan",
      image:"https://picsum.photos/seed/picsum/200/300"
    },
    details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo, doloremque delectus sint atque consequatur consectetur? Tenetur modi ea non iste ipsum temporibus magnam, mollitia expedita minima porro rem, inventore tempora illo odio dicta?",
    attachments:"https://picsum.photos/seed/picsum/200/300",
    remarks: [
      {
        author: { name: "Syed", image: "https://picsum.photos/seed/picsum/200/300" },
        text: "This error occurs because React encountered an object in a location where it expected a renderable value (such as a string, number, or component).",
        date: "22 Jan",
      },
      {
        author: { name: "Kannan", image: "https://picsum.photos/seed/picsum/200/300" },
        text: "This error occurs because React encountered an object in a location where it expected a renderable value (such as a string, number, or component).",
        date: "25 Jan",
      },
    ],
  },
  {
    id: 2,
    priority: "Low",
    ticket: "TK000001",
    project: "Project 1",
    createdOn: "20 Jan",
    assignedOn: "21 Jan",
    completedOn: "28 Jan",
    status: "Assigned",
    timeToAllocate: "2 days (16 hrs)",
    timeToFinish: "2 days (16 hrs)",
    createdBy: {
      name: "Kannan",
      date: "20 Jan",
      image:"https://picsum.photos/seed/picsum/200/300"
    },
    assignedBy: {
      name: "Kannan",
      date: "21 Jan",
      image:"https://picsum.photos/seed/picsum/200/300"
    },
    assignedTo: {
      name: "Syed",
      date: "21 Jan",
      image:"https://picsum.photos/seed/picsum/200/300"
    },
    details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo, doloremque delectus sint atque consequatur consectetur? Tenetur modi ea non iste ipsum temporibus magnam, mollitia expedita minima porro rem, inventore tempora illo odio dicta?",
    attachments:"https://picsum.photos/seed/picsum/200/300",
    remarks: [
   
      {
        author: { name: "Kannan", image: "https://picsum.photos/seed/picsum/200/300" },
        text: "This error occurs because React encountered an object in a location where it expected a renderable value (such as a string, number, or component).",
        date: "25 Jan",
      },
    ],
  },
  {
    id: 3,
    priority: "Medium",
    ticket: "TK000001",
    project: "Project 1",
    createdOn: "20 Jan",
    assignedOn: "21 Jan",
    completedOn: "28 Jan",
    status: "Assigned",
    timeToAllocate: "2 days (16 hrs)",
    timeToFinish: "2 days (16 hrs)",
    createdBy: {
      name: "Kannan",
      date: "20 Jan",
      image:"https://picsum.photos/seed/picsum/200/300"
    },
    details: "This error occurs because React encountered an object in a location where it expected a renderable value (such as a string, number, or component). The issue here lies in how remark.text or other similar parts are handled when rendering inside JSX.",
    attachments:"https://picsum.photos/seed/picsum/200/300",
    remarks: [
      {
        author: { name: "Syed", image: "https://picsum.photos/seed/picsum/200/300" },
        text: "This error occurs because React encountered an object in a location where it expected a renderable value (such as a string, number, or component).",
        date: "22 Jan",
      },
    
    ],
  },
];

// import TicketTable from "../Components/TicketGrid/TicketTable";

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleTicketSelect = (ticketId) => {
    const ticket = rowData.find((t) => t.id === ticketId);
    setSelectedTicket(ticket);
  };
 
  return (
    <>
      <Header />

      {!selectedTicket && <TicketBtn />}

      <div className="py-10">
        <section>
          {selectedTicket ? (
            <TicketDetails
              ticket={selectedTicket}
              onBack={() => setSelectedTicket(null)}
            />
          ) : (
            <TicketTable
              tickets={rowData}
              onSelectTicket={handleTicketSelect}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default Tickets;
