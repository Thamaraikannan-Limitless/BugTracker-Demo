import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { subWeeks, startOfWeek, endOfWeek } from "date-fns";

const SummaryTable = ({ data, columns }) => {
  const totals = columns.reduce((acc, col) => {
    acc[col.toLowerCase()] = data.reduce((sum, item) => sum + item[col.toLowerCase()], 0);
    return acc;
  }, {});

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="pt-10 pl-2 text-xs pb-2 text-[#9F9F9F] font-[600]">FEB-10-FEB-14</th>
          {columns.map((col) => (
            <th key={col} className="  text-xs font-[600] text-[#9F9F9F]">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="p-2 border-b border-r border-l text-sm font-semibold border-[#D9D9D9]">{item.date}</td>
            {columns.map((col) => (
              <td key={col} className="p-2 border-b border-r border-l border-[#D9D9D9] text-sm font-[400]">
                {item[col.toLowerCase()]}
              </td>
            ))}
          </tr>
        ))}
        <tr className="font-[600]">
          <td className="p-2 border-b border-r border-l border-[#D9D9D9]"></td>
          {columns.map((col) => (
            <td key={col} className="p-2 border-b border-r border-l border-[#D9D9D9]">
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
};

const TicketSummary = ({ ticketData }) => {
  const [dateOption, setDateOption] = useState("This Week");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const filterTicketData = () => {
    const today = new Date();
    let filteredData = [];

    if (dateOption === "This Week") {
      const startOfWeekDate = startOfWeek(today);
      const endOfWeekDate = endOfWeek(today);
      filteredData = ticketData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfWeekDate && itemDate <= endOfWeekDate;
      });
    } else if (dateOption === "Previous Week") {
      const previousWeekStart = startOfWeek(subWeeks(today, 1));
      const previousWeekEnd = endOfWeek(previousWeekStart);
      filteredData = ticketData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= previousWeekStart && itemDate <= previousWeekEnd;
      });
    } else if (dateOption === "Custom Week") {
      filteredData = ticketData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    return filteredData;
  };

  const handleDateOptionChange = (option) => {
    setDateOption(option);
    const today = new Date();

    if (option === "This Week") {
      setStartDate(startOfWeek(today));
      setEndDate(endOfWeek(today));
    } else if (option === "Previous Week") {
      const previousWeekStart = startOfWeek(subWeeks(today, 1));
      setStartDate(previousWeekStart);
      setEndDate(endOfWeek(previousWeekStart));
    }
  };

  const filteredData = filterTicketData();

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex justify-between md:items-center md:flex-row flex-col  mb-4">
        <h2 className="text-[16px] pl-3 font-semibold">Ticket Summary</h2>
        <div className="flex md:gap-4 gap-2 pr-3 py-4 md:py-0 ">
          <select
            value={dateOption}
            onChange={(e) => handleDateOptionChange(e.target.value)}
            className="p-2 border rounded-md  text-xs"
          >
            <option value="This Week">This Week</option>
            <option value="Previous Week">Previous Week</option>
            <option value="Custom Week">Custom Week</option>
          </select>

          {dateOption === "Custom Week" && (
            <>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM d, yyyy"
                maxDate={new Date()}
                placeholderText="Start Date"
                className="p-2 border rounded-md"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="MMMM d, yyyy"
                maxDate={new Date()}
                placeholderText="End Date"
                className="p-2 border rounded-md"
              />
            </>
          )}
        </div>
      </div>
      <SummaryTable
        data={filteredData}
        columns={["Created", "Assigned", "Completed", "Reoccur", "Retest"]}
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
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  setSelectedDate: PropTypes.func.isRequired,
};

export default TicketSummary;