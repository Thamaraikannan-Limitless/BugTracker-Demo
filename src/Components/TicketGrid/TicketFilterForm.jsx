import { useState, useEffect } from "react";
import PropType from "prop-types";
const TicketFilterForm = ({ onClose, onApplyFilters }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filters, setFilters] = useState({
    project: "",
    priority: "",
    status: "",
    developer: "",
    tester: "",
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === "overlay") {
      handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    if (value) {
      setError(false);
    }
  };

  const handleApplyFilters = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );

    if (Object.keys(activeFilters).length === 0) {
      setError(true);
      return;
    }

    onApplyFilters(activeFilters);
    handleClose();
  };

  return (
    <div
      id="overlay"
      className="form-overlay z-50 flex justify-end transition-opacity duration-300"
      onClick={handleBackgroundClick}
    >
      <div
        className={`bg-[#EDEDED] w-[400px] h-screen top-[56px] md:top-[72px] absolute  overflow-y-auto shadow-lg transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-5">Filter Tickets</h2>

          {error && (
            <p className="text-red-500 text-sm mb-3">
              Please select at least one filter.
            </p>
          )}
          <label className="block mb-2 text-sm font-normal">Project</label>
          <select
            name="project"
            value={filters.project}
            onChange={handleChange}
            className="border border-gray-400 bg-white w-full p-2 text-xs font-normal rounded-md mb-5"
          >
            <option value="">Select Project</option>
            <option>Project A</option>
            <option>Project B</option>
          </select>
          <label className="block mb-2 text-sm font-normal">Priority</label>
          <div className="flex space-x-4 mb-5">
            {["High", "Medium", "Low"].map((level) => (
              <label
                key={level}
                className="flex items-center text-xs font-normal"
              >
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  onChange={handleChange}
                  checked={filters.priority === level}
                  className="mr-2 bg-white"
                />
                {level}
              </label>
            ))}
          </div>
          <label className="block mb-2 text-sm font-normal">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="border border-gray-400 bg-white w-full p-2 rounded-md mb-5 text-xs font-normal"
          >
            <option value="">Select Status</option>
            <option>Created</option>
            <option>Assigned</option>
            <option>Completed</option>
          </select>
          <label className="block mb-2 text-sm font-normal">Developer</label>
          <select
            name="developer"
            value={filters.developer}
            onChange={handleChange}
            className="border border-gray-400 bg-white w-full p-2 rounded-md mb-5 text-xs font-normal"
          >
            <option value="">Select Developer</option>
            <option>Developer A</option>
            <option>Developer B</option>
          </select>
          <label className="block mb-2 text-sm font-normal">Tester</label>
          <select
            name="tester"
            value={filters.tester}
            onChange={handleChange}
            className="border border-gray-400 bg-white w-full p-2 rounded-md mb-5 text-xs font-normal"
          >
            <option value="">Select Tester</option>
            <option>Tester A</option>
            <option>Tester B</option>
          </select>

          <div className="flex justify-end gap-x-8 mt-8 mb-[50px] md:mb-0">
            <button
              onClick={handleClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className="bg-[#034C41] text-white px-4 py-2 rounded-md hover:bg-[#026f63] transition"
            >
              Apply filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TicketFilterForm.propTypes = {
  onClose: PropType.func.isRequired,
  onApplyFilters: PropType.func.isRequired,
};

export default TicketFilterForm;
