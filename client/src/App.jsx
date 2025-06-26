import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateVendorForm from './CreateVendorForm';
import './index.css'
import Landing from './Landing';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import EditVendor from './EditVendor';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<h1 className="text-center text-xl mt-10">Welcome to Vendor App</h1>} /> */}
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<CreateVendorForm />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/edit/:id" element={<EditVendor/>} />

      </Routes>
    </Router>
  );
}

export default App;
