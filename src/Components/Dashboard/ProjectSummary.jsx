import PropTypes from "prop-types";

const ProjectSummary = ({ projects }) => {
  return (
    <div className="p-6 bg-gray-100  rounded-2xl">
      <h2 className="text-[14px] font-bold text-gray-800 mb-4">
        Summary of Ticket (Last 30 days)
      </h2>

      {/* Titles Row */}
      <div className="grid grid-cols-4 gap-4 bg-gray-100 md:p-4 p-2 rounded-t-xl md:text-[12px] text-[10px] font-semibold text-gray-700">
        <span>Project Name</span>
        <span className="text-center">Created</span>
        <span className="text-center">Assigned</span>
        <span className="text-center">Completed</span>
      </div>

      {/* Project Data Rows */}
      <div className="space-y-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className="grid grid-cols-4  gap-4  text-[14px] bg-white  md:p-4 p-2 rounded-xl shadow-sm hover:bg-gray-100"
          >
            <span className="font-medium text-gray-600">{project.name}</span>
            <span className="text-center text-gray-600">{project.created}</span>
            <span className="text-center text-gray-600">
              {project.assigned}
            </span>
            <span className="text-center text-gray-600">
              {project.completed}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

ProjectSummary.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      created: PropTypes.number.isRequired,
      assigned: PropTypes.number.isRequired,
      completed: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProjectSummary;
