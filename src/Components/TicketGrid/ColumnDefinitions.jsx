// File: components/tickets/columnDefinitions.js
import { MdOutlineModeEdit } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";

// Cell renderers

export const StatusCellRenderer = (params) => {
  const statusColors = {
    Created: "bg-[#ECBF50] text-white",
    Assigned: "bg-[#E5927A] text-white",
    ForRetest: "bg-[#FF0000] text-white",
    Done: "bg-[#00C875] text-white",
    NotDone: "bg-[#6141AC] text-white",
  };

  return (
    <span
      className={`px-2 py-1 rounded ${
        statusColors[params.value] || "bg-gray-300"
      }`}
    >
      {params.value}
    </span>
  );
};
StatusCellRenderer.displayName = "StatusCellRenderer";

export const PriorityIndicatorRenderer = (params) => {
  const priorityColors = {
    High: "bg-[#E2445C]",
    Medium: "bg-[#FDAB3D]",
    Low: "bg-[#DBC72D]",
  };

  return (
    <span
      className={`w-3 h-3 inline-block rounded-full mr-1 ${
        priorityColors[params.value] || "bg-gray-300"
      }`}
    ></span>
  );
};
PriorityIndicatorRenderer.displayName = "PriorityIndicatorRenderer";

export const MoreOptionsRenderer = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);

    if (!isOpen) {
      window.addEventListener("click", handleClose);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    window.removeEventListener("click", handleClose);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="cursor-pointer text-sm focus:outline-none"
      >
        <FiMoreVertical className="cursor-pointer mt-4" />
      </button>
      {isOpen && (
        <div
          className="fixed right-7 mr-2 top-0 bg-white border border-gray-300 rounded-md shadow-lg z-20 w-40"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="text-sm">
            <li
              className="px-4 py-2 border-b border-[#cfcfcf] hover:bg-gray-100 cursor-pointer"
              onClick={() => props.context.onSelectTicket(props.data.id)}
            >
              View
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Assign to
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Send for Retest
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
MoreOptionsRenderer.displayName = "MoreOptionsRenderer";

export const TicketLinkRenderer = (props) => (
  <div className="flex items-center space-x-1 cursor-pointer">
    <PriorityIndicatorRenderer value={props.data.priority} />
    <a
      onClick={(e) => {
        e.preventDefault();
        props.onSelectTicket(props.data.id);
      }}
      className="ml-2 cursor-pointer font-semibold text-[#1358D0]"
    >
      {props.value}
    </a>
  </div>
);
TicketLinkRenderer.displayName = "TicketLinkRenderer";

// Cell renderer for user profiles
export const UserProfileRenderer = (props) => {
  return (
    <div className="flex items-center">
      <img
        src={
          props.data[props.colDef.field.split(".")[0]]?.image ||
          "/default-avatar.png"
        }
        alt={props.value}
        className="w-8 h-8 rounded-full mr-2"
      />
      <span>{props.value}</span>
    </div>
  );
};
UserProfileRenderer.displayName = "UserProfileRenderer";

// Action button renderer
export const ActionButtonRenderer = (props) => (
 
  <button  onClick={() => props.openAssignForm()}
   className="text-[#034C41] px-4 py-1 border border-[#034C41] cursor-pointer rounded-md text-sm">
    Assign to
  </button>
);
ActionButtonRenderer.displayName = "ActionButtonRenderer";

// Edit time renderer

export const EditTimeRenderer = (props) => {
  // If the value is empty or null, plus icon
  if (!props.value) {
    return (
      <div className="flex items-center ms-10 mt-2">
        <button className="text-green-600 rounded-md cursor-pointer text-xl">
          <FaSquarePlus />
        </button>
      </div>
    );
  }

  // Otherwise time with edit button
  return (
    <div className="flex items-center">
      <span className="mr-2">{props.value}</span>
      <button className="text-gray-500 hover:text-gray-700 cursor-pointer ms-2 text-[#9F9F9F] text-lg">
        <MdOutlineModeEdit />
      </button>
    </div>
  );
};
EditTimeRenderer.displayName = "EditTimeRenderer";

// Change status renderer
export const ChangeStatusRenderer = (props) => {
  const statuses = {
    ForRetest: {
      color: "bg-red-600 text-white",
      icon: "0",
    },
    Done: {
      color: "bg-green-500 text-white",
      icon: "",
    },
  };

  const status = statuses[props.value] || statuses["ForRetest"];

  return (
    <div className="flex items-center">
      <span className={`px-3 py-0 rounded ${status.color}`}>{props.value}</span>
      {status.icon && (
        <span className="ml-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white text-xs">
          {status.icon}
        </span>
      )}
    </div>
  );
};
ChangeStatusRenderer.displayName = "ChangeStatusRenderer";

// Column definitions
export const getCreatedTabColumns = (onSelectTicket,openAssignForm) => [
  {
    headerName: "TICKET #",
    field: "ticket",
    cellRenderer: TicketLinkRenderer,
    cellRendererParams: { onSelectTicket },
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 100,
    pinned: "left",
  },
  {
    headerName: "PROJECT",
    field: "project",
    sortable: false,
    filter: false,
    // flex: 1,
    minWidth: 300,
  },
  {
    headerName: "CREATED ON",
    field: "createdOn",
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: "CREATED BY",
    field: "createdBy.name",
    cellRenderer: UserProfileRenderer,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: "REPORTED BY",
    field: "reportedBy.name",
    cellRenderer: UserProfileRenderer,
    flex: 1,
    minWidth: 200,
  },
  {
    headerName: "ACTION",
    field: "action",
    cellRenderer: ActionButtonRenderer,
    cellRendererParams: { openAssignForm }, //pass the function to open form
    flex: 1,
    minWidth: 100,
    pinned: "right",
  },
];

export const getAssignedTabColumns = (onSelectTicket) => [
  {
    headerName: "TICKET #",
    field: "ticket",
    cellRenderer: TicketLinkRenderer,
    cellRendererParams: { onSelectTicket },
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 150,
    pinned: "left",
  },
  {
    headerName: "PROJECT",
    field: "project",
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 250,
  },
  {
    headerName: "ASSIGNED ON",
    field: "assignedOn",
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "ASSIGNED BY",
    field: "assignedBy.name",
    cellRenderer: UserProfileRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "ASSIGNED TO",
    field: "assignedTo.name",
    cellRenderer: UserProfileRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "AVERAGE TIME",
    field: "averageTime",
    cellRenderer: EditTimeRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "",
    field: "moreOptions",
    cellRenderer: MoreOptionsRenderer,
    cellRendererParams: { context: { onSelectTicket } },
    width: 10,
    pinned: "right",
  },
];

export const getCompletedTabColumns = (onSelectTicket) => [
  {
    headerName: "TICKET #",
    field: "ticket",
    cellRenderer: TicketLinkRenderer,
    cellRendererParams: { onSelectTicket },
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 120,
    pinned: "left",
  },
  {
    headerName: "PROJECT",
    field: "project",
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 120,
  },
  {
    headerName: "COMPLETED BY",
    field: "completedBy.name",
    cellRenderer: UserProfileRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "COMPLETED ON",
    field: "completedOn",
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "RETEST TO",
    field: "retestTo.name",
    cellRenderer: UserProfileRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "TIME TO FINISH",
    field: "timeToFinish",
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "CHANGE STATUS",
    field: "changeStatus",
    cellRenderer: ChangeStatusRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "",
    field: "moreOptions",
    cellRenderer: MoreOptionsRenderer,
    cellRendererParams: { context: { onSelectTicket } },
    width: 10,
    pinned: "right",
  },
];

export const getDefaultColumns = (onSelectTicket) => [
  {
    headerName: "TICKET #",
    field: "ticket",
    cellRenderer: TicketLinkRenderer,
    cellRendererParams: { onSelectTicket },
    sortable: false,
    filter: false,
    minWidth: 150,
    pinned: "left",
  },
  {
    headerName: "PROJECT",
    field: "project",
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "CREATED ON",
    field: "createdOn",
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "ASSIGNED ON",
    field: "assignedOn",
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "COMPLETED ON",
    field: "completedOn",
    sortable: false,
    filter: false,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "STATUS",
    field: "status",
    cellRenderer: StatusCellRenderer,
    flex: 1,
    minWidth: 150,
  },
  {
    headerName: "TIME TO ALLOCATE",
    field: "timeToAllocate",
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "TIME TO FINISH",
    field: "timeToFinish",
    minWidth: 150,
    flex: 1,
  },
  {
    headerName: "",
    field: "moreOptions",
    cellRenderer: MoreOptionsRenderer,
    cellRendererParams: { context: { onSelectTicket } },
    width: 10,
    pinned: "right",
  },
];
