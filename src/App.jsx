
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./Pages/AuthForm";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header/Header";
import Tickets from "./Pages/Tickets";

function App() {
  return (
    <Router>    <Header/>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} /> <Route path="/ticket" element={<Tickets />} />
      </Routes>
    </Router>
  );

export default App;
