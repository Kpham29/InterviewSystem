import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [users, setUsers] = useState([]); // Khởi tạo danh sách user rỗng
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const [error, setError] = useState(null); // Thêm trạng thái lỗi

  useEffect(() => {
    // Gọi API khi component được mount
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        setUsers(response.data); // Gán dữ liệu lấy về từ API vào state
      } catch (error) {
        console.error("Error response:", error.response);
        setError(error.response?.data?.message || "Unable to fetch users.");
         // Cập nhật trạng thái lỗi
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
      (user) =>
          (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (statusFilter === "" || user.status === statusFilter)
  );

  const handleAction = (userId, action) => {
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      alert(`User has been ${action}d successfully`);
      setUsers(
          users.map((user) =>
              user.id === userId
                  ? {
                    ...user,
                    status: action === "activate" ? "Active" : "Inactive",
                  }
                  : user
          )
      );
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className="container-fluid mt-4">
        <h2 className="text-2xl font-bold">User List</h2>

        {/* Search and Filter Inputs */}
        <div className="flex flex-col md:flex-row gap-3 mb-3">
          <div className="flex-1">
            <div className="flex">
              <input
                  type="text"
                  className="form-control w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Search by name or email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <select
                className="form-select w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white">
            <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Full Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
            </thead>
            <tbody>
            {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">{user.id}</td>
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.role}</td>
                  <td className="py-2 px-4 border">{user.department}</td>
                  <td className="py-2 px-4 border text-center">
                  <span
                      className={`badge inline-block px-2 py-1 rounded ${
                          user.status === "Active"
                              ? "bg-green-500 text-white"
                              : "bg-gray-500 text-white"
                      }`}
                  >
                    {user.status}
                  </span>
                  </td>
                  <td className="py-2 px-4 border text-center space-x-1">
                    <button
                        className={`btn px-2 py-1 rounded text-sm text-white ${
                            user.status === "Active"
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-green-600 hover:bg-green-700"
                        }`}
                        onClick={() =>
                            handleAction(
                                user.id,
                                user.status === "Active" ? "de-activate" : "activate"
                            )
                        }
                    >
                      {user.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default UserList;