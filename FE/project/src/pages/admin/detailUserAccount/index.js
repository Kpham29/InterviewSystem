
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaToggleOn, FaToggleOff, FaTimes } from "react-icons/fa";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSuccess, setToastSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token is missing. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/users/${id}/detail`, {
    headers: { Authorization: `Bearer ${token}` },
});
setUser(response.data);
setError(null);
} catch (error) {
  setError(
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
  fetchUser();
}, [fetchUser]);

const handleToggleStatus = async () => {
  const action = user.status === "Active" ? "deactivate" : "activate";
  const confirmMessage = `Are you sure you want to ${action} this user?`;
  if (!window.confirm(confirmMessage)) return;

  const token = localStorage.getItem("token");
  try {
    await axios.put(
        `http://localhost:8080/api/users/${id}/status`,
        { status: action === "activate" ? "Active" : "Inactive" },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    setToastMessage(`User has been ${action}d successfully.`);
    setToastSuccess(true);
    fetchUser();
  } catch (error) {
    setToastMessage(`Failed to ${action} user: ${error.response?.data?.message || "Unknown error"}`);
    setToastSuccess(false);
  } finally {
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

if (error) {
  return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900" aria-label="Dismiss error">
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
          <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
          <nav aria-label="breadcrumb" className="mt-2 text-sm text-gray-600">
            <ol className="flex space-x-2">
              <li>
                <Link to="/admin/user-list" className="text-blue-600 hover:underline">
                  User Management
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-700" aria-current="page">
                User Details
              </li>
            </ol>
          </nav>
        </div>

        {/* User Details Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="font-medium text-gray-700 text-sm uppercase tracking-wider">Full Name</div>
              <p className="mt-1 text-gray-900">{user.fullName || "N/A"}</p>
            </div>
            <div>
              <div className="font-medium text-gray-700 text-sm uppercase tracking-wider">Email</div>
              <p className="mt-1 text-gray-900">{user.email || "N/A"}</p>
            </div>
            <div>
              <div className="font-medium text-gray-700 text-sm uppercase tracking-wider">Address</div>
              <p className="mt-1 text-gray-900">{user.address || "N/A"}</p>
            </div>
            <div>
              <div className="font-medium text-gray-700 text-sm uppercase tracking-wider">Role</div>
              <p className="mt-1 text-gray-900">{user.role || "N/A"}</p>
            </div>
            <div>
              <div className="font-medium text-gray-700 text-sm uppercase tracking-wider">Department</div>
              <p className="mt-1 text-gray-900">{user.department || user.address || "N/A"}</p>
            </div>
            <div>
              <div className="font-medium text-gray-700 text-sm uppercase tracking-wider">Status</div>
              <p className="mt-1">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${
                        user.status === "Active" ? "bg-green-500" : "bg-gray-500"
                    }`}
                >
                  {user.status || "N/A"}
                </span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-4">
            <Link
                to={`/admin/user-edit/${user.userId}`}
                className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                aria-label={`Edit ${user.fullName || "user"}`}
            >
              <FaEdit className="mr-2" /> Edit
            </Link>
            <button
                onClick={handleToggleStatus}
                className={`flex items-center px-4 py-2 rounded-lg text-white transition duration-200 ${
                    user.status === "Active" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                }`}
                aria-label={`${user.status === "Active" ? "De-activate" : "Activate"} ${user.fullName || "user"}`}
            >
              {user.status === "Active" ? <FaToggleOff className="mr-2" /> : <FaToggleOn className="mr-2" />}
              {user.status === "Active" ? "De-activate" : "Activate"}
            </button>
          </div>
        </div>

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

export default UserDetails;
