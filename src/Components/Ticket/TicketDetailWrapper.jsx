import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import TicketDetails from "./TicketDetails";
import { rowData } from "../../Data/TicketData";
const TicketDetailWrapper = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  // Find the ticket data based on the ID
  const ticket = rowData.find((t) => t.id === parseInt(ticketId));

  const handleBack = () => {
    navigate("/ticket");
  };

  if (!ticket) {
    return (
      <>
        <Header />
        <div className="p-4">
          <h2 className="text-xl">Ticket not found</h2>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Back to Tickets
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <TicketDetails ticket={ticket} onBack={handleBack} />
    </>
  );
};

export default TicketDetailWrapper;
