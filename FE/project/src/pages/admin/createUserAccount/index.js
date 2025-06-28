
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const CreateUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    dob: "",
    phoneNumber: "",
    address: "",
    gender: "",
    role: "",
    department: "",
    status: "Active",
    note: "",
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSuccess, setToastSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

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
    if (name === "username" && !value.trim()) {
      newErrors.username = "Username is required.";
    } else if (name === "username") {
      delete newErrors.username;
    }
    if (name === "password") {
      if (!value) {
        newErrors.password = "Password is required.";
      } else if (value.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      } else if (!/[!@#$%^&*]/.test(value)) {
        newErrors.password = "Password must include at least one special character.";
      } else {
        delete newErrors.password;
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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const requiredFields = ["fullName", "email", "username", "password", "role", "department"];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!user[field]?.trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required.`;
      }
    });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (user.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[!@#$%^&*]/.test(user.password)) {
      newErrors.password = "Password must include at least one special character.";
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
      if (!token) {
        setApiError("Token is missing. Please login again.");
        return;
      }
      const response = await axios.post("http://localhost:8080/api/users", user, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 201) {
        setToastMessage("User created successfully.");
        setToastSuccess(true);
        setShowToast(true);
        setTimeout(() => navigate("/admin/user-list"), 2000);
      }
    } catch (error) {
      setToastMessage(
        error.response?.data?.message || "Failed to create user."
      );
      setToastSuccess(false);
      setShowToast(true);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

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
          <h2 className="text-2xl font-bold text-gray-900">Create User</h2>
          <nav aria-label="breadcrumb" className="mt-2 text-sm text-gray-600">
            <ol className="flex space-x-2">
              <li>
                <Link to="/admin/user-list" className="text-blue-600 hover:underline">
                  User Management
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-700" aria-current="page">
                Create User
              </li>
            </ol>
          </nav>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          {/* Name, Email, Username, Password */}
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Username *</label>
              <input
                type="text"
                name="username"
                value={user.username || ""}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
  errors.username ? "border-red-500" : "border-gray-300"
}`}
                aria-label="Username"
              />
              {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password *</label>
              <input
                type="password"
                name="password"
                value={user.password || ""}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
  errors.password ? "border-red-500" : "border-gray-300"
}`}
                aria-label="Password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
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
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Interviewer">Interviewer</option>
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
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
              </select>
              {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={user.status || "Active"}
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
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/user-list")}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
              aria-label="Cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
              aria-label="Create user"
            >
              Create
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

export default CreateUser;
