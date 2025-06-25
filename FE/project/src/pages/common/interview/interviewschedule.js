import React, { useState } from "react";

const InterviewList = () => {
    // Pre-filled data for demonstration (future dates from June 23, 2025)
    const [interviews] = useState([
        {
            id: 1,
            candidateName: "Jane Smith",
            interviewer: "John Doe",
            date: "2025-06-23",
            time: "10:00 AM",
            location: "Conference Room A",
            status: "Scheduled",
        },
        {
            id: 2,
            candidateName: "Michael Brown",
            interviewer: "Sarah Lee",
            date: "2025-06-24",
            time: "2:00 PM",
            location: "Zoom Meeting",
            status: "Pending",
        },
        {
            id: 3,
            candidateName: "Emily Davis",
            interviewer: "Robert Kim",
            date: "2025-06-25",
            time: "11:00 AM",
            location: "Meeting Room B",
            status: "Completed",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    // Handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle status filter
    const handleFilter = (e) => {
        setFilterStatus(e.target.value);
    };

    // Handle sorting
    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    // Filter and sort interviews
    const filteredInterviews = interviews.filter((interview) => {
        const matchesSearch = Object.values(interview).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesFilter =
            filterStatus === "All" || interview.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const sortedInterviews = [...filteredInterviews].sort((a, b) => {
        if (!sortField) return 0;
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (sortOrder === "asc") {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    return (
        <div className="container-fluid mt-4">
            <div className="mt-4">
                <h2 className="text-3xl font-bold text-gray-900">Interview List</h2>
                <nav aria-label="breadcrumb" className="mt-2 text-gray-600">
                    <ol className="flex space-x-2">
                        <li className="hover:text-gray-900">
                            <a href="/interview-management" className="hover:underline">
                                Interview Management
                            </a>
                        </li>
                        <li className="text-gray-900">Interview List</li>
                    </ol>
                </nav>

                <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                    {/* Search and Filter Section */}
                    <div className="mb-6 flex space-x-4">
                        <input
                            type="text"
                            placeholder="Search by name, interviewer, or date..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <select
                            value={filterStatus}
                            onChange={handleFilter}
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-gray-100">
                                <th
                                    className="p-4 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSort("candidateName")}
                                >
                                    Candidate Name{" "}
                                    {sortField === "candidateName" && (
                                        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </th>
                                <th
                                    className="p-4 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSort("interviewer")}
                                >
                                    Interviewer{" "}
                                    {sortField === "interviewer" && (
                                        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </th>
                                <th
                                    className="p-4 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSort("date")}
                                >
                                    Date{" "}
                                    {sortField === "date" && (
                                        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </th>
                                <th
                                    className="p-4 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSort("time")}
                                >
                                    Time{" "}
                                    {sortField === "time" && (
                                        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </th>
                                <th className="p-4">Location</th>
                                <th
                                    className="p-4 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSort("status")}
                                >
                                    Status{" "}
                                    {sortField === "status" && (
                                        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </th>
                                <th className="p-4">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedInterviews.map((interview) => (
                                <tr
                                    key={interview.id}
                                    className="border-t hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-4 text-blue-600 hover:underline">
                                        <a href={`/interview-details`}>
                                            {interview.candidateName}
                                        </a>
                                    </td>
                                    <td className="p-4">{interview.interviewer}</td>
                                    <td className="p-4">{interview.date}</td>
                                    <td className="p-4">{interview.time}</td>
                                    <td className="p-4">{interview.location}</td>
                                    <td className="p-4">
                      <span
                          className={`inline-block px-2 py-1 rounded-full text-sm ${
                              interview.status === "Scheduled"
                                  ? "bg-green-100 text-green-800"
                                  : interview.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                          }`}
                      >
                        {interview.status}
                      </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex space-x-2">
                                            <a
                                                href={`/edit-interview`}
                                                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            >
                                                Edit
                                            </a>
                                            <a
                                                href={`/cancel-interview/${interview.id}`}
                                                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            >
                                                Cancel
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewList;