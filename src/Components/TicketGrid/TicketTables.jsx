import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";
import TableFilters from "./TableFilters";
import TicketAssignForm from "../Ticket/TicketAssignForm";
import AverageTime from "../Ticket/AverageTime";

import {
  getCreatedTabColumns,
  getAssignedTabColumns,
  getCompletedTabColumns,
  getDefaultColumns,
} from "./columnDefinitions";

ModuleRegistry.registerModules([AllCommunityModule]);

const TicketTables = ({ tickets, onSelectTicket }) => {
  const location = useLocation();
  const [paginationPageSize, setPaginationPageSize] = useState(10);
  // Initialize activeTab from location state if available, otherwise use "All"
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "All"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [gridData, setGridData] = useState(tickets);
  const [isAssignFormOpen, setIsAssignFormOpen] = useState(false);
  const [isAverageTimeFormOpen, setIsAverageTimeFormOpen] = useState(false);
  const gridRef = useRef(null);

  // Clear the location state after using it
  useEffect(() => {
    if (location.state?.activeTab) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
   // Function to open the assign form
   const openAssignForm = () => {
    setIsAssignFormOpen(true);
  };

  // Function to close the assign form
  const closeAssignForm = () => {
    setIsAssignFormOpen(false);
  }; 

  const openAverageTimeForm = () => {
    setIsAverageTimeFormOpen(true);
  };

  const closeAverageTimeForm = () => {
    setIsAverageTimeFormOpen(false);
  };

  // Process tickets based on activeTab
  useEffect(() => {
    let updatedData = [...tickets];

    if (activeTab === "Created") {
      updatedData = tickets
        .filter((ticket) => ticket.status === "Created")
        .map((ticket) => ({
          id: ticket.id,
          priority: ticket.priority,
          ticket: ticket.ticket,
          project: ticket.project,
          createdOn: ticket.createdOn,
          createdBy: {
            name: ticket.createdBy?.name,
            image: ticket.createdBy?.image,
          },
          reportedBy: {
            name: ticket.reportedBy?.name,
            image: ticket.reportedBy?.image,
          },
          action: "Assign to",
          status: ticket.status,
        }));
    } else if (activeTab === "Assigned") {
      updatedData = tickets
        .filter((ticket) => ticket.status === "Assigned")
        .map((ticket) => ({
          id: ticket.id,
          priority: ticket.priority,
          ticket: ticket.ticket,
          project: ticket.project,
          assignedOn: ticket.assignedOn,
          assignedBy: {
            name: ticket.assignedBy?.name,
            image: ticket.assignedBy?.image,
          },
          assignedTo: {
            name: ticket.assignedTo?.name,
            image: ticket.assignedTo?.image,
          },

          averageTime: ticket.averageTime,

          status: ticket.status,
        }));
    } else if (activeTab === "Completed") {
      updatedData = tickets
        .filter(
          (ticket) =>
            ticket.status === "Done" ||
            ticket.status === "ForRetest" ||
            (ticket.status === "ForReTest" && (ticket.status = "ForRetest"))
        )
        .map((ticket) => ({
          id: ticket.id,
          priority: ticket.priority,
          ticket: ticket.ticket,
          project: ticket.project,
          completedOn: ticket.completedOn,
          completedBy: {
            name: ticket.completedBy?.name,
            image: ticket.completedBy?.image,
          },
          retestTo: {
            name: ticket.retestTo?.name,
            image: ticket.retestTo?.image,
          },
          timeToFinish: ticket.timeToFinish,
          changeStatus: ticket.status,
          status: ticket.status,
        }));
    } else if (activeTab !== "All") {
      updatedData = tickets.filter((ticket) => ticket.status === activeTab);
    }

    setGridData(updatedData);
    setHiddenColumns([]);
  }, [activeTab, tickets]);

  // Handle ticket selection with active tab
  const handleTicketSelect = (ticket) => {
    onSelectTicket(ticket, activeTab);
  };

  // Filter data based on search query and applied filters
  const filteredData = gridData.filter((ticket) => {
    const matchesSearch =
      searchQuery === "" ||
      ticket.ticket?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.project?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = Object.entries(appliedFilters).every(
      ([key, value]) => {
        if (!value) return true;
        return ticket[key]?.toLowerCase() === value.toLowerCase();
      }
    );

    return matchesSearch && matchesFilters;
  });

  // Get appropriate columns based on active tab
  const getColumnsForTab = () => {
    switch (activeTab) {
      case "Created":
        return getCreatedTabColumns(handleTicketSelect, openAssignForm
        );

      case "Assigned":
        return getAssignedTabColumns(handleTicketSelect, openAverageTimeForm);
      case "Completed":
      case "ForRetest":
      case "Done":
        return getCompletedTabColumns(handleTicketSelect);
      default:
        return getDefaultColumns(handleTicketSelect);
    }
  };

  const allColumns = getColumnsForTab();
  // Filter columns based  preferences

  const columnDefs = allColumns.filter(
    (col) => !hiddenColumns.includes(col.field)
  );

  const defaultColDef = {
    resizable: false,
    filter: false,
    sortable: false,
    cellStyle: { border: "none" },
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
    <div className="">
      <TableHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <TableFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        appliedFilters={appliedFilters}
        clearFilter={clearFilter}
        clearAllFilters={clearAllFilters}
        onApplyFilters={handleApplyFilters}
        allColumns={allColumns}
        hiddenColumns={hiddenColumns}
        setHiddenColumns={setHiddenColumns}
        activeTab={activeTab}
      />

      {/* Overlay */}

      {isAssignFormOpen && (
        <div
          className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-10"
          onClick={closeAssignForm}
        ></div>
      )}

      {/* TicketAssignForm */}
      <div
        className={`fixed md:top-[72px] top-[56px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-20 w-[380px] shadow-md transform ${
          isAssignFormOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out overflow-y-auto`}
      >
        {isAssignFormOpen && (
          <TicketAssignForm onClose={closeAssignForm} />
        )}
      </div>

      {/* Overlay for AverageTime Form */}
      {isAverageTimeFormOpen && (
        <div
          className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-10"
          onClick={closeAverageTimeForm}
        ></div>
      )}

      {/* AverageTime Form */}
      <div
        className={`fixed md:top-[30%] top-[20%] right-[36%] md:w-[480px] bg-white z-20 w-[380px] rounded-md transform ${
          isAverageTimeFormOpen ? "translate-y-0" : "translate-y-full"
        } transition-transform duration-500 ease-in-out overflow-y-auto`}
      >
        {isAverageTimeFormOpen && (
          <AverageTime onClose={closeAverageTimeForm} />
        )}
      </div>

      <div className="ag-theme-quartz h-[450px] w-full overflow-x-auto">
        <AgGridReact
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={[10, 25, 50, 100]}
          onGridReady={(params) => {
            gridRef.current = params;
          }}
          onPaginationChanged={(params) => {
            setPaginationPageSize(params.api.paginationGetPageSize());
          }}
          context={{ onSelectTicket: handleTicketSelect }}
        />
      </div>
    </div>
  );
};

TicketTables.propTypes = {
  tickets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      priority: PropTypes.string.isRequired,
      ticket: PropTypes.string.isRequired,
      project: PropTypes.string.isRequired,
      createdOn: PropTypes.string,
      assignedOn: PropTypes.string,
      completedOn: PropTypes.string,
      status: PropTypes.string.isRequired,
      timeToAllocate: PropTypes.string,
      timeToFinish: PropTypes.string,
    })
  ).isRequired,
  onSelectTicket: PropTypes.func.isRequired,
};

export default TicketTables;
