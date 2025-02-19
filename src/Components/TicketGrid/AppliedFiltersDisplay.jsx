import PropTypes from "prop-types";

const AppliedFiltersDisplay = ({
  appliedFilters,
  clearFilter,
  clearAllFilters,
}) => {
  return (
    <div className="flex flex-wrap text-[14px] gap-4 mb-2 items-center">
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
              className="text-[#9F9F9F] font-black cursor-pointer"
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
          className="text-red-600 border border-red-500 px-2 py-1 rounded cursor-pointer"
        >
          Clear all Filters
        </button>
      )}
    </div>
  );
};

AppliedFiltersDisplay.propTypes = {
  appliedFilters: PropTypes.object.isRequired,
  clearFilter: PropTypes.func.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
};

export default AppliedFiltersDisplay;
