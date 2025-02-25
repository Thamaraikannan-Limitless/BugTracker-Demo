import TicketTables from "../TicketGrid/TicketTables";
import TicketBtn from "./TicketBtn";
import { rowData } from "../../Data/TicketData.js";

import { useNavigate } from "react-router-dom";

const TicketDisplay = () => {
  const navigate = useNavigate();

  const handleTicketSelect = (ticket, activeTab) => {
    navigate(`/tickets/${ticket.id}`, {
      state: { activeTab },
    });
  };

  return (
    <>
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
