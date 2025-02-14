import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import PropTypes from "prop-types";
import { format, subWeeks, startOfWeek, endOfWeek } from "date-fns";

const formatDate = (dateString) => {
  return format(new Date(dateString), "MMM-dd-EEE");
};

const SummaryTable = ({ data, columns, startDate, endDate }) => {
  const totals = columns.reduce((acc, col) => {
    acc[col.toLowerCase()] = data.reduce(
      (sum, item) => sum + item[col.toLowerCase()],
      0
    );
    return acc;
  }, {});

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="pt-2 text-xs pb-2 text-[#9F9F9F] font-[600]">
            {format(startDate, "MMM-dd")} - {format(endDate, "MMM-dd")}
          </th>
          {columns.map((col) => (
            <th
              key={col}
              className="text-xs font-[600] text-[#9F9F9F] whitespace-nowrap"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="pt-2 border-b pb-2 text-sm font-semibold border-[#D9D9D9] whitespace-nowrap">
              {formatDate(item.date)}
            </td>
            {columns.map((col) => (
              <td
                key={col}
                className="p-2 border-b border-[#D9D9D9] text-sm font-[400] whitespace-nowrap"
              >
                {item[col.toLowerCase()]}
              </td>
            ))}
          </tr>
        ))}
        <tr className="font-[600]">
          <td className="p-2 border-b border-[#D9D9D9]"></td>
          {columns.map((col) => (
            <td
              key={col}
              className="p-2 border-b border-[#D9D9D9] whitespace-nowrap"
            >
              {totals[col.toLowerCase()]}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

SummaryTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      assigned: PropTypes.number.isRequired,
      completed: PropTypes.number.isRequired,
      reoccur: PropTypes.number.isRequired,
      retest: PropTypes.number.isRequired,
    })
  ).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
};

const TicketSummary = ({ ticketData }) => {
  const [dateOption, setDateOption] = useState("This Week");
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [startDate, setStartDate] = useState(startOfWeek(new Date()));
  const [endDate, setEndDate] = useState(endOfWeek(new Date()));
  const [showCalendar, setShowCalendar] = useState(false);
  const [firstClickDate, setFirstClickDate] = useState(null);

  useEffect(() => {
    if (dateOption === "This Week") {
      setStartDate(startOfWeek(new Date()));
      setEndDate(endOfWeek(new Date()));
    } else if (dateOption === "Previous Week") {
      setStartDate(startOfWeek(subWeeks(new Date(), 1)));
      setEndDate(endOfWeek(subWeeks(new Date(), 1)));
    } else if (dateOption === "Custom Week") {
      setShowCalendar(true);
    }
  }, [dateOption]);

  const handleWeekChange = (info) => {
    const clickedDate = new Date(info.date);
    if (clickedDate > new Date()) return;

    if (firstClickDate === null) {
      setFirstClickDate(clickedDate);
      setStartDate(startOfWeek(clickedDate));
      setEndDate(endOfWeek(clickedDate));
    } else {
      setSelectedWeek(clickedDate);
      setShowCalendar(false);
      setFirstClickDate(null);
    }
  };

  const closeCalendar = (e) => {
    if (e.target.id === "calendar-overlay") {
      setShowCalendar(false);
      setFirstClickDate(null);
    }
  };

  const filteredData = ticketData.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });

  return (
    <div className="bg-white p-6 rounded-xl relative">
      <div className="flex justify-between items-center flex-row mb-4">
        <h2 className="text-[16px] pl-3 font-semibold">TicketSummary</h2>
        <div className="flex gap-x-2">
          <select
            value={dateOption}
            onChange={(e) => setDateOption(e.target.value)}
            className="p-2 border-[#EAEEF7] border rounded-md text-xs"
          >
            <option value="This Week">This Week</option>
            <option value="Previous Week">Previous Week</option>
            <option value="Custom Week">Custom Week</option>
          </select>
        </div>
      </div>

      {showCalendar && (
        <div
          id="calendar-overlay"
          className="form-overlay flex justify-center items-center z-50"
          onClick={closeCalendar}
        >
          <div className="bg-white w-[400px] h-[400px] p-6 shadow-lg relative">
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs"
            >
              X
            </button>
            <h3 className="text-center text-lg font-semibold mb-3">
              Select a Week
            </h3>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              selectable={true}
              dateClick={handleWeekChange}
              dayCellClassNames={({ date }) => {
                const today = new Date();
                if (date > today) return "opacity-50 pointer-events-none";
                return date >= startDate && date <= endDate
                  ? "bg-yellow-300 rounded-md"
                  : "";
              }}
              dayHeaderContent={() => ""} // Remove today label
            />
          </div>
        </div>
      )}

      <SummaryTable
        data={filteredData}
        columns={["Created", "Assigned", "Completed", "Reoccur", "Retest"]}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

TicketSummary.propTypes = {
  ticketData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      created: PropTypes.number.isRequired,
      assigned: PropTypes.number.isRequired,
      completed: PropTypes.number.isRequired,
      reoccur: PropTypes.number.isRequired,
      retest: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TicketSummary;
