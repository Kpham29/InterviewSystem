import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditInterview = () => {
    const navigate = useNavigate();
    // Pre-filled data for demonstration (future date from June 23, 2025)
    const [interview, setInterview] = useState({
        id: 1,
        candidateName: "Jane Smith",
        interviewer: "John Doe",
        date: "2025-06-23",
        time: "10:00 AM",
        duration: "30",
        location: "Conference Room A",
        status: "Scheduled",
    });

    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInterview((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call with 80% success rate
        const success = Math.random() > 0.2;
        if (success) {
            setShowSuccessToast(true);
            setTimeout(() => navigate("/interview-schedule"), 2000); // Redirect to schedule
        } else {
            setShowErrorToast(true);
        }
    };

    return (
        <div className="container-fluid mt-4">
            <div className="mt-4">
                <h2 className="text-3xl font-bold text-gray-900">Edit Interview</h2>
                <nav aria-label="breadcrumb" className="mt-2 text-gray-600">
                    <ol className="flex space-x-2">
                        <li className="hover:text-gray-900">
                            <a href="/interview-list" className="hover:underline">
                                Interview Management
                            </a>
                        </li>
                        <li className="text-gray-900">Edit Interview</li>
                    </ol>
                </nav>

                <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Candidate Name</label>
                            <input
                                type="text"
                                name="candidateName"
                                value={interview.candidateName}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Interviewer</label>
                            <input
                                type="text"
                                name="interviewer"
                                value={interview.interviewer}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={interview.date}
                                onChange={handleChange}
                                min="2025-06-23"
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Time</label>
                            <input
                                type="time"
                                name="time"
                                value={interview.time}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Duration (minutes)</label>
                            <input
                                type="number"
                                name="duration"
                                value={interview.duration}
                                onChange={handleChange}
                                min="15"
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={interview.location}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Status</label>
                            <select
                                name="status"
                                value={interview.status}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="Scheduled">Scheduled</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </button>
                            <a
                                href="/interview-schedule"
                                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Back to Schedule
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
                                <span>Interview updated successfully.</span>
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
                                <span>Failed to update interview.</span>
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

export default EditInterview;