import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaToggleOn, FaToggleOff, FaSearch, FaTimes } from "react-icons/fa";
import debounce from "lodash.debounce";

const ITEMS_PER_PAGE = 9;

const UserList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = useCallback(async (page = currentPage, search = searchTerm, status = statusFilter) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Token is missing. Please login again.");
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8080/api/users?page=${page - 1}&size=${ITEMS_PER_PAGE}&search=${encodeURIComponent(search)}&status=${status}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setUsers(response.data.content || []);
            setTotalPages(response.data.totalPages || 0);
            setError(null);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                (error.response?.status === 403
                    ? "You do not have permission."
                    : "Unable to fetch users.")
            );
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchTerm, statusFilter]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers, currentPage]);

    const debouncedSearch = useMemo(
        () => debounce((value) => {
            setSearchTerm(value);
            setCurrentPage(1);
            fetchUsers(1, value, statusFilter);
        }, 500),
        [fetchUsers, statusFilter]
    );

    const handleSearchChange = (e) => {
        debouncedSearch(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setCurrentPage(1);
        fetchUsers(1, "", statusFilter);
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
        fetchUsers(1, searchTerm, e.target.value);
    };

    const handleAction = async (userId, action) => {
        if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

        const token = localStorage.getItem("token");
        try {
            await axios.put(
                `http://localhost:8080/api/users/${userId}/${action}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUsers(
                users.map((user) =>
                    user.userId === userId
                        ? { ...user, status: action === "activate" ? "Active" : "Inactive" }
                        : user
                )
            );
            setError(null);
        } catch (error) {
            setError(`Failed to ${action} user: ${error.response?.data?.message || "Unknown error"}`);
        }
    };

    const filteredUsers = useMemo(
        () =>
            users.filter(
                (user) =>
                    (user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
                    (statusFilter === "" || user.status === statusFilter)
            ),
        [users, searchTerm, statusFilter]
    );

    const paginatedUsers = useMemo(
        () =>
            filteredUsers.slice(
                (currentPage - 1) * ITEMS_PER_PAGE,
                currentPage * ITEMS_PER_PAGE
            ),
        [filteredUsers, currentPage]
    );

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {error && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
                        <span>{error}</span>
                        <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900" aria-label="Dismiss error">
                            <FaTimes />
                        </button>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">User List</h2>
                        <nav className="text-sm text-gray-600">
                            <Link to="/admin/user-list" className="hover:underline">User Management</Link> / User List
                        </nav>
                    </div>
                    <button
                        className="mt-4 sm:mt-0 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-md flex items-center space-x-2"
                        onClick={() => navigate("/admin/user-create")}
                        aria-label="Add new user"
                    >
                        <FaEdit />
                        <span>Add User</span>
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white p-4 rounded-lg shadow-md">
                    <div className="flex w-full sm:w-2/3">
                        <input
                            type="text"
                            placeholder="Search by name or email"
                            onChange={handleSearchChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Search users by name or email"
                        />
                        <button
                            onClick={() => fetchUsers(1, searchTerm, statusFilter)}
                            className="bg-blue-600 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700 transition duration-200"
                            aria-label="Search users"
                        >
                            <FaSearch />
                        </button>
                        <button
                            onClick={handleClearSearch}
                            className="bg-gray-200 text-gray-700 px-4 py-3 ml-2 rounded-lg hover:bg-gray-300 transition duration-200"
                            aria-label="Clear search"
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <select
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                        className="w-full sm:w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Filter users by status"
                    >
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full bg-white text-gray-700">
                        <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-4 px-6 text-left font-medium text-sm uppercase tracking-wider">ID</th>
                            <th className="py-4 px-6 text-left font-medium text-sm uppercase tracking-wider">Full Name</th>
                            <th className="py-4 px-6 text-left font-medium text-sm uppercase tracking-wider">Email</th>
                            <th className="py-4 px-6 text-left font-medium text-sm uppercase tracking-wider">Role</th>
                            <th className="py-4 px-6 text-left font-medium text-sm uppercase tracking-wider">Department</th>
                            <th className="py-4 px-6 text-center font-medium text-sm uppercase tracking-wider">Status</th>
                            <th className="py-4 px-6 text-center font-medium text-sm uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="text-center py-6">
                                    <div className="flex justify-center items-center">
                                        <svg className="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0l4 4-4 4zm0 0a8 8 0 018 8h4l-4-4 4-4z" />
                                        </svg>
                                        <span className="ml-2 text-gray-600">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedUsers.length > 0 ? (
                            paginatedUsers.map((user, index) => (
                                <tr
                                    key={user.userId}
                                    className={`transition duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                                    tabIndex={0}
                                >
                                    <td className="py-4 px-6 text-sm">{user.userId}</td>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{user.fullName || "N/A"}</td>
                                    <td className="py-4 px-6 text-sm text-gray-600">{user.email || "N/A"}</td>
                                    <td className="py-4 px-6 text-sm">{user.role || "N/A"}</td>
                                    <td className="py-4 px-6 text-sm">{user.address || "N/A"}</td>
                                    <td className="py-4 px-6 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                                                    user.status === "Active" ? "bg-green-500" : "bg-gray-500"
                                                }`}
                                            >
                                                {user.status || "N/A"}
                                            </span>
                                    </td>
                                    <td className="py-4 px-6 text-center flex justify-center space-x-3">
                                        <button
                                            className="text-blue-600 hover:text-blue-800 transition duration-200"
                                            onClick={() => navigate(`/admin/user-details/${user.userId}`)}
                                            aria-label={`View details for ${user.fullName || "user"}`}
                                        >
                                            <FaEye size={18} />
                                        </button>
                                        <button
                                            className="text-yellow-600 hover:text-yellow-800 transition duration-200"
                                            onClick={() => navigate(`/admin/user-edit/${user.userId}`)}
                                            aria-label={`Edit ${user.fullName || "user"}`}
                                        >
                                            <FaEdit size={18} />
                                        </button>
                                        <button
                                            className={`${
                                                user.status === "Active"
                                                    ? "text-red-600 hover:text-red-800"
                                                    : "text-green-600 hover:text-green-700"
                                            } transition duration-200`}
                                            onClick={() => handleAction(user.userId, user.status === "Active" ? "deactivate" : "activate")}
                                            aria-label={`${user.status === "Active" ? "De-activate" : "Activate"} ${user.fullName || "user"}`}
                                        >
                                            {user.status === "Active" ? <FaToggleOff size={18} /> : <FaToggleOn size={18} />}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-6 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                    <span className="text-sm text-gray-600 mb-4 sm:mb-0">
                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length}{" "}
                        entries
                    </span>
                    <div className="flex space-x-2">
                        <button
                            className={`px-4 py-2 border rounded-lg text-sm ${
                                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"
                            } transition duration-200`}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`px-4 py-2 border rounded-lg text-sm ${
                                    currentPage === i + 1 ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                                } transition duration-200`}
                                onClick={() => setCurrentPage(i + 1)}
                                aria-label={`Go to page ${i + 1}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className={`px-4 py-2 border rounded-lg text-sm ${
                                currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"
                            } transition duration-200`}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;