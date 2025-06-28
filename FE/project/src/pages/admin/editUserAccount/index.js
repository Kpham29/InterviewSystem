
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    address: "",
    gender: "",
    role: "",
    department: "",
    status: "",
    note: "",
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSuccess, setToastSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setApiError("Token is missing. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/users/${id}/detail`, {
    headers: { Authorization: `Bearer ${token}` },
});
setUser(response.data);
setApiError(null);
} catch (error) {
  setApiError(
      error.response?.data?.message ||
      (error.response?.status === 403
          ? "You do not have permission."
          : "Unable to fetch user details.")
  );
} finally {
  setLoading(false);
}
}, [id]);

useEffect(() => {
  if (id) fetchUser();
}, [id, fetchUser]);

const validateField = (name, value) => {
  const newErrors = { ...errors };
  if (name === "fullName" && !value.trim()) {
    newErrors.fullName = "Full Name is required.";
  } else if (name === "fullName") {
    delete newErrors.fullName;
  }
  if (name === "email") {
    if (!value.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors.email = "Invalid email format.";
    } else {
      delete newErrors.email;
    }
  }
  if (name === "role" && !value) {
    newErrors.role = "Role is required.";
  } else if (name === "role") {
    delete newErrors.role;
  }
  if (name === "department" && !value) {
    newErrors.department = "Department is required.";
  } else if (name === "department") {
    delete newErrors.department;
  }
  setErrors(newErrors);
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUser((prev) => ({ ...prev, [name]: value }));
  validateField(name, value);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const requiredFields = ["fullName", "email", "role", "department"];
  const newErrors = {};
  requiredFields.forEach((field) => {
    if (!user[field]?.trim()) {
      newErrors[field] = `${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required.`;
    }
  });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    newErrors.email = "Invalid email format.";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setToastMessage("Please correct the errors in the form.");
    setToastSuccess(false);
    setShowToast(true);
    return;
  }

  try {
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:8080/api/users/${id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    setToastMessage("User updated successfully.");
    setToastSuccess(true);
    setShowToast(true);
    setTimeout(() => navigate(`/admin/user-details/${id}`), 2000);
  } catch (error) {
    setToastMessage(
        error.response?.data?.message || "Failed to update user."
    );
    setToastSuccess(false);
    setShowToast(true);
  }
};

useEffect(() => {
  if (showToast) {
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }
}, [showToast]);

if (loading) {
  return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="flex items-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0l4 4-4 4zm0 0a8 8 0 018 8h4l-4-4 4-4z" />
          </svg>
          <span className="text-gray-600">Loading user details...</span>
        </div>
      </div>
  );
}

if (apiError) {
  return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
          <span>{apiError}</span>
          <button
              onClick={() => setApiError(null)}
              className="text-red-700 hover:text-red-900"
              aria-label="Dismiss error"
          >
            <FaTimes />
          </button>
        </div>
      </div>
  );
}

return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header + Breadcrumb */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit User</h2>
          <nav aria-label="breadcrumb" className="mt-2 text-sm text-gray-600">
            <ol className="flex space-x-2">
              <li>
                <Link to="/admin/user-list" className="text-blue-600 hover:underline">
                  User Management
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link to={`/admin/user-details/${id}`} className="text-blue-600 hover:underline">
                  User Details
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-700" aria-current="page">
                Edit User
              </li>
            </ol>
          </nav>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                  type="text"
                  name="fullName"
                  value={user.fullName || ""}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-label="Full Name"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                  type="email"
                  name="email"
                  value={user.email || ""}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-label="Email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>

          {/* DOB & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                  type="date"
                  name="dob"
                  value={user.dob || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Date of Birth"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                  type="tel"
                  name="phoneNumber"
                  value={user.phoneNumber || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Phone Number"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
                type="text"
                name="address"
                value={user.address || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Address"
            />
          </div>

          {/* Gender & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                  name="gender"
                  value={user.gender || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Gender"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role *</label>
              <select
                  name="role"
                  value={user.role || ""}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-label="Role"
              >
                <option value="">Select</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Manager">Manager</option>
                <option value="Interviewer">Interviewer</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>
          </div>

          {/* Department & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Department *</label>
              <select
                  name="department"
                  value={user.department || ""}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.department ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-label="Department"
              >
                <option value="">Select</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Communication">Communication</option>
                <option value="Marketing">Marketing</option>
                <option value="Accounting">Accounting</option>
              </select>
              {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                  name="status"
                  value={user.status || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Status"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Note</label>
            <textarea
                name="note"
                rows={4}
                value={user.note || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Note"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
                type="button"
                onClick={() => navigate(`/admin/user-details/${id}`)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                aria-label="Cancel"
            >
              Cancel
            </button>
            <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                aria-label="Save changes"
            >
              Save
            </button>
          </div>
        </form>

        {/* Toast Notification */}
        {showToast && (
            <div className="fixed top-6 right-6 z-50 animate-slide-in">
              <div
                  className={`p-4 rounded-lg shadow-lg transition-opacity duration-300 ${
                      toastSuccess ? "bg-green-600" : "bg-red-600"
                  } text-white`}
              >
                <div className="flex justify-between items-center">
                  <span>{toastMessage}</span>
                  <button
                      onClick={() => setShowToast(false)}
                      className="ml-4 text-white hover:text-gray-200"
                      aria-label="Dismiss notification"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
    </div>
);
};

export default UserEdit;
