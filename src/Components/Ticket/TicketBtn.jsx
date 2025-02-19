import { useState, useEffect, useRef } from "react";
import TicketForm from "./TicketForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TicketAssignForm from "./TicketAssignForm";
import ReassignForm from "./ReassignForm";
import RetestForm from "./RetestForm";
import TicketCloseForm from "./TicketCloseForm"
import RemarkForm from "./RemarkForm";
const TicketBtn = () => {
  const [showForm, setShowForm] = useState(false);
  const [assignForm, setAssignForm] = useState(false);
  const [reassignForm, setReAssignForm] = useState(false);
  const [retestForm, setRetestForm] = useState(false);
  const [closeForm, setCloseForm] = useState(false);
  const [remarkForm, setRemarkForm] = useState(false);
  const formRef = useRef(null);
  const assignRef = useRef(null);
  const reassignRef = useRef(null);
  const retestRef = useRef(null);
  const closeRef = useRef(null);
  const remarkRef = useRef(null);
  
  // Close form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
      if (assignRef.current && !assignRef.current.contains(event.target)) {
        setAssignForm(false);
      }
      if (reassignRef.current && !reassignRef.current.contains(event.target)) {
        setReAssignForm(false);
      }
      if (retestRef.current && !retestRef.current.contains(event.target)) {
        setRetestForm(false);
      }
      if (closeRef.current && !closeRef.current.contains(event.target)) {
        setCloseForm(false);
      }
      if (remarkRef.current && !remarkRef.current.contains(event.target)) {
        setRemarkForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="py-3 relative">
    {/* Toast Container - Now applies globally */}
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />

    {/* Header Section */}
    <section>
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <div className="flex items-center gap-4"> {/* Updated: Added gap for spacing */}
          {/* New Ticket Button */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#034C41] text-white cursor-pointer font-bold text-sm px-4 py-2 h-[37px] w-[125px] rounded-full hover:bg-[#026f63] transition"
          >
            New Ticket
          </button>

          {/* Assign Button */}
          <button
            onClick={() => setAssignForm(true)}
            className="bg-[#034C41] text-white px-4 py-2 rounded-full h-[37px] w-[125px] hover:bg-[#026f63] transition"
          >
            Assign To
          </button>

          {/* Reassign Button */}
          <button
            onClick={() => setReAssignForm(true)}
            className="bg-[#034C41] text-white px-4 py-2 rounded-full h-[37px] w-[125px] hover:bg-[#026f63] transition"
          >
            ReAssign To
          </button>

          {/* Retest Button */}
          <button
            onClick={() => setRetestForm(true)}
            className="bg-[#034C41] text-white px-4 py-2 rounded-full h-[37px] w-[125px] hover:bg-[#026f63] transition"
          >
            ReTest To
          </button>

          {/* Close Button */}
          <button
            onClick={() => setCloseForm(true)}
            className="bg-[#034C41] text-white px-4 py-2 rounded-full h-[37px] w-[125px] hover:bg-[#026f63] transition"
          >
            Close Form
          </button>

          {/* Remark Button */}
          <button
            onClick={() => setRemarkForm(true)}
            className="bg-[#034C41] text-white px-4 py-2 rounded-full h-[37px] w-[125px] hover:bg-[#026f63] transition"
          >
            Remark Form
          </button>
        </div>
      </header>
    </section>


     
     
   {/* Overlay Background */}
   {assignForm && (
        <div
          className="form-overlay"
          onClick={() => setAssignForm(false)} // Close form when clicking overlay
        ></div>
      )}
      {/* Assign Form (Opens on click, Closes on clicking outside) */}
     
        <div
          ref={assignRef}
          className={`fixed md:top-[72px] top-[56px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-20 w-[380px] shadow-md transform ${
            assignForm ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 ease-in-out overflow-y-auto`}
        >
         {assignForm && (  <TicketAssignForm onClose={() => setAssignForm(false)} /> )}
  
        </div>

      {/* Overlay Background */}
      {showForm && (
        <div
          className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-10"
          onClick={() => setShowForm(false)} // Close form when clicking overlay
        ></div>
      )}

      {/* Form Section - Render conditionally */}
      <div
        ref={formRef}
        className={`fixed md:top-[72px] top-[56px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-20 w-[380px] shadow-md transform ${
          showForm ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out overflow-y-auto`}
      >
        {showForm && <TicketForm onClose={() => setShowForm(false)} />}
      </div>

      {/* Overlay Background */}
   {reassignForm && (
        <div
          className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-10 "
          onClick={() => setReAssignForm(false)} // Close form when clicking overlay
        ></div>
      )}
      {/*Re-Assign Form (Opens on click, Closes on clicking outside) */}
     
        <div
          ref={reassignRef}
          className={`fixed md:top-[72px] top-[56px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-20 w-[380px] shadow-md transform ${
            reassignForm ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 ease-in-out overflow-y-auto`}
        >
         {reassignForm && (  <ReassignForm onClose={() => setReAssignForm(false)}/> )}
  
      </div>


        {/* Overlay Background */}
   {retestForm && (
        <div
          className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-10 "
          onClick={() => setRetestForm(false)} // Close form when clicking overlay
        ></div>
      )}
      {/*Re-Test Form (Opens on click, Closes on clicking outside) */}
     
        <div
          ref={retestRef}
          className={`fixed md:top-[72px] top-[56px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-20 w-[380px] shadow-md transform ${
            retestForm ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 ease-in-out overflow-y-auto`}
        >
         {retestForm && (  <RetestForm onClose={() => setRetestForm(false)}/> )}
  
      </div>
      
      {/* Close Form (Opens on click, Closes on clicking outside) */}
      {closeForm && (
        <div
          className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-10 "
          onClick={() => setCloseForm(false)} // Close form when clicking overlay
        ></div>
      )}     
        <div
          ref={closeRef}
          className={`fixed md:top-[72px] top-[56px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-20 w-[380px] shadow-md transform ${
            closeForm ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 ease-in-out overflow-y-auto`}
        >
         {closeForm && (  <TicketCloseForm onClose={() => setCloseForm(false)}/> )}
  
      </div>
      
      {/* Remark Form (Opens on click, Closes on clicking outside) */}
       {remarkForm && (
        <div
          className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-10 "
          onClick={() => setRemarkForm(false)} // Close form when clicking overlay
        ></div>
      )}     
        <div
          ref={remarkRef}
          className={`fixed md:top-[72px] top-[56px] right-0 h-full max-h-screen md:w-[480px] bg-[#EDEDED] z-20 w-[380px] shadow-md transform ${
            remarkForm ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-500 ease-in-out overflow-y-auto`}
        >
         {remarkForm && (  <RemarkForm onClose={() => setRemarkForm(false)}/> )}
  
        </div>
    </div>
  );
};

export default TicketBtn;
