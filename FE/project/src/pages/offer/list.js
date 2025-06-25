import React, { useState } from "react";

const ViewOfferList = () => {
    // Pre-filled data for demonstration
    const [offers] = useState([
        {
            id: 1,
            candidateName: "Jane Smith",
            position: "Software Engineer",
            salary: "$80,000",
            status: "Pending",
            createdDate: "2025-06-20",
        },
        {
            id: 2,
            candidateName: "Michael Brown",
            position: "UI/UX Designer",
            salary: "$65,000",
            status: "Accepted",
            createdDate: "2025-06-21",
        },
        {
            id: 3,
            candidateName: "Emily Davis",
            position: "Data Analyst",
            salary: "$70,000",
            status: "Rejected",
            createdDate: "2025-06-19",
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

    // Filter and sort offers
    const filteredOffers = offers.filter((offer) => {
        const matchesSearch = Object.values(offer).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesFilter =
            filterStatus === "All" || offer.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const sortedOffers = [...filteredOffers].sort((a, b) => {
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
                <h2 className="text-3xl font-bold text-gray-900">Offer List</h2>
                <nav aria-label="breadcrumb" className="mt-2 text-gray-600">
                    <ol className="flex space-x-2">
                        <li className="hover:text-gray-900">
                            <a href="/offer-management" className="hover:underline">
                                Offer Management
                            </a>
                        </li>
                        <li className="text-gray-900">Offer List</li>
                    </ol>
                </nav>

                <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                    {/* Search and Filter Section */}
                    <div className="mb-6 flex space-x-4">
                        <input
                            type="text"
                            placeholder="Search by name, position, or date..."
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
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
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
                                    onClick={() => handleSort("position")}
                                >
                                    Position{" "}
                                    {sortField === "position" && (
                                        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </th>
                                <th
                                    className="p-4 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSort("salary")}
                                >
                                    Salary{" "}
                                    {sortField === "salary" && (
                                        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </th>
                                <th
                                    className="p-4 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSort("status")}
                                >
                                    Status{" "}
                                    {sortField === "status" && (
                                        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </th>
                                <th
                                    className="p-4 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleSort("createdDate")}
                                >
                                    Created Date{" "}
                                    {sortField === "createdDate" && (
                                        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                    )}
                                </th>
                                <th className="p-4">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedOffers.map((offer) => (
                                <tr
                                    key={offer.id}
                                    className="border-t hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-4 text-blue-600 hover:underline">
                                        <a href={`/offer-details/${offer.id}`}>
                                            {offer.candidateName}
                                        </a>
                                    </td>
                                    <td className="p-4">{offer.position}</td>
                                    <td className="p-4">{offer.salary}</td>
                                    <td className="p-4">
                      <span
                          className={`inline-block px-2 py-1 rounded-full text-sm ${
                              offer.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : offer.status === "Accepted"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                          }`}
                      >
                        {offer.status}
                      </span>
                                    </td>
                                    <td className="p-4">{offer.createdDate}</td>
                                    <td className="p-4">
                                        <a
                                            href={`/edit-offer/${offer.id}`}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Edit
                                        </a>
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

export default ViewOfferList;