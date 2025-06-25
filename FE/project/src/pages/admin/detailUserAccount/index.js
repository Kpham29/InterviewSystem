import React, { useState, useEffect } from "react";

const UserDetails = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(false);

  const user = {
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    dateOfBirth: "1985-03-22",
    phoneNumber: "+0987654321",
    address: "456 Elm St, City, Country",
    gender: "Female",
    role: "Manager",
    department: "IT",
    status: "Inactive",
    note: "Manager with expertise in IT projects.",
  };

  const handleActivate = () => {
    if (window.confirm("Are you sure you want to activate this user?")) {
      const success = Math.random() > 0.2;
      setToastSuccess(success);
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-2xl font-bold">User Details</h2>
      <nav aria-label="breadcrumb">
        <ol className="flex space-x-2 text-sm text-gray-700">
          <li>
            <a href="/user-list" className="text-blue-600 hover:underline">
              User Management
            </a>
          </li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-700" aria-current="page">
            User Details
          </li>
        </ol>
      </nav>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="font-semibold">Full Name</div>
              <p>{user.fullName}</p>
            </div>
            <div>
              <div className="font-semibold">Email</div>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="font-semibold">Date of Birth</div>
              <p>{user.dateOfBirth}</p>
            </div>
            <div>
              <div className="font-semibold">Phone Number</div>
              <p>{user.phoneNumber}</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold">Address</div>
            <p>{user.address}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="font-semibold">Gender</div>
              <p>{user.gender}</p>
            </div>
            <div>
              <div className="font-semibold">Role</div>
              <p>{user.role}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="font-semibold">Department</div>
              <p>{user.department}</p>
            </div>
            <div>
              <div className="font-semibold">Status</div>
              <p>
                <span
                  className={`inline-block px-2 py-1 rounded ${
                    user.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {user.status}
                </span>
              </p>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold">Note</div>
            <p>{user.note}</p>
          </div>
          <div className="flex justify-end gap-2">
            <a
              href="/user-edit"
              className="btn bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              <i className="fas fa-edit"></i> Edit
            </a>
            <button
              onClick={handleActivate}
              className="btn bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <i className="fas fa-toggle-on"></i> Activate
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <div
          className={`fixed top-6 right-6 z-50 transition-opacity duration-300 ${
            showToast ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`toast align-items-center text-white p-3 rounded ${
              toastSuccess ? "bg-success" : "bg-danger"
            } border-0`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">
                {toastSuccess
                  ? "User has been activated successfully."
                  : "Failed to update user status."}
              </div>
              <button
                type="button"
                className="btn-close btn-close-white ms-2"
                onClick={() => setShowToast(false)}
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
