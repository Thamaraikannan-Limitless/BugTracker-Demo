import { useState, useEffect, useRef } from "react";
import TicketForm from "./TicketForm";

const TicketBtn = () => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  // Close form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showForm]);

  return (
    <div className="bg-gray-50 py-3 relative">
      {/* Header Section */}
      <section>
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tickets</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#034C41] text-white cursor-pointer font-bold text-[14px] px-4 py-2 h-[37px] w-[125px] rounded-full hover:bg-[#026f63] transition"
          >
            New Ticket
          </button>
        </header>
      </section>

      {/* Overlay Background */}
      {showForm && (
        <div
          className=" form-overlay"
          onClick={() => setShowForm(false)} // Close form when clicking overlay
        ></div>
      )}

      {/* Form Section - Render conditionally */}
      <div
        ref={formRef}
        className={`fixed md:top-[89px] top-[72px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-20 w-[380px] shadow-md transform ${
          showForm ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out overflow-y-auto`}
      >
        {showForm && <TicketForm onClose={() => setShowForm(false)} />}
      </div>
    </div>
  );
};

export default TicketBtn;


