import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditOffer = () => {
    const navigate = useNavigate();
    const currentDate = new Date().toISOString().split("T")[0]; // 2025-06-22
    // Pre-filled data for demonstration
    const [offer, setOffer] = useState({
        id: 1,
        candidateName: "Jane Smith",
        position: "Software Engineer",
        salary: "$80,000",
        status: "Pending",
        createdDate: "2025-06-20",
    });

    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOffer((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call with 80% success rate
        const success = Math.random() > 0.2;
        if (success) {
            setShowSuccessToast(true);
            setTimeout(() => navigate("/offer-list"), 2000); // Redirect to offer list
        } else {
            setShowErrorToast(true);
        }
    };

    return (
        <div className="container-fluid mt-4">
            <div className="mt-4">
                <h2 className="text-3xl font-bold text-gray-900">Edit Offer</h2>
                <nav aria-label="breadcrumb" className="mt-2 text-gray-600">
                    <ol className="flex space-x-2">
                        <li className="hover:text-gray-900">
                            <a href="/offer-management" className="hover:underline">
                                Offer Management
                            </a>
                        </li>
                        <li className="text-gray-900">Edit Offer</li>
                    </ol>
                </nav>

                <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Candidate Name</label>
                            <input
                                type="text"
                                name="candidateName"
                                value={offer.candidateName}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Position</label>
                            <input
                                type="text"
                                name="position"
                                value={offer.position}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Salary</label>
                            <input
                                type="text"
                                name="salary"
                                value={offer.salary}
                                onChange={handleChange}
                                required
                                placeholder="$XX,XXX"
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Status</label>
                            <select
                                name="status"
                                value={offer.status}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Created Date</label>
                            <input
                                type="date"
                                name="createdDate"
                                value={offer.createdDate}
                                onChange={handleChange}
                                max={currentDate}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </button>
                            <a
                                href="/offer-list"
                                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Back to Offer List
                            </a>
                        </div>
                    </form>

                    {/* Toast Notifications */}
                    <div className="fixed top-6 right-6 z-50">
                        <div
                            className={`${showSuccessToast ? "block" : "hidden"} bg-green-500 text-white p-3 rounded-md shadow-lg`}
                            role="alert"
                            aria-live="assertive"
                            aria-atomic="true"
                        >
                            <div className="flex justify-between items-center">
                                <span>Offer updated successfully.</span>
                                <button
                                    type="button"
                                    className="text-white hover:text-gray-200"
                                    onClick={() => setShowSuccessToast(false)}
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                        <div
                            className={`${showErrorToast ? "block" : "hidden"} bg-red-500 text-white p-3 rounded-md shadow-lg mt-2`}
                            role="alert"
                            aria-live="assertive"
                            aria-atomic="true"
                        >
                            <div className="flex justify-between items-center">
                                <span>Failed to update offer.</span>
                                <button
                                    type="button"
                                    className="text-white hover:text-gray-200"
                                    onClick={() => setShowErrorToast(false)}
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditOffer;