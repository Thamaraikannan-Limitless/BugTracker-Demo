import PropTypes from "prop-types";
import { LuArrowLeft } from "react-icons/lu";
const TicketDetails = ({ ticket, onBack }) => {
  const progressStages = [
    { label: "CREATED BY", user: ticket.createdBy },
    { label: "ASSIGNED BY", user: ticket.assignedBy },
    { label: "ASSINGNED TO", user: ticket.assignedTo },
    { label: "RESTED BY", user: ticket.retestBy },
  ];

  return (
    <div className="p-2">
      <div className="relative">
        {/* Ticket Header */}
        <h2 className="text-2xl font-semibold mb-2">
          {" "}
          {/* Back Button */}
          <button
            onClick={onBack}
            className="mb-4 px-4 text-gray-600 cursor-pointer rounded"
          >
            <LuArrowLeft />
          </button>
          {ticket.ticketNumber}
        </h2>
        <span
          className={`px-2 py-1 text-sm font-medium absolute left-52 top-0 rounded-md ${
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
        <p className="text-gray-600 px-14 font-semibold">
          Project: {ticket.projectName}
        </p>
      </div>
      {/* Responsive Content Container */}
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        {/* Progress Section */}
        <div className="relative lg:w-[450px] h-[500px] bg-gray-100 text-center py-10 shadow-md rounded-xl">
          {progressStages.map((stage, index) => (
            <div key={index} className="relative flex items-start mb-10">
              {/* Circle Indicator */}
              <div className="relative z-10 px-4 ml-4 md:ml-[37%] lg:ml-12">
                {stage.user ? (
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                    ✓
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                )}
                {/* Vertical Line */}
                {/* Line Indicator */}
                {index < progressStages.length - 1 && (
                  <div
                    className={`absolute top-6 left-[25px] md:left-[46%] lg:left-[26px] h-[100px] w-[2px] ${
                      progressStages[index + 1].user
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                )}
              </div>

              {/* Stage Details */}
              <div className="px-3 w-[150px] h-[80px]">
                <p className="font-semibold text-gray-700 text-[10px] pb-1">
                  {stage.label}
                </p>
                {stage.user ? (
                  <div className="flex  m-1">
                    {stage.user.image && (
                      <img
                        src={stage.user.image}
                        alt="User"
                        className="w-10 h-10 rounded-full mr-2 border"
                      />
                    )}
                    <div>
                      <p className="font-medium text-sm">
                        {stage.user.name || stage.user}
                      </p>
                      {stage.user.date && (
                        <p className="text-xs text-gray-500">
                          {stage.user.date}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">-</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Ticket Details */}
        <div className="flex-1 bg-white p-6 shadow-md rounded-xl text-sm">
          <h3 className="font-semibold  mb-2">Ticket Details</h3>
          <p className="text-gray-700">{ticket.details}</p>

          {/* Attachments */}
          {ticket.attachments && (
            <div className="mt-6">
              <h4 className="font-semibold">
                Attachments ({ticket.attachments.index+1})
              </h4>
              {ticket.attachments.length > 0 && (
                <img
                  src={ticket.attachments}
                  alt="Attachment"
                  className="mt-2 w-36 h-32 border object-cover rounded-lg"
                />
              )}
            </div>
          )}

          {/* Remarks */}
          {ticket.remarks?.length > 0 && (
            <div className="mt-10">
              <h4 className="font-semibold ">{ticket.remarks?.length } Remarks </h4>
              {ticket.remarks.map((remark, i) => (
                <div
                  key={i}
                  className="mt-2 p-3  flex flex-col md:flex-row md:gap-x-16 items-center rounded-lg"
                >
                  <div className="flex items-center lg:flex-row flex-col  mb-4">
                    {remark.author?.image && (
                      <img
                        src={remark.author.image}
                        alt="User"
                        className="w-10 h-10 rounded-full border  mr-0"
                      />
                    )}
                    <div className=" mt-5 lg:mt-0 text-center w-[150px]">
                      <p className="text-sm font-semibold">
                        {remark.author?.name}
                      </p>
                      <p className="text-xs text-gray-500 ml-2">
                        on {remark.date}
                      </p>
                    </div>
                  </div>
                  <p className=" text-gray-700">{remark.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TicketDetails.propTypes = {
  ticket: PropTypes.shape({
    ticketNumber: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdBy: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.string,
        date: PropTypes.string,
      }),
    ]),
    assignedBy: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.string,
        date: PropTypes.string,
      }),
    ]),
    assignedTo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.string,
        date: PropTypes.string,
      }),
    ]),
    retestBy: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.string,
        date: PropTypes.string,
      }),
    ]),
    details: PropTypes.string.isRequired,
    attachments: PropTypes.arrayOf(PropTypes.string),
    remarks: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.shape({
          name: PropTypes.string,
          image: PropTypes.string,
        }),
        text: PropTypes.string,
        date: PropTypes.string,
      })
    ),
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default TicketDetails;
