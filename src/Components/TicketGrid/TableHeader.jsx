import PropTypes from "prop-types";

const TableHeader = ({ activeTab, setActiveTab }) => {
  const tabs = ["All", "Created", "Assigned", "Completed"];

  return (
    <div className="flex space-x-8 mb-2 flex-wrap border-b-[1px] text-[16px] font-semibold border-[#EDEDED]">
      {tabs.map((tab) => (
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
  );
};

TableHeader.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default TableHeader;
