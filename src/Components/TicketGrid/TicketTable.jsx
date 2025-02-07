import React, { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { FiMoreVertical, FiSearch } from "react-icons/fi";

ModuleRegistry.registerModules([AllCommunityModule]);

const statusCellRenderer = (params) => {
  const statusColors = {
    Created: "bg-yellow-500 text-white",
    Assigned: "bg-orange-500 text-white",
    ForRetest: "bg-red-500 text-white",
    Completed: "bg-green-500 text-white",
    NotDone: "bg-purple-500 text-white",
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
    High: "bg-red-500",
    Medium: "bg-orange-500",
    Low: "bg-yellow-500",
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
      <FiMoreVertical className="cursor-pointer" />
    </a>
  );
};

const filters = ["Projects", "Priority", "Status", "Developer", "Tester"];

const TicketTable = () => {
  const [gridApi, setGridApi] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationPageSize, setPaginationPageSize] = useState(10);

  const rowData = [
    {
      priority: "High",
      ticket: "TK000001",
      project: "Project 1",
      createdOn: "20 Jan",
      assignedOn: "21 Jan",
      completedOn: "28 Jan",
      status: "Completed",
      timeToAllocate: "2 days (16 hrs)",
      timeToFinish: "2 days (16 hrs)",
    },
    {
      priority: "Medium",
      ticket: "TK000002",
      project: "Project 2",
      createdOn: "22 Jan",
      assignedOn: "-",
      completedOn: "-",
      status: "Created",
      timeToAllocate: "2 days (16 hrs)",
      timeToFinish: "-",
    },
    {
      priority: "Low",
      ticket: "TK000003",
      project: "Project 3",
      createdOn: "23 Jan",
      assignedOn: "24 Jan",
      completedOn: "30 Jan",
      status: "For Retest",
      timeToAllocate: "3 days (24 hrs)",
      timeToFinish: "1 day (8 hrs)",
    },
  ];

  const filteredData = rowData.filter(
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
            className="text-blue-500 underline cursor-pointer"
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
      width: 10,
    },
  ];

  const defaultColDef = {
    resizable: false,
    filter: false,
    sortable: false,
    cellStyle: { border: "none" },
  };

  return (
    <section>
      <div className="w-full py-2 overflow-x-auto">
        <div className="flex space-x-4 mb-2 flex-wrap">
          {["All", "Created", "Assigned", "Completed"].map((tab) => (
            <div
              key={tab}
              className={`cursor-pointer pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-black font-semibold"
                  : "hover:border-b-2 hover:border-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
          <div className="ml-auto flex items-center border rounded-xl px-2 py-1">
            <FiSearch className="mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap space-x-2 mb-4">
          {filters.map((filter) => (
            <div key={filter} className="flex items-center space-x-1">
              <label>{filter}: </label>
              <select className="">
                <option>All</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
          ))}
        </div>

        <div className="ag-theme-quartz h-[600px] w-full border-none overflow-x-auto">
          <AgGridReact
            rowData={filteredData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            domLayout="autoHeight"
            pagination={true}
            paginationPageSize={paginationPageSize}
          />
        </div>
      </div>
    </section>
  );
};

export default TicketTable;
