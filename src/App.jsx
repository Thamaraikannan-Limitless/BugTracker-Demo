import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./Pages/AuthForm";
import Dashboard from "./Pages/Dashboard";
import Tickets from "./Pages/Tickets";
import TicketDetailWrapper from "./Components/Ticket/TicketDetailWrapper";
import Header from "./Components/Header/Header";

function App() {
  return (
    <Router basename="/ticket-tracker">
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route element={<Header/>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ticket" element={<Tickets />} />
          <Route path="/tickets/:ticketId" element={<TicketDetailWrapper />} />
          </Route>
      </Routes>
    </Router>
  );
}
export default App;
