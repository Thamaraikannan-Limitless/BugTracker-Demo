import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";

const TicketForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    project: "",
    ticketNumber: "",
    ticketDate: "",
    bugDetails: "",
    priority: "",
    screenshots: [],
  });

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleScreenshotSelection = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        screenshots: [...prevData.screenshots, ...files],
      }));
      setErrors((prevErrors) => ({ ...prevErrors, screenshots: "" })); // Clear screenshot error if any
    }
  };

  // Trigger the file input on click
  const handleScreenshotClick = () => {
    fileInputRef.current.click();
  };

  // Delete an image
  const handleDeleteImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      screenshots: prevData.screenshots.filter((_, i) => i !== index),
    }));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors on input
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.project) newErrors.project = "Please select a project.";
    if (!formData.ticketNumber) newErrors.ticketNumber = "Ticket number is required.";
    if (!formData.ticketDate) newErrors.ticketDate = "Ticket date is required.";
    if (!formData.bugDetails) newErrors.bugDetails = "Bug details are required.";
    if (!formData.priority) newErrors.priority = "Please select a priority.";
    if (formData.screenshots.length === 0) newErrors.screenshots = "Please select at least one image.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save dummy data for API readiness
    const dummyData = {
      project: formData.project,
      ticketNumber: formData.ticketNumber,
      ticketDate: formData.ticketDate,
      bugDetails: formData.bugDetails,
      priority: formData.priority,
      screenshots: formData.screenshots.map((file) => file.name),
    };

    console.log("Form Data Submitted: ", dummyData);
    alert("Ticket details saved successfully!");
    onClose(); // Close the form
  };

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto">
  <h2 className="text-xl font-bold mb-5">Create a New Ticket</h2>

      {/* Project Selection */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Project <span className="text-red-600">*</span></label>
      <select
        name="project"
        value={formData.project}
        onChange={handleChange}
        className="border border-gray-400 w-full p-2 mb-5 rounded-md"
      >
        <option value="">Select Project</option>
        <option>Project A</option>
        <option>Project B</option>
      </select>
      {errors.project && <span className="text-red-500 text-sm">{errors.project}</span>}

      <div className="md:flex md:justify-between gap-x-15">
        {/* Ticket Number */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Ticket Number <span className="text-red-600">*</span></label>
          <input
            type="number"
            name="ticketNumber"
            value={formData.ticketNumber}
            onChange={handleChange}
            className="border border-gray-400 w-full p-2 mb-5 rounded-md"
            placeholder="Enter Ticket Number"
          />
          {errors.ticketNumber && <p className="text-red-500 text-sm">{errors.ticketNumber}</p>}
        </div>

        {/* Ticket Date */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Ticket Date <span className="text-red-600">*</span></label>
          <input
            type="date"
            name="ticketDate"
            value={formData.ticketDate}
            onChange={handleChange}
            className="border border-gray-400 w-full p-2 mb-5 rounded-md"
          />
          {errors.ticketDate && <p className="text-red-500 text-sm">{errors.ticketDate}</p>}
        </div>
      </div>

      {/* Bug Details */}
      <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">Bug Details <span className="text-red-600">*</span></label>
      <textarea
        name="bugDetails"
        value={formData.bugDetails}
        onChange={handleChange}
        className="border border-gray-400 w-full p-2 mb-5 rounded-md"
        placeholder="Describe the bug..."
        rows="3"
      ></textarea>
      {errors.bugDetails && <p className="text-red-500 text-sm">{errors.bugDetails}</p>}
      </div>
     
      {/* Priority Selection */}
      <div>
      <label className="block mb-2  text-sm font-medium text-gray-700">Priority <span className="text-red-600">*</span></label>
      <div className="flex space-x-4 mb-5">
        {["High", "Medium", "Low"].map((level) => (
          <label key={level}>
            <input
              type="radio"
              name="priority"
              value={level}
              onChange={handleChange}
              className="mr-2"
              checked={formData.priority === level}
            />
            {level}
          </label>
        ))}
      </div>
      {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
      </div>
      {/* Attach Screenshot Section */}
      <div
        onClick={handleScreenshotClick}
        className="w-2/3 p-2 border-2 border-[#034C41] rounded-lg mb-5 mt-2  cursor-pointer text-center"
      >
        <p className="text-[#034C41] ">Attach Screenshots</p>
      </div>
      {errors.screenshots && <p className="text-red-500 text-sm">{errors.screenshots}</p>}

      {/* Image Previews with Delete Icons */}
      <div className="flex flex-wrap gap-2">
        {formData.screenshots.map((file, index) => (
          <div key={index} className="relative w-28 h-28 mb-2">
            <img
              src={URL.createObjectURL(file)}
              alt="Screenshot Preview"
              className="w-full h-full object-cover rounded-md"
            />
            <button
              onClick={() => handleDeleteImage(index)}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
            >
              <FaTrashAlt size={14} />
            </button>
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
      <div className="flex  justify-end gap-x-8 mt-4 mb-10">
        <button
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#034C41] text-white px-4 py-2 rounded-md hover:bg-[#026f63] transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

TicketForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TicketForm;
