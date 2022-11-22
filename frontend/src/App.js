import logo from './logo.svg';
import App1 from './pages/App';
import Login from './pages/Login';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ViewFlight from './pages/ViewFlights';
import TablePaginationActions from './pages/view';
import Gates from './pages/Gates.js';

function App() {
  return (
    <div className="App">
          <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/view" element={<ViewFlight />} />
                <Route path="/view1" element={<TablePaginationActions />} />
                <Route path="/gate" element={<Gates />} />
          </Routes>

    </div>
  );
}

export default App;
