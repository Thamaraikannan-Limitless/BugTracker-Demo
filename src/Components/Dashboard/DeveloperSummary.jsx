
import PropTypes from "prop-types";
const DeveloperSummary = ({developers}) => {
  return (
     <div className="p-6 bg-gray-100  rounded-2xl">
       <h2 className="text-[14px] font-bold text-gray-800 mb-4">
       Developer-wise Summary of Tickets
       </h2>
 
       {/* Titles Row */}
       <div className="grid grid-cols-3 gap-4 text-[12px] bg-gray-100 md:p-4 p-2 rounded-t-xl font-semibold text-gray-700">
         <span>Developer Name</span>
         <span className="text-center">Assigned</span>
         <span className="text-center">Completed</span>
       </div>
 
       {/* Project Data Rows */}
       <div className="space-y-2">
         {developers.map((developer, index) => (
           <div
             key={index}
             className="grid grid-cols-3  gap-4 text-[14px] bg-white md:p-4 p-2 rounded-xl shadow-sm hover:bg-gray-100"
           >
             <span className="font-medium text-gray-800">{developer.name}</span>
             <span className="text-center text-gray-600">{developer.assigned}</span>
             <span className="text-center text-gray-600">{developer.completed}</span>
           </div>
         ))}
       </div>
     </div>
   );
 };
 
 DeveloperSummary.propTypes = {
   developers: PropTypes.arrayOf(
     PropTypes.shape({
       name: PropTypes.string.isRequired,
       assigned: PropTypes.number.isRequired,
       completed: PropTypes.number.isRequired,
     })
   ).isRequired,
}

export default DeveloperSummary
