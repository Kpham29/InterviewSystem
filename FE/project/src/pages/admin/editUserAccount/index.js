import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const UserEdit = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    dob: "1990-01-15",
    phoneNumber: "+1234567890",
    address: "123 Main St, City, Country",
    gender: "Male",
    role: "Recruiter",
    department: "HR",
    status: "Active",
    note: "Experienced recruiter with 5 years in HR.",
  });

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!user.fullName || !user.email || !user.role || !user.department) {
      setShowErrorToast(true);
      return;
    }

    // Simulate API call with 80% success rate
    const success = Math.random() > 0.2;
    if (success) {
      setShowSuccessToast(true);
      setTimeout(() => navigate("/user-details"), 2000); // Redirect after 2s
    } else {
      setShowErrorToast(true);
    }
  };

  return (
    <div className="container-fluid mt-4">
      {/* Edit User Form */}
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Edit User</h2>
        <nav aria-label="breadcrumb" className="mt-2">
          <ol className="flex space-x-2 text-gray-600">
            <li className="hover:text-gray-900">
              <a href="/user-list" className="hover:underline">
                User Management
              </a>
            </li>
            <li className="text-gray-900">Edit User</li>
          </ol>
        </nav>

        <div className="mt-4 bg-white shadow-sm rounded-lg">
          <div className="p-6">
            <form
              id="editUserForm"
              noValidate
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 required"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    id="fullName"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="text-red-500 text-sm hidden">
                    Full Name is required.
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 required"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="text-red-500 text-sm hidden">
                    Please enter a valid email address.
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    id="dob"
                    name="dob"
                    value={user.dob}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleInputChange}
                    pattern="[0-9]{10,15}"
                  />
                  <div className="text-red-500 text-sm hidden">
                    Please enter a valid phone number (10-15 digits).
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  id="address"
                  name="address"
                  value={user.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    id="gender"
                    name="gender"
                    value={user.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 required"
                  >
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    id="role"
                    name="role"
                    value={user.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Manager">Manager</option>
                    <option value="Interviewer">Interviewer</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <div className="text-red-500 text-sm hidden">
                    Role is required.
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 required"
                  >
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    id="department"
                    name="department"
                    value={user.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Communication">Communication</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Accounting">Accounting</option>
                  </select>
                  <div className="text-red-500 text-sm hidden">
                    Department is required.
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    id="status"
                    name="status"
                    value={user.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="note"
                  className="block text-sm font-medium text-gray-700"
                >
                  Note
                </label>
                <textarea
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  id="note"
                  name="note"
                  rows="4"
                  value={user.note}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <a
                  href="/user-details"
                  className="btn btn-secondary px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </a>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Toast Notifications */}
        <div className="fixed top-6 right-6 z-50">
          <div
            className={`${
              showSuccessToast ? "block" : "hidden"
            } bg-green-500 text-white p-3 rounded-md shadow-lg`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="flex justify-between items-center">
              <span>Change has been successfully updated.</span>
              <button
                type="button"
                className="text-white hover:text-gray-200"
                onClick={() => setShowSuccessToast(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
          </div>
          <div
            className={`${
              showErrorToast ? "block" : "hidden"
            } bg-red-500 text-white p-3 rounded-md shadow-lg mt-2`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="flex justify-between items-center">
              <span>Failed to update change.</span>
              <button
                type="button"
                className="text-white hover:text-gray-200"
                onClick={() => setShowErrorToast(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
