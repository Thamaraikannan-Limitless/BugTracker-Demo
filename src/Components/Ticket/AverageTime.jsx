import React, { useState } from "react";

const AverageTime = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e, type) => {
    const value = e.target.value;

    if (type === "hours") {
      setHours(value);
    } else {
      setMinutes(value);
    }

    // Remove error message as soon as both fields have values
    if (value && (type === "hours" ? minutes : hours)) {
      setError("");
    }
  };

  const handleSave = () => {
    if (!hours || !minutes) {
      setError("Please enter the time (Hours and Minutes)");
      return;
    }
    setError(""); // Clear error when valid
    alert("Form submitted successfully!"); // You can replace this with actual form submission logic
  };

  return (
    <div className="p-6 max-h-[90vh] w-[400px] border shadow-2xl rounded-md overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-5">Average working hours</h2>
      <div className="w-full bg-[#c2c3c3] text-left mb-6">
        <h1 className="pt-3 pl-3 text-sm font-[600]">
          Ticket Number :<span className="font-[400] pl-1">TK00001</span>
        </h1>
        <h1 className="pt-3 pl-3 pb-3 text-sm font-[600]">
          Project Name :<span className="font-[400] pl-1">Project 1</span>
        </h1>
      </div>

      {/* Time Input Fields */}
      <div className="flex gap-x-10 items-center text-left text-sm pb-2 pt-2">
        <div className="ml-2">
          <label className="block">Hours</label>
          <input
            type="number"
            className="border w-28 border-gray-400 rounded-sm p-1"
            value={hours}
            onChange={(e) => handleInputChange(e, "hours")}
          />
        </div>
        <div>
          <label className="block">Minutes</label>
          <input
            type="number"
            className="border w-28 border-gray-400 rounded-sm p-1"
            value={minutes}
            onChange={(e) => handleInputChange(e, "minutes")}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {/* Buttons */}
      <div className="flex justify-end gap-x-8 mt-4 mb-2">
        <button className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-[#034C41] text-white px-4 py-2 rounded-md hover:bg-[#026f63] transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AverageTime;
