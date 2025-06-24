import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateVendorForm from './CreateVendorForm';
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<h1 className="text-center text-xl mt-10">Welcome to Vendor App</h1>} /> */}
        <Route path="/" element={<CreateVendorForm />} />
      </Routes>
    </Router>
  );
}

export default App;
