import { useState } from 'react';
import axios from 'axios';

const CreateVendorForm = () => {
  const [form, setForm] = useState({
    vendorName: '',
    bankAccount: '',
    bankName: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    zip: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/vendors`);

      alert("Vendor created!");
      setForm({
        vendorName: '',
        bankAccount: '',
        bankName: '',
        address1: '',
        address2: '',
        city: '',
        country: '',
        zip: ''
      });
    } catch (err) {
      alert("Error creating vendor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md border">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Vendor</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: 'Vendor Name*', name: 'vendorName' },
            { label: 'Bank Account No*', name: 'bankAccount' },
            { label: 'Bank Name*', name: 'bankName' },
            { label: 'Address Line 1', name: 'address1' },
            { label: 'Address Line 2*', name: 'address2' },
            { label: 'City', name: 'city' },
            { label: 'Country', name: 'country' },
            { label: 'Zip Code', name: 'zip' }
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                name={field.name}
                required={field.label.includes('*')}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-md transition"
          >
            Create Vendor
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateVendorForm;
