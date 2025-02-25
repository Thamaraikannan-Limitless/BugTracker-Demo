import { useState,useRef,useEffect } from "react";
import PropTypes from "prop-types";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTicketStore from "../../Store/TicketStore";
import { baseUrl, token } from "../../Utils/localStorage"
import axios from "axios"
const data = [
  {
    id: 1,
    name: " Osel-Signage",
  },
  {
    id: 2,
    name: "Ticket-Tracker",
  },
];

const TicketForm = ({ onClose }) => {
  const {
    formData,
    errors,
    setFormField,
    addScreenshots,
    deleteScreenshot,
    submitForm,
    resetForm,
  } = useTicketStore();
  const fileInputRef = useRef(null);
  const [projects, setProjects] = useState([])
  const [devname, setDevName]=useState([])
  
  useEffect(() => {
    const fetchProjectList = async () => {
      try {
        const response = await axios.post(`${baseUrl}/Project/list`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("API Response:", response.data); // Debugging log
          setProjects(response.data.model);
        } 
       catch (err) {
        console.error("Error fetching project list:", err);
        setProjects([]); // Prevent undefined errors
      }
    };
  
    fetchProjectList();

    const fetchDeveloperList = async () => {
      try {
        const response = await axios.post(`${baseUrl}/Developer/list`,
          {},
          {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("API Response:", response.data); // Debugging log
        const tester = response.data.model.filter((user)=>user.department==="Tester")
      
          setDevName(tester);
        } 
       catch (err) {
        console.error("Error fetching project list:", err);
        setDevName([]); // Prevent undefined errors
      }
    }
    fetchDeveloperList();
  }, []);
  
  // Handle file selection
  const handleScreenshotSelection = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      addScreenshots(files);
    }
  };

  // Trigger the file input on click
  const handleScreenshotClick = () => {
    fileInputRef.current.click();
  };

  // Delete an image
  const handleDeleteImage = (index) => {
    deleteScreenshot(index);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField(name, value);
  };

  // Show toast notification on successful submission
  const notify = () => {
    toast.success("Ticket submitted successfully!", {
      position: "top-center", // Position of the toast
      autoClose: 5000, // Auto close after  seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };
  // Handle form submission
  const handleSubmit = () => {
    const success = submitForm();
    if (success) {
      notify();

      setTimeout(() => {
        resetForm();
        onClose();
      }, 1000);
    }
  };

  return (
    <>
      <div className="p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-5">Create a New Ticket</h2>

        {/* Project Selection */}
        <label className="block mb-2 text-sm font-[400] ">
          Project <span className="text-red-600">*</span>
        </label>
        <select
          name="project"
          value={formData.project}
          onChange={handleChange}
          className={`" border border-gray-400 w-full p-2  rounded-md ${
            errors.project ? " mb-1 " : " mb-5 "
          }"`}
        >
          <option value="">Select Project</option>
          {projects.map((data) => {
            return <option key={data.id}>{data.projectName}</option>;
          })}
        </select>
        {errors.project && (
          <p className="text-red-500 text-sm mb-2 ">{errors.project}</p>
        )}

        <div className="md:flex md:justify-between gap-x-15">
          {/* Ticket Number */}
          <div>
            <label className="block mb-2 text-sm font-[400] ">
              Ticket Number <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="ticketNumber"
              value={formData.ticketNumber}
              onChange={handleChange}
              className={`" border border-gray-400 w-full p-2  rounded-md ${
                errors.ticketNumber ? " mb-1 " : " mb-5 "
              }"`}
              placeholder="Enter Ticket Number"
            />
            {errors.ticketNumber && (
              <p className="text-red-500 text-sm mb-2">{errors.ticketNumber}</p>
            )}
          </div>

          {/* Ticket Date */}
          <div>
            <label className="block mb-2 text-sm font-[400] " htmlFor="date">
              Ticket Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="ticketDate"
              id="date"
              value={formData.ticketDate}
              onChange={handleChange}
              className={`" border border-gray-400 w-full p-2  rounded-md ${
                errors.ticketDate ? " mb-1 " : " mb-5 "
              }"`}
            />
            {errors.ticketDate && (
              <p className="text-red-500 text-sm mb-2 ">{errors.ticketDate}</p>
            )}
          </div>
        </div>

        {/*  Reported by*/}
        <div className="w-full">
        <label className="block mb-2 text-sm font-[400] ">
          Reported By <span className="text-red-600">*</span>
        </label>
        <select
          name="reportedBy"
          value={formData.reportedBy}
          onChange={handleChange}
          className={` border border-gray-400 w-full p-2 z-10  rounded-md ${
            errors.reportedBy ? " mb-1 " : " mb-5 "
          }`}
        >
          <option value="" >Select reportedBy</option>
          {devname.map((data) => {
            return <option key={data.id}>{data.name}</option>;
          })}
        </select>
        {errors.reportedBy && (
          <p className="text-red-500 text-sm mb-2 ">{errors.reportedBy}</p>
          )}
          </div>
        {/* Bug Details */}
        <div>
          <label className="block mb-2 text-sm font-[400] ">
            Bug Details <span className="text-red-600">*</span>
          </label>
          <textarea
            name="bugDetails"
            value={formData.bugDetails}
            onChange={handleChange}
            className={`" border border-gray-400 w-full p-2  rounded-md ${
              errors.bugDetails ? " mb-1 " : " mb-5 "
            }"`}
            placeholder="Describe the bug..."
            rows="3"
          ></textarea>
          {errors.bugDetails && (
            <p className="text-red-500 text-sm mb-2">{errors.bugDetails}</p>
          )}
        </div>

        {/* Priority Selection */}
        <div>
          <label className="block mb-2  text-sm font-[400] ">
            Priority <span className="text-red-600">*</span>
          </label>
          <div className="flex space-x-5 mb-2">
            {["High", "Medium", "Low"].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  onChange={handleChange}
                  className={`"mr-2 ${errors.priority ? " mb-1 " : " mb-5 "}"`}
                  checked={formData.priority === level}
                />
                <span className="ml-2">{level}</span>
              </label>
            ))}
          </div>
          {errors.priority && (
            <p className="text-red-500 text-sm mb-2 ">{errors.priority}</p>
          )}
        </div>
        {/* Attach Screenshot Section */}
        <div
          onClick={handleScreenshotClick}
          className="w-2/3 p-2 border-2 border-[#034C41] rounded-lg mb-2 mt-2  cursor-pointer text-center"
        >
          <p className="text-[#034C41] ">Attach Screenshots</p>
        </div>
        {errors.screenshots && (
          <p className="text-red-500 text-sm mb-2">{errors.screenshots}</p>
        )}

        {/* Image Previews with Delete Icons */}
        <div className="flex flex-wrap gap-2">
          {formData.screenshots.map((file, index) => (
            <div key={index} className="relative w-28 h-28 mb-2">
              <img
                src={URL.createObjectURL(file)}
                alt="Screenshot Preview"
                className="w-full h-full object-cover rounded-md"
              />

              <span
                onClick={() => handleDeleteImage(index)}
                className="absolute top-1 right-1 text-red-800 font-extrabold bg-red-400 rounded-full p-1 cursor-pointer"
              >
                {" "}
                <RxCrossCircled size={16} />
              </span>
            </div>
          ))}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleScreenshotSelection}
          accept="image/*"
          multiple
          className="hidden"
        />

        {/* Action Buttons */}
        <div className="flex  justify-end gap-x-8 mt-4 mb-7">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="bg-[#034C41] text-white px-4 py-2 rounded-md hover:bg-[#026f63] transition"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

TicketForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TicketForm;
