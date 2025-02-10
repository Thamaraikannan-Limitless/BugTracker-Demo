import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./Pages/AuthForm";
import Dashboard from "./Pages/Dashboard";
import Tickets from "./Pages/Tickets";
import Test from "./Pages/Test";

function App() {
  return (
    <Router basename="/ticket-tracker">
       
      <Routes>
        <Route path="/" element={<AuthForm />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ticket" element={<Tickets />} />
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </Router>
  );
}
export default App;
