import React from "react";
import PropTypes from "prop-types";

const TicketTable = ({ tickets, onSelectTicket }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Tickets</h2>
      <div className="shadow-md overflow-hidden border rounded-lg">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Ticket #</th>
              <th className="p-4">Project</th>
              <th className="p-4">Created On</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelectTicket(ticket.id)}
              >
                <td className="p-4">{ticket.ticketNumber}</td>
                <td className="p-4">{ticket.projectName}</td>
                <td className="p-4">{ticket.createdOn}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded-full ${
                      ticket.status === "Created"
                        ? "bg-yellow-200 text-yellow-700"
                        : ticket.status === "Assigned"
                        ? "bg-orange-200 text-orange-700"
                        : ticket.status === "Done"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

TicketTable.propTypes = {
  tickets: PropTypes.array.isRequired,
  onSelectTicket: PropTypes.func.isRequired,
};

export default TicketTable;
