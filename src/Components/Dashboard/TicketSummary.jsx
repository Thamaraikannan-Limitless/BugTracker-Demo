import { useState, useEffect } from "react";
import Calendar from "react-calendar"; // Import the calendar
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import PropTypes from "prop-types";
import { format, subWeeks, startOfWeek, endOfWeek } from "date-fns";

const formatDate = (dateString) => {
  return format(new Date(dateString), "MMM-dd-EEE"); // Example output: Feb-03-Mon
};

const SummaryTable = ({ data, columns,startDate,endDate }) => {
  const totals = columns.reduce((acc, col) => {
    acc[col.toLowerCase()] = data.reduce((sum, item) => sum + item[col.toLowerCase()], 0);
    return acc;
  }, {});

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="pt-2 pl-2 text-xs pb-2 text-[#9F9F9F] font-[600]">{format(startDate, "MMM-dd")} - {format(endDate, "MMM-dd")}</th>
          {columns.map((col) => (
            <th key={col} className="text-xs font-[600] text-[#9F9F9F]">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="p-2 border-b text-sm font-semibold border-[#D9D9D9]">{formatDate(item.date)}</td>
            {columns.map((col) => (
              <td key={col} className="p-2 border-b border-[#D9D9D9] text-sm font-[400]">
                {item[col.toLowerCase()]}
              </td>
            ))}
          </tr>
        ))}
        <tr className="font-[600]">
          <td className="p-2 border-b border-[#D9D9D9]"></td>
          {columns.map((col) => (
            <td key={col} className="p-2 border-b border-[#D9D9D9]">
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
      created: PropTypes.number,
      assigned: PropTypes.number,
      completed: PropTypes.number,
      reoccur: PropTypes.number,
      retest: PropTypes.number,
    })
  ).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate:PropTypes.instanceOf(Date).isRequired
  
};

const TicketSummary = ({ ticketData }) => {
  const [dateOption, setDateOption] = useState("This Week");
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (dateOption === "Custom Week") {
      setShowCalendar(true);
    }
  }, [dateOption]);

  const filterTicketData = () => {
    const today = new Date();
    let filteredData = [];
    let startDate, endDate;
    if (dateOption === "This Week") {
      startDate = startOfWeek(today);
      endDate = endOfWeek(today);
      filteredData = ticketData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    } else if (dateOption === "Previous Week") {
      startDate = startOfWeek(subWeeks(today, 1));
      endDate = endOfWeek( startDate );
      filteredData = ticketData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >=startDate && itemDate <= endDate;
      });
    } else if (dateOption === "Custom Week") {
       startDate = startOfWeek(selectedWeek);
       endDate = endOfWeek(selectedWeek);
      filteredData = ticketData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    return { filteredData, startDate, endDate };
  };

  const handleDateOptionChange = (option) => {
    setDateOption(option);
  };

  const handleWeekChange = (date) => {
    setSelectedWeek(date);
    setShowCalendar(false); // Close the calendar after selection
  };

  const handleOverlayClick = () => {
    setShowCalendar(false);
  };

  const { filteredData, startDate, endDate } = filterTicketData();

  return (
    <div className="bg-white p-6 rounded-xl relative">
      <div className="flex justify-between items-center flex-row   mb-4">
        <h2 className="text-[16px] pl-3 font-semibold">Ticket Summary</h2>
        <div className="flex md:gap-4 gap-2 pr-3 py-4 md:py-0">
          <select
            value={dateOption}
            onChange={(e) => handleDateOptionChange(e.target.value)}
            className="p-2 border-[#EAEEF7] border rounded-md text-xs"
          >
            <option value="This Week">This Week</option>
            <option value="Previous Week">Previous Week</option>
            <option value="Custom Week">Custom Week</option>
          </select>
        </div>
      </div>

      {showCalendar && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={handleOverlayClick}></div>}

      {showCalendar && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-50">
          <Calendar
            onChange={handleWeekChange}
            value={selectedWeek}
            view="month"
            maxDate={new Date()} // Disable future weeks
            tileDisabled={({ date }) => date > new Date()} // Disable tiles for future dates
          />
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
      created: PropTypes.number,
      assigned: PropTypes.number,
      completed: PropTypes.number,
      reoccur: PropTypes.number,
      retest: PropTypes.number,
    })
  ).isRequired,
};

export default TicketSummary;
