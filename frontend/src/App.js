import logo from './logo.svg';
import App1 from './pages/App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ViewFlight from './pages/ViewFlights';
import TablePaginationActions from './pages/view';
import Gates from './pages/Gates.js';
import Baggage from './pages/Baggage.js';
import AddFlight from './pages/AddFlight';
import UpdateFlight from './pages/UpdateFlight';
import AirlineFlights from './pages/AirlineFlights';
import Error from './pages/PageNotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TablePaginationActions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/error" element={<Error />} />
        <Route path="/view" element={<ViewFlight />} />
        <Route path="/baggage" element={<Baggage />} />
        <Route path="/AirlineFlights" element={<AirlineFlights />} />
        <Route path="/ViewFlights" element={<TablePaginationActions />} />
        <Route path="/gate" element={<Gates />} />
        <Route path="/addFlight" element={<AddFlight />} />
        <Route path="/updateFlight" element={<UpdateFlight />} />
      </Routes>

    </div>
  );
}

export default App;
