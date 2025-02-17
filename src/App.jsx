import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./Pages/AuthForm";
import Dashboard from "./Pages/Dashboard";
import Tickets from "./Pages/Tickets";
import TicketDetailWrapper from "./Components/Ticket/TicketDetailWrapper";

function App() {
  return (
    <Router basename="/ticket-tracker">
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ticket" element={<Tickets />} />
        <Route path="/tickets/:ticketId" element={<TicketDetailWrapper />} />
      </Routes>
    </Router>
  );
}
export default App;
