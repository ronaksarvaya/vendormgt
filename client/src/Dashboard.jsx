import { useState, useEffect } from "react";
import axios from "axios";
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

export default function Dashboard() {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const vendorsPerPage = 5;

  const handleLogout = () => {
    googleLogout();
    window.location.href = "/";
  };

  useEffect(() => {
    fetchVendors(currentPage);
  }, [currentPage]);

  const fetchVendors = async (page) => {
    try {

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/vendors?page=${page}&limit=${vendorsPerPage}`);
      setVendors(res.data.vendors);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching vendors", err);
    }
  };

  const deleteVendor = async (id) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      try {
      await axios.delete(`${import.meta.env.VITE_API_URL}api/vendors/${id}`);

        fetchVendors(currentPage);
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate('/create')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add New Vendor
        </button>
        <input
          type="text"
          placeholder="Search vendors..."
          className="border p-2 rounded w-1/3"
          // Optional: add search logic later
        />
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xl font-medium text-gray-700">Vendor Name</th>
              <th className="px-6 py-3 text-left text-xl font-medium text-gray-700">Bank Acc No</th>
              <th className="px-6 py-3 text-left text-xl font-medium text-gray-700">Bank Name</th>
              <th className="px-6 py-3 text-left text-xl font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vendors.length > 0 ? (
              vendors.map((vendor) => (
                <tr key={vendor._id}>
                  <td className="px-6 py-4">{vendor.vendorName}</td>
                  <td className="px-6 py-4">{vendor.bankAccount}</td>
                  <td className="px-6 py-4">{vendor.bankName}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => navigate(`/edit/${vendor._id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    
                    <button
                      onClick={() => deleteVendor(vendor._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  No vendors created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
