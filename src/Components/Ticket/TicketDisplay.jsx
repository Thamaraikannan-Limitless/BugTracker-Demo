import Header from "../Header/Header";

import TicketTables from "../TicketGrid/TicketTables";
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
          <TicketTables tickets={rowData} onSelectTicket={handleTicketSelect} />
        </section>
      </div>
    </>
  );
};
export default TicketDisplay;
