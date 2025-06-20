import React, { useState } from "react";

const UserList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            role: "Recruiter",
            department: "HR",
            status: "Active",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "Manager",
            department: "IT",
            status: "Inactive",
        },
    ]);

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

    return (
        <div className="container-fluid mt-4">
            <h2 className="text-2xl font-bold">User List</h2>
            <nav aria-label="breadcrumb">
                <ol className="flex space-x-2 text-sm text-gray-700">
                    <li>
                        <a href="/user-list" className="text-blue-600 hover:underline">
                            User Management
                        </a>
                    </li>
                    <li className="text-gray-500">/</li>
                    <li className="text-gray-700" aria-current="page">
                        User List
                    </li>
                </ol>
            </nav>

            {/* Search and Filter */}
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
                <div className="w-full md:w-1/4">
                    <a
                        href="/user-create"
                        className="btn bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 text-center block"
                    >
                        Create New User
                    </a>
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
                        <th className="py-2 px-4 border">Action</th>
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
                                <a
                                    href="/user-details"
                                    className="btn bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700"
                                >
                                    <i className="fas fa-eye"></i>
                                </a>
                                <a
                                    href="/user-edit"
                                    className="btn bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600"
                                >
                                    <i className="fas fa-edit"></i>
                                </a>
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
                                    <i
                                        className={`fas fa-toggle-${
                                            user.status === "Active" ? "off" : "on"
                                        }`}
                                    ></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-3">
                <div className="text-sm text-gray-700">Showing 1-10 of 50 users</div>
                <nav aria-label="Page navigation">
                    <ul className="flex space-x-1">
                        <li>
                            <a
                                className="px-3 py-1 border border-gray-300 rounded text-gray-500 cursor-not-allowed"
                                href="#"
                            >
                                Previous
                            </a>
                        </li>
                        <li>
                            <a
                                className="px-3 py-1 border border-gray-300 rounded bg-blue-600 text-white"
                                href="#"
                            >
                                1
                            </a>
                        </li>
                        <li>
                            <a
                                className="px-3 py-1 border border-gray-300 rounded text-blue-600 hover:bg-blue-50"
                                href="#"
                            >
                                2
                            </a>
                        </li>
                        <li>
                            <a
                                className="px-3 py-1 border border-gray-300 rounded text-blue-600 hover:bg-blue-50"
                                href="#"
                            >
                                3
                            </a>
                        </li>
                        <li>
                            <a
                                className="px-3 py-1 border border-gray-300 rounded text-blue-600 hover:bg-blue-50"
                                href="#"
                            >
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default UserList;