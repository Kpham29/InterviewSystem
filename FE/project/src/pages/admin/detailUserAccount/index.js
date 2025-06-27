import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(false);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/api/users/${id}/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleActivate = async () => {
    if (window.confirm("Are you sure you want to activate this user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`http://localhost:8080/api/users/${id}/status`, {
          status: "Active",
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setToastSuccess(true);
        fetchUser();
      } catch (error) {
        console.error("Activation failed:", error);
        setToastSuccess(false);
      } finally {
        setShowToast(true);
      }
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (!user) return <div className="p-4">Loading...</div>;

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
                  href={`/user-edit/${user.id}`}
                  className="btn bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                <i className="fas fa-edit"></i> Edit
              </a>
              {user.status !== "Active" && (
                  <button
                      onClick={handleActivate}
                      className="btn bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    <i className="fas fa-toggle-on"></i> Activate
                  </button>
              )}
            </div>
          </div>
        </div>

        {showToast && (
            <div className={`fixed top-6 right-6 z-50 transition-opacity duration-300 ${showToast ? "opacity-100" : "opacity-0"}`}>
              <div className={`toast align-items-center text-white p-3 rounded ${toastSuccess ? "bg-green-600" : "bg-red-600"}`}>
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
