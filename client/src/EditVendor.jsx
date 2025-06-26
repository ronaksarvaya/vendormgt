import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditVendor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendorName: "",
    bankAccount: "",
    bankName: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    zip: ""
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/vendors/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.error("Error loading vendor:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/vendors/${id}`, formData);
      navigate("/home");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 mt-8 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Vendor</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {Object.entries(formData).map(([key, value]) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key}
            value={value}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}
