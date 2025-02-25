// Update TicketDetailWrapper.jsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import TicketDetails from "./TicketDetails";
import { rowData } from "../../Data/TicketData.js";

const TicketDetailWrapper = () => {
  const { ticketId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.state?.activeTab || "All";
  const parsedTicketId = parseInt(ticketId, 10);

  const ticket = rowData.find((t) => {
    return t.id === parsedTicketId;
  });

  const handleBack = () => {
    navigate("/ticket", {
      state: { activeTab },
    });
  };

  if (!ticket) {
    return (
      <div className="p-4">
        <h2 className="text-xl">Ticket not found</h2>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back to Tickets
        </button>
      </div>
    );
  }

  return <TicketDetails ticket={ticket} onBack={handleBack} />;
};

export default TicketDetailWrapper;
