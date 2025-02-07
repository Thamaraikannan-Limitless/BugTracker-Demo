import TicketTable from "../Components/TicketGrid/TicketTable";
import TicketDetails from "../Components/Ticket/TicketDetails";
import Header from "../Components/Header/Header";
import TicketBtn from "../Components/Ticket/TicketBtn";

import { useState } from "react";

const ticketsData = [
  {
    id: 1,
    ticketNumber: "TK000001",
    projectName: "Project 1",
    createdOn: "20 Jan",
    status: "Done",
    createdBy: {
      name: "Kannan",
      image: "https://picsum.photos/seed/picsum/200/300",
      date: "20/18/2025",
    },
    assignedBy: {
      name: "Kannan",
      image: "https://picsum.photos/seed/picsum/200/300",
      date: "20/18/2025",
    },
    assignedTo: {
      name: "Syed",
      image: "https://picsum.photos/seed/picsum/200/300",
      date: "20/18/2025",
    },
    retestBy: {
      name: "Jasper",
      image: "https://picsum.photos/seed/picsum/200/300",
      date: "20/18/2025",
    },
    details:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum blanditiis reiciendis soluta at beatae ducimus assumenda maiores consequatur omnis quos. Deserunt quibusdam distinctio nobis dignissimos molestias eius explicabo eligendi incidunt illo optio, in, quidem maxime quo adipisci dolore blanditiis et iusto saepe assumenda, id molestiae cupiditate veritatis facere! Vel odio modi saepe, ad optio consectetur! Maxime deserunt recusandae harum dolorum nisi est fuga, reprehenderit beatae deleniti distinctio quos quasi neque illo error iure amet laborum nostrum officiis. In hic rem, architecto autem odit atque reiciendis adipisci at praesentium! Officia repellat explicabo deleniti assumenda minus dolorum qui eos voluptates libero. Impedit.",
    attachments: "https://picsum.photos/seed/picsum/200/300",
    remarks: [
      {
        author: {
          name: "John Doe",
          image: "https://picsum.photos/seed/picsum/200/300",
        },
        text: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum blanditiis reiciendis soluta at beatae ducimus assumenda maiores consequatur omnis quos. Deserunt quibusdam distinctio nobis dignissimos molestias eius explicabo eligendi incidunt illo optio, in, quidem maxime quo adipisci dolore blanditiis et iusto saepe assumenda, id molestiae cupiditate veritatis facere! Vel odio modi saepe, ad optio consectetur! Maxime deserunt recusandae harum dolorum nisi est fuga, reprehenderit beatae deleniti distinctio quos quasi neque illo error iure amet laborum nostrum officiis. In hic rem, architecto autem odit atque reiciendis adipisci at praesentium! Officia repellat explicabo deleniti assumenda minus dolorum qui eos voluptates libero. Impedit.",
        date: "2025-02-06",
      },
    ],
  },
  {
    id: 2,
    ticketNumber: "TK000002",
    projectName: "Project 2",
    createdOn: "21 Jan",
    status: "Created",
    createdBy: {
      name: "Kannan",
      image: "https://picsum.photos/seed/picsum/200/300",
      date: "20/18/2025",
    },
    details:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi totam officia eum amet molestiae, ex provident ullam dicta ratione eius, architecto tempore iure sunt temporibus velit sit impedit, perspiciatis sed!",
    attachments: "https://picsum.photos/seed/picsum/200/300",
    remarks: [
      {
        author: {
          name: "John krishna murthy",
          image: "https://picsum.photos/seed/picsum/200/300",
        },
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi totam officia eum amet molestiae, ex provident ullam dicta ratione eius, architecto tempore",
        date: "2025-02-06",
      },
    ],
  },
  {
    id: 3,
    ticketNumber: "TK000003",
    projectName: "Project 3",
    createdOn: "21 Jan",
    status: "Assigned",
    createdBy: {
      name: "Kannan",
      image: "https://picsum.photos/seed/picsum/200/300",
      date: "20/18/2025",
    },
    assignedBy: {
      name: "Kannan",
      image: "https://picsum.photos/seed/picsum/200/300",
      date: "20/18/2025",
    },
    assignedTo: {
      name: "Syed",
      image: "https://picsum.photos/seed/picsum/200/300",
      date: "20/18/2025",
    },
    details:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi totam officia eum amet molestiae, ex provident ullam dicta ratione eius, architecto tempore iure sunt temporibus velit sit impedit, perspiciatis sed!",
    attachments: "https://picsum.photos/seed/picsum/200/300",
    remarks: [
      {
        author: {
          name: "John Doe",
          image: "https://picsum.photos/seed/picsum/200/300",
        },
        text: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum blanditiis reiciendis soluta at beatae ducimus assumenda maiores consequatur omnis quos. Deserunt quibusdam distinctio nobis dignissimos molestias eius explicabo eligendi incidunt illo optio, in, quidem maxime quo adipisci dolore blanditiis et iusto saepe assumenda, id molestiae cupiditate veritatis facere! Vel odio modi saepe, ad optio consectetur! Maxime deserunt recusandae harum dolorum nisi est fuga, reprehenderit beatae deleniti distinctio quos quasi neque illo error iure amet laborum nostrum officiis. In hic rem, architecto autem odit atque reiciendis adipisci at praesentium! Officia repellat explicabo deleniti assumenda minus dolorum qui eos voluptates libero. Impedit.",
        date: "2025-02-06",
      },
    ],
  },
];

// import TicketTable from "../Components/TicketGrid/TicketTable";

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleTicketSelect = (ticketId) => {
    const ticket = ticketsData.find((t) => t.id === ticketId);
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
              tickets={ticketsData}
              onSelectTicket={handleTicketSelect}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default Tickets;
