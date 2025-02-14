import { useState } from "react";

import Header from "../Header/Header";
import TicketDetails from "./TicketDetails";
import TicketTable from "../TicketGrid/TicketTable";
import TicketBtn from "./TicketBtn";
import userImage from "../../assets/alexander-hipp-iEEBWgY_6lA-unsplash.jpg";
import Screenshot from "../../assets/photo-1566241440091-ec10de8db2e1.jpeg";
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
      image: userImage,
    },
    assignedBy: {
      name: "Kannan",
      date: "21 Jan",
      image: userImage,
    },
    assignedTo: {
      name: "Syed",
      date: "21 Jan",
      image: userImage,
    },
    retestBy: {
      name: "Jasper",
      date: "28 Jan",
      image: userImage,
    },
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo, doloremque delectus sint atque consequatur consectetur? Tenetur modi ea non iste ipsum temporibus magnam, mollitia expedita minima porro rem, inventore tempora illo odio dicta?",
    attachments: Screenshot,
    remarks: [
      {
        author: {
          name: "Syed",
          image: userImage,
        },
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
        date: "22 Jan",
      },
      {
        author: {
          name: "Kannan",
          image: userImage,
        },
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
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
      name: "Kannan ",
      date: "20 Jan",
      image: userImage,
    },
    assignedBy: {
      name: "Kannan",
      date: "21 Jan",
      image: userImage,
    },
    assignedTo: {
      name: "Syed",
      date: "21 Jan",
      image: userImage,
    },
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo, doloremque delectus sint atque consequatur consectetur? Tenetur modi ea non iste ipsum temporibus magnam, mollitia expedita minima porro rem, inventore tempora illo odio dicta?",
    attachments: Screenshot,
    remarks: [
      {
        author: {
          name: "Kannan",
          image: userImage,
        },
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
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
    status: "Created",
    timeToAllocate: "2 days (16 hrs)",
    timeToFinish: "2 days (16 hrs)",
    createdBy: {
      name: "Kannan",
      date: "20 Jan",
      image: userImage,
    },
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
    attachments: Screenshot,
    remarks: [
      {
        author: {
          name: "Syed",
          image: userImage,
        },
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam consectetur obcaecati quibusdam autem hic sapiente voluptates, suscipit ratione magnam! Nihil aspernatur deserunt, accusantium commodi suscipit illo,.",
        date: "22 Jan",
      },
    ],
  },
];
const TicketDisplay = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleTicketSelect = (ticketId) => {
    const ticket = rowData.find((t) => t.id === ticketId);
    setSelectedTicket(ticket);
  };

  const resetSelectedTicket = () => {
    setSelectedTicket(null);
  };

  return (
    <>
      <Header onReset={resetSelectedTicket} />
      {!selectedTicket && <TicketBtn />}
      <div className="py-2">
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
export default TicketDisplay;
