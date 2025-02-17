import Header from "../Header/Header";

import TicketTable from "../TicketGrid/TicketTable";
import TicketBtn from "./TicketBtn";
import { rowData } from "../../Data/TicketData";

import { useNavigate } from "react-router-dom";

const TicketDisplay = () => {
  const navigate = useNavigate();

  const handleTicketSelect = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  return (
    <>
      <Header />
      <TicketBtn />
      <div className="py-2">
        <section>
          <TicketTable tickets={rowData} onSelectTicket={handleTicketSelect} />
        </section>
      </div>
    </>
  );
};
export default TicketDisplay;
