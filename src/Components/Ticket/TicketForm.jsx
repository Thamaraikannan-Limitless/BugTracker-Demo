import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTicketStore from "../../Store/TicketStore";
import api from "../../API/AxiosInterceptor";

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
  const [projects, setProjects] = useState([]);
  const [devname, setDevName] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProjectList = async () => {
      try {
        // Fixed string quotes for API endpoints
        const response = await api.post("/Project/list", {});
        console.log("Project API Response:", response.data);
        
        if (response.data && response.data.model) {
          setProjects(response.data.model);
        } else {
          console.error("Unexpected project data format:", response.data);
          setProjects([]);
        }
      } catch (err) {
        console.error("Error fetching project list:", err);
        setProjects([]);
      }
    };

    const fetchDeveloperList = async () => {
      try {
        // Fixed string quotes for API endpoints
        const response = await api.post("/Developer/list", {});
        console.log("Developer API Response:", response.data);
        
        if (response.data && response.data.model) {
          const tester = response.data.model.filter(
            (user) => user.department === "Tester"
          );
          setDevName(tester);
        } else {
          console.error("Unexpected developer data format:", response.data);
          setDevName([]);
        }
      } catch (err) {
        console.error("Error fetching developer list:", err);
        setDevName([]);
      }
    };

    fetchProjectList();
    fetchDeveloperList();
  }, []);

  // Handle file selection
  const handleScreenshotSelection = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      addScreenshots(files);
      console.log("Screenshots added:", files.map(f => f.name));
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
    console.log(`Field '${name}' changed to:`, value);
  };

  // Show toast notification on successful submission
  const notify = (message, type = "success") => {
    toast[type](message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      console.log("Submitting form with data:", formData);
      const success = await submitForm();
      
      if (success) {
        notify("Ticket submitted successfully!");
        setTimeout(() => {
          resetForm();
          onClose();
        }, 1000);
      } else {
        notify("Form validation succeeded but submission failed.", "error");
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      notify(`Error: ${error.message || "Unknown error occurred"}, "error"`);
    } finally {
      setIsSubmitting(false);
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
          className={`border border-gray-400 w-full p-2 rounded-md ${
            errors.project ? "mb-1" : "mb-5"
          }`}
        >
          <option value="">Select Project</option>
          {projects.map((data) => (
            <option key={data.id} value={data.id}>
              {data.projectName}
            </option>
          ))}
        </select>
        {errors.project && (
          <p className="text-red-500 text-sm mb-2">{errors.project}</p>
        )}

        <div className="md:flex md:justify-between gap-x-15">
          {/* Ticket Number */}
          <div className="w-full md:w-1/2 md:mr-2">
            <label className="block mb-2 text-sm font-[400]">
              Ticket Number <span className="text-red-600">*</span>
            </label>
            <input
              name="ticketNumber"
              value={formData.ticketNumber}
              onChange={handleChange}
              className={`border border-gray-400 w-full p-2 rounded-md ${
                errors.ticketNumber ? "mb-1" : "mb-5"
              }`}
              placeholder="Enter Ticket Number"
            />
            {errors.ticketNumber && (
              <p className="text-red-500 text-sm mb-2">{errors.ticketNumber}</p>
            )}
          </div>

          {/* Ticket Date */}
          <div className="w-full md:w-1/2 md:ml-2">
            <label className="block mb-2 text-sm font-[400]" htmlFor="date">
              Ticket Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="ticketDate"
              id="date"
              value={formData.ticketDate}
              onChange={handleChange}
              className={`border border-gray-400 w-full p-2 rounded-md ${
                errors.ticketDate ? "mb-1" : "mb-5"
              }`}
            />
            {errors.ticketDate && (
              <p className="text-red-500 text-sm mb-2">{errors.ticketDate}</p>
            )}
          </div>
        </div>

        {/* Reported by */}
        <div className="w-full">
          <label className="block mb-2 text-sm font-[400]">
            Reported By <span className="text-red-600">*</span>
          </label>
          <select
            name="reportedBy"
            value={formData.reportedBy}
            onChange={handleChange}
            className={`border border-gray-400 w-full p-2 z-10 rounded-md ${
              errors.reportedBy ? "mb-1" : "mb-5"
            }`}
          >
            <option value="">Select Reported By</option>
            {devname.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </select>
          {errors.reportedBy && (
            <p className="text-red-500 text-sm mb-2">{errors.reportedBy}</p>
          )}
        </div>

        {/* Bug Details */}
        <div>
          <label className="block mb-2 text-sm font-[400]">
            Bug Details <span className="text-red-600">*</span>
          </label>
          <textarea
            name="bugDetails"
            value={formData.bugDetails}
            onChange={handleChange}
            className={`border border-gray-400 w-full p-2 rounded-md ${
              errors.bugDetails ? "mb-1" : "mb-5"
            }`}
            placeholder="Describe the bug..."
            rows="3"
          ></textarea>
          {errors.bugDetails && (
            <p className="text-red-500 text-sm mb-2">{errors.bugDetails}</p>
          )}
        </div>

        {/* Priority Selection */}
        <div>
          <label className="block mb-2 text-sm font-[400]">
            Priority <span className="text-red-600">*</span>
          </label>
          <div className="flex space-x-5 mb-2">
            {["High", "Medium", "Low"].map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  onChange={handleChange}
                  className="mr-2"
                  checked={formData.priority === level}
                />
                <span>{level}</span>
              </label>
            ))}
          </div>
          {errors.priority && (
            <p className="text-red-500 text-sm mb-2">{errors.priority}</p>
          )}
        </div>

        {/* Attach Screenshot Section */}
        <div
          onClick={handleScreenshotClick}
          className="w-2/3 p-2 border-2 border-[#034C41] rounded-lg mb-2 mt-2 cursor-pointer text-center"
        >
          <p className="text-[#034C41]">Attach Screenshots</p>
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
        <div className="flex justify-end gap-x-8 mt-4 mb-7">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`${
              isSubmitting ? "bg-gray-500" : "bg-[#034C41] hover:bg-[#026f63]"
            } text-white px-4 py-2 rounded-md transition`}
          >
            {isSubmitting ? "Saving..." : "Save"}
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