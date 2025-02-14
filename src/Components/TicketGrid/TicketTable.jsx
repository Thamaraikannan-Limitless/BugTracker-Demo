import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import PropTypes from "prop-types";
import { CiViewColumn } from "react-icons/ci";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { FiFilter } from "react-icons/fi";
import TicketFilterForm from "./TicketFilterForm";

ModuleRegistry.registerModules([AllCommunityModule]);

const TicketTable = ({ tickets, onSelectTicket }) => {
  const [paginationPageSize, setPaginationPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectAllColumns, setSelectAllColumns] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
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

  const MoreOptions = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer text-sm focus:outline-none"
        >
          <FiMoreVertical className="cursor-pointer mt-4" />
        </button>
        {isOpen && (
          <div className="fixed right-7 mr-2 top-0 bg-white border border-gray-300 rounded-md shadow-lg z-20 w-40">
            <ul className="text-sm">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => onSelectTicket(params.data.id)}
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

  // const filters = ["Projects", "Priority", "Status", "Developer", "Tester"];

  const filteredData = tickets.filter(
    (ticket) =>
      (activeTab === "All" || ticket.status === activeTab) &&
      (ticket.ticket.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.project.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const allColumns = [
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
      // flex: 1,
      minWidth: 10,
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
      pinned: "right",
    },
  ];

  const columnDefs = allColumns.filter(
    (col) => !hiddenColumns.includes(col.field)
  );

  const defaultColDef = {
    resizable: false,
    filter: false,
    sortable: false,
    cellStyle: { border: "none" },
  };

  const handleColumnToggle = (field) => {
    setHiddenColumns((prev) =>
      prev.includes(field)
        ? prev.filter((col) => col !== field)
        : [...prev, field]
    );
  };

  const handleSelectAllToggle = () => {
    if (selectAllColumns) {
      setHiddenColumns([]);
    } else {
      setHiddenColumns(allColumns.map((col) => col.field));
    }
    setSelectAllColumns(!selectAllColumns);
  };
  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
  };

  const clearFilter = (key) => {
    setAppliedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      delete updatedFilters[key];
      return updatedFilters;
    });
  };

  const clearAllFilters = () => {
    setAppliedFilters({});
  };
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-8 mb-2 flex-wrap border-b-[1px] text-[16px] font-semibold border-[#EDEDED]">
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

      {/* Columnn filters */}
      <div className="flex flex-wrap text-[14px] gap-4 mb-2 items-center">
        {/* Applied filter starts */}
        <div className="flex flex-wrap text-[14px]  gap-4 mb-2 items-center">
          <span className="font-normal">Applied Filters:</span>
          {Object.keys(appliedFilters).length > 0 ? (
            Object.entries(appliedFilters).map(([key, value]) => (
              <div
                key={key}
                className="bg-[#EDEDED] px-3 py-1 rounded flex items-center border border-[#9F9F9F]"
              >
                <span className="mr-2 text-xs capitalize">
                  {key}: {value}
                </span>
                <button
                  onClick={() => clearFilter(key)}
                  className="text-red-400 font-bold"
                >
                  ✕
                </button>
              </div>
            ))
          ) : (
            <span className="text-gray-500">No filters applied</span>
          )}
          {Object.keys(appliedFilters).length > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-red-600 border border-red-500 px-2 py-1 rounded"
            >
              Clear all Filters
            </button>
          )}
        </div>
        {/* {filters.map((filter, index) => (
          <div
            key={filter}
            className="flex items-center space-x-2 pr-2 relative"
          >
            <label className="mr-2 font-normal label-content">{filter}</label>:
            <select className="pr-0 pl-0">
              <option>All</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            {index !== filters.length - 1 && (
              <div className="absolute right-2 top-1/4 h-4 border-r-2 border-gray-300"></div>
            )}
          </div>
        ))} */}

        {/* Applied filter ends */}
        {/* Search */}
        <div className="flex items-center border border-[#9F9F9F] rounded-xl px-2 py-1 ml-auto w-40">
          <FiSearch className="mr-2 text-[#9F9F9F]" />
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          {/* Filter Icon */}
          <Tippy content={`Filters`} placement="top" arrow={true}>
            <div className="flex justify-end">
              <FiFilter
                size={21}
                className="cursor-pointer font-light"
                onClick={() => setIsFilterOpen(true)}
              />
            </div>
          </Tippy>

          {/* Show Filter Form when isFilterOpen is true */}
          {isFilterOpen && (
            <TicketFilterForm
              onClose={() => setIsFilterOpen(false)}
              onApplyFilters={handleApplyFilters}
            />
          )}
        </div>
        <div className="relative">
          <div className="flex">
            <Tippy content={`Toggle Column`} placement="top" arrow={true}>
              <button
                className="cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <CiViewColumn className="text-2xl font-bold" />
              </button>
            </Tippy>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 bg-white border-gray-300 mt-1 rounded shadow-md z-10">
              <label className="flex items-center px-2 w-44 py-1.5 text-[12px] font-medium border-b border-gray-100 hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={selectAllColumns}
                  onChange={handleSelectAllToggle}
                  className="mr-2"
                />
                All
              </label>
              {allColumns.map((col) => (
                <label
                  key={col.field}
                  className="flex items-center px-2 w-44 py-1.5 text-[12px] font-light lowercase border-b border-gray-100 hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={!hiddenColumns.includes(col.field)}
                    onChange={() => handleColumnToggle(col.field)}
                    className="mr-2"
                  />
                  {col.headerName}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="ag-theme-quartz h-[450px] w-full overflow-x-auto">
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
