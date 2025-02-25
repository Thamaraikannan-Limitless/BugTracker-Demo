import { create } from "zustand";
import api from "../API/AxiosInterceptor";

const initialFormState = {
  project: "",
  ticketNumber: "",
  ticketDate: "",
  reportedBy: "",
  bugDetails: "",
  priority: "",
  screenshots: [],
};

const useTicketStore = create((set, get) => ({
  formData: initialFormState,
  errors: {},
  
  setFormField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
      errors: {
        ...state.errors,
        [field]: "",
      },
    })),
    
  addScreenshots: (files) =>
    set((state) => ({
      formData: {
        ...state.formData,
        screenshots: [...state.formData.screenshots, ...files],
      },
      errors: {
        ...state.errors,
        screenshots: "",
      },
    })),
    
  deleteScreenshot: (index) =>
    set((state) => ({
      formData: {
        ...state.formData,
        screenshots: state.formData.screenshots.filter((_, i) => i !== index),
      },
    })),
    
  setErrors: (errorObj) => set({ errors: errorObj }),
  
  resetForm: () => set({ formData: initialFormState, errors: {} }),
  
  validateForm: () => {
    const { formData, setErrors } = get();
    const newErrors = {};
    
    if (!formData.project) newErrors.project = "Please select a project.";
    if (!formData.ticketNumber) newErrors.ticketNumber = "Ticket number is required.";
    if (!formData.ticketDate) newErrors.ticketDate = "Ticket date is required.";
    if (!formData.reportedBy) newErrors.reportedBy = "Please select a ReportedBy.";
    if (!formData.bugDetails) newErrors.bugDetails = "Bug details are required.";
    if (!formData.priority) newErrors.priority = "Please select a priority.";
    if (formData.screenshots.length === 0) newErrors.screenshots = "Please select at least one image.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  },
  
  submitForm: async (onSuccess) => {
    const { formData, validateForm, resetForm } = get();
    if (!validateForm()) return false;
  
    const data = new FormData();
  
    // Format dates properly for API (ISO format)
    const formattedTicketDate = new Date(formData.ticketDate).toISOString();
    
    // Append form data to FormData object with proper type conversion
    data.append("ProjectId", parseInt(formData.project));  // Ensure integer
    data.append("TicketNumber", formData.ticketNumber);
    data.append("TicketDate", formattedTicketDate);
    data.append("ReportedBy", parseInt(formData.reportedBy));  // Ensure integer
    data.append("ReportedOn", new Date().toISOString());  // Add current date/time
    data.append("BugDetails", formData.bugDetails);
    data.append("Priority", formData.priority);
  
    // Append screenshots if available
    if (formData.screenshots.length > 0) {
      formData.screenshots.forEach((file, index) => {
        if (file instanceof File) {
          data.append("Attachments", file);
        }
      });
    }
  
    // Enhanced debugging
    console.log("Form Data Submitted:", {
      ProjectId: parseInt(formData.project),
      TicketNumber: formData.ticketNumber,
      TicketDate: formattedTicketDate,
      ReportedBy: parseInt(formData.reportedBy),
      ReportedOn: new Date().toISOString(),
      BugDetails: formData.bugDetails,
      Priority: formData.priority,
      AttachmentsCount: formData.screenshots.length
    });
    
    try {
      // Log request before sending
      console.log("Sending request to /Ticket endpoint");
      
      const response = await api.post("/Ticket", data, {
        headers: { 
          "Content-Type": "multipart/form-data"
        }
      });
  
      // Enhanced response logging
      console.log("Server Response:", {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });
      
      if (response.data && response.status >= 200 && response.status < 300) {
        console.log("Ticket created successfully:", response.data);
        if (onSuccess) onSuccess();
        resetForm();
        return true;
      } else {
        console.warn("Server returned success code but response may be invalid:", response);
        alert(`Warning: Server returned ${response.status} but the response may be invalid.`);
        return false;
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      console.error("Response headers:", error.response?.headers);
      
      alert(`Error: ${error.response?.data?.message || "An error occurred while submitting the ticket"}`);
      return false;
    }
  },
}));

export default useTicketStore;