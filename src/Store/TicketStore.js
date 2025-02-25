import { create } from "zustand";

const initialFormState = {
    project: "",
    ticketNumber: "",
    ticketDate: "",
    reportedBy: "",
    bugDetails: "",
    priority: "",
    screenshots: [],
};

const useTicketStore = create((set) => ({
    //form data

    formData: initialFormState,
    
    //validation errors
    errors: {},
    
    //Actions

    setFormField: (field, value) => set((state) => ({
        formData: {
            ...state.formData,
            [field]: value
        },
        errors: {
            ...state.errors,
            [field]: ""
        }
    })),
        //addscreenshot
    addScreenshots: (files) => set((state) => ({
        formData: {
            ...state.formData,
            screenshots:[...state.formData.screenshots, ...files]
        },
        errors: {
            ...state.errors,
            screenshots:""
        }
    })),

    //delete screenshot
    deleteScreenshot: (index) => set((state) => ({
        formData: {
            ...state.formData,
            screenshots:state.formData.screenshots.filter((__,i)=> i!==index)
        }
    })),
    
    //set errors

    setErrors: (errorobj) => set(() => ({
        errors: errorobj
    })),

    // reset form to initial state
   
    resetForm: () => set(() => ({
        formData: initialFormState,
            errors:{}
    })),

      // Validate form
  validateForm: () => {
    const state = useTicketStore.getState();
    const { formData } = state;
    const newErrors = {};
    
    if (!formData.project) newErrors.project = "Please select a project.";
    if (!formData.ticketNumber) newErrors.ticketNumber = "Ticket number is required.";
    if (!formData.ticketDate) newErrors.ticketDate = "Ticket date is required.";
    if (!formData.reportedBy) newErrors.reportedBy = "Please select a ReportedBy.";
    if (!formData.bugDetails) newErrors.bugDetails = "Bug details are required.";
    if (!formData.priority) newErrors.priority = "Please select a priority.";
    if (formData.screenshots.length === 0) newErrors.screenshots = "Please select at least one image.";
    
    state.setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  },
    
    //submit Form
    submitForm: (onSuccess) => {
        const state = useTicketStore.getState();
        const isValid = state.validateForm();

        if (isValid) {
            //sent data for the api


            const dummyData = {
                ...state.screenShots,
                screenshots: state.formData.screenshots.map((file) => file.name),
            };

            console.log("Form submited:" ,dummyData)
        
            if (onSuccess) {
                onSuccess();
                

              
            }
            return true;
        }
        return false;
  }

}));

export default useTicketStore;