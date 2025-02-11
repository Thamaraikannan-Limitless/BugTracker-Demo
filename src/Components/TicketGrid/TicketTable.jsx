import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import PropTypes from "prop-types";

// AG-Grid module register
ModuleRegistry.registerModules([AllCommunityModule]);

const TicketTable = ({ tickets, onSelectTicket }) => {
  const [paginationPageSize, setPaginationPageSize] = useState(10);
  const statusCellRenderer = (params) => {
    const statusColors = {
      Created: "bg-[#ECBF50] text-white",
      Assigned: "bg-[#E5927A] text-white",
      ForRetest: "bg-[#FF0000] text-white",
      Completed: "bg-[#00C875] text-white",
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

  const priorityIndicatorRenderer = (params) => {
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

  const MoreOptions = (params) => {
    if (!params || !params.data) return null;
    return (
      <a
        href={`#${params.data.ticket}-options`}
        className="cursor-pointer text-sm"
      >
        <FiMoreVertical className="cursor-pointer mt-4" />
      </a>
    );
  };

  const filters = ["Projects", "Priority", "Status", "Developer", "Tester"];

  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = tickets.filter(
    (ticket) =>
      (activeTab === "All" || ticket.status === activeTab) &&
      (ticket.ticket.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.project.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const columnDefs = [
    {
      headerName: "TICKET #",
      field: "ticket",
      cellRenderer: (params) => (
        <div className="flex items-center space-x-1 cursor-pointer">
          {priorityIndicatorRenderer({ value: params.data.priority })}
          <a
            href={`#${params.value}`}
            className="text-blue-500 ml-2 cursor-pointer font-semibold text-[#1358D0]"
            onClick={() => onSelectTicket(params.data.id)}
          >
            {params.value}
          </a>
        </div>
      ),
      sortable: false,
      filter: false,
      flex: 1,
      minWidth: 150,
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
      cellRenderer: statusCellRenderer,
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
      cellRenderer: MoreOptions,
      width: 1,
    },
  ];

  const defaultColDef = {
    resizable: false,
    filter: false,
    sortable: false,
    cellStyle: { border: "none" },
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-8 mb-2 flex-wrap  border-b-[1px] text-[16px] font-semibold border-[#EDEDED]">
        {["All", "Created", "Assigned", "Completed"].map((tab) => (
          <div
            key={tab}
            className={`cursor-pointer pb-2 ${
              activeTab === tab
                ? "border-b-2 border-black"
                : "hover:border-b-2 hover:border-gray-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap text-[14px] font-medium gap-4 mb-2">
        {filters.map((filter, index) => (
          <div
            key={filter}
            className="flex items-center space-x-2 pr-2 relative"
          >
            <label className="mr-2 font-normal">{filter}: </label>
            <select className="pr-0 pl-0">
              <option>All</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>

            {index !== filters.length - 1 && (
              <div className="absolute right-2 top-1/4 h-4 border-r-2 border-gray-300"></div>
            )}
          </div>
        ))}
        <div className="ml-auto flex items-center border border-[#9F9F9F] rounded-xl px-2 py-1 ">
          <FiSearch className="mr-2 text-[#9F9F9F]" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="ag-theme-quartz h-[460px] w-full  overflow-x-auto">
        <AgGridReact
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={[10, 25, 50, 100]}
          onPaginationChanged={(params) => {
            setPaginationPageSize(params.api.paginationGetPageSize());
          }}
        />
      </div>
    </div>
  );
};

TicketTable.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      priority: PropTypes.string.isRequired,
      ticket: PropTypes.string.isRequired,
      project: PropTypes.string.isRequired,
      createdOn: PropTypes.string.isRequired,
      assignedOn: PropTypes.string,
      completedOn: PropTypes.string,
      status: PropTypes.string.isRequired,
      timeToAllocate: PropTypes.string.isRequired,
      timeToFinish: PropTypes.string,
    })
  ).isRequired,
  onSelectTicket: PropTypes.func.isRequired,
};

export default TicketTable;
