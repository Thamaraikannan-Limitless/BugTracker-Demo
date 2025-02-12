import { useState, useEffect } from "react";
import Calendar from "react-calendar"; // Import the calendar
import "react-calendar/dist/Calendar.css";
import PropTypes from "prop-types";
import { format, subWeeks, startOfWeek, endOfWeek } from "date-fns";

const formatDate = (dateString) => {
  return format(new Date(dateString), "MMM-dd-EEE"); // Example output: Feb-03-Mon
};

const SummaryTable = ({ data, columns, nameChange }) => {
  const totals = columns.reduce((acc, col) => {
    acc[col.toLowerCase()] = data.reduce((sum, item) => sum + item[col.toLowerCase()], 0);
    return acc;
  }, {});

  return (
    <div className="flex  gap-x-10  ">
      <div className="md:w-[80px] w-[100px] text-center pt-2">
        <img
          className="w-18 h-18  max-w-[120%] rounded-full"
          src="https://picsum.photos/seed/picsum/200/300"
          alt=""
        />
        <h4 className="pt-2 text-xs font-semibold">{nameChange}</h4>
        <p className="text-xs  font-light">Developer</p>
      </div>
      <table className="w-full   text-left border-collapse">
        <thead>
          <tr>
            <th className="pt-2 text-xs pb-2 w-[30%] text-[#9F9F9F] font-[600]">
              FEB-10-FEB-14
            </th>
            {columns.map((col) => (
              <th
                key={col}
                className="lg:w-[14%] md:p-[2px] text-xs font-[600] text-[#9F9F9F]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="pt-2 border-b pb-2 text-sm font-semibold border-[#D9D9D9]">
                {formatDate(item.date)}
              </td>
              {columns.map((col) => (
                <td
                  key={col}
                  className="p-2 border-b border-[#D9D9D9] text-sm font-[400]"
                >
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
    </div>
  );
};

SummaryTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      assigned: PropTypes.number,
      completed: PropTypes.number,
      reoccur: PropTypes.number,
      retest: PropTypes.number,
    })
  ).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  nameChange: PropTypes.string.isRequired,
};

const DeveloperWise = ({ developerData }) => {
  const [dateOption, setDateOption] = useState("This Week");
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [nameChange, setName] = useState("");

  useEffect(() => {
    if (dateOption === "Custom Week") {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
    }
  }, [dateOption]);

  const filterTicketData = () => {
    const today = new Date();
    let filteredData = [];

    if (dateOption === "This Week") {
      const startOfWeekDate = startOfWeek(today);
      const endOfWeekDate = endOfWeek(today);
      filteredData = developerData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfWeekDate && itemDate <= endOfWeekDate;
      });
    } else if (dateOption === "Previous Week") {
      const previousWeekStart = startOfWeek(subWeeks(today, 1));
      const previousWeekEnd = endOfWeek(previousWeekStart);
      filteredData = developerData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= previousWeekStart && itemDate <= previousWeekEnd;
      });
    } else if (dateOption === "Custom Week") {
      const startDate = startOfWeek(selectedWeek);
      const endDate = endOfWeek(selectedWeek);
      filteredData = developerData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }
    return filteredData;
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDateOptionChange = (option) => {
    setDateOption(option);
  };

  const handleWeekChange = (date) => {
    setSelectedWeek(date);
    setShowCalendar(false);
  };

  const handleOverlayClick = () => {
    setShowCalendar(false);
  };

  const filteredData = filterTicketData();

  return (
    <div className="bg-white p-6 rounded-xl relative">
      <div className="flex justify-between items-center flex-row  mb-4">
        <h2 className="text-[16px] pl-3 font-semibold">Developer Wise</h2>
        <div className="flex gap-x-2">
          <div className="py-4 md:py-0">
            <select
              onChange={handleNameChange}
              className="p-2 border rounded-md border-[#EAEEF7] text-xs"
            >
              <option value="">Select</option>
              <option value="Kannan">Kannan</option>
              <option value="Krishna">Krishna</option>
              <option value="Thamarai">Thamarai</option>
            </select>
          </div>
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
     </div>
      {showCalendar && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={handleOverlayClick}></div>}

      {showCalendar && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-50">
          <Calendar
            onChange={handleWeekChange}
            value={selectedWeek}
            view="month"
            maxDate={new Date()}
            tileDisabled={({ date }) => date > new Date()}
          />
        </div>
      )}

      <SummaryTable
        data={filteredData}
        columns={["Assigned", "Completed", "Reoccur", "Retest"]}
        nameChange={nameChange}
      />
    </div>
  );
};
DeveloperWise.propTypes = {
  developerData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      assigned: PropTypes.number,
      completed: PropTypes.number,
      reoccur: PropTypes.number,
      retest: PropTypes.number,
    })
  ).isRequired,
 
};
export default DeveloperWise;