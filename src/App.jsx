import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Dashboard from "./Pages/Dashboard";
import Tickets from "./Pages/Tickets";

function App() {
  return <>
   <BrowserRouter>
    <Header/>
    <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ticket" element={<Tickets />} />
        </Routes>
  </BrowserRouter>
  </>;
}

export default App;
