import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubmitInterviewResult = () => {
    const navigate = useNavigate();
    // Pre-filled data for demonstration (future date from June 23, 2025)
    const [interview] = useState({
        id: 1,
        candidateName: "Jane Smith",
        interviewer: "John Doe",
        date: "2025-06-23",
        time: "10:00 AM",
        location: "Conference Room A",
    });

    const [formData, setFormData] = useState({
        performance: "",
        comments: "",
        status: "Pass",
    });

    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                <h2 className="text-3xl font-bold text-gray-900">Submit Interview Result</h2>
                <nav aria-label="breadcrumb" className="mt-2 text-gray-600">
                    <ol className="flex space-x-2">
                        <li className="hover:text-gray-900">
                            <a href="/interview-list" className="hover:underline">
                                Interview Management
                            </a>
                        </li>
                        <li className="text-gray-900">Submit Interview Result</li>
                    </ol>
                </nav>

                <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">Interview Information</h3>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Candidate Name</label>
                                    <p className="mt-1 text-lg text-gray-900">{interview.candidateName}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Interviewer</label>
                                    <p className="mt-1 text-lg text-gray-900">{interview.interviewer}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Date</label>
                                    <p className="mt-1 text-lg text-gray-900">{interview.date}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Time</label>
                                    <p className="mt-1 text-lg text-gray-900">{interview.time}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Location</label>
                                    <p className="mt-1 text-lg text-gray-900">{interview.location}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">Result Submission</h3>
                            <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Performance (1-10)</label>
                                    <input
                                        type="number"
                                        name="performance"
                                        value={formData.performance}
                                        onChange={handleChange}
                                        min="1"
                                        max="10"
                                        required
                                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Comments</label>
                                    <textarea
                                        name="comments"
                                        value={formData.comments}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        rows="4"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="Pass">Pass</option>
                                        <option value="Fail">Fail</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Submit Result
                                    </button>
                                    <a
                                        href="/interview-schedule"
                                        className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                                    >
                                        Back to Schedule
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Toast Notifications */}
                    <div className="fixed top-6 right-6 z-50">
                        <div
                            className={`${showSuccessToast ? "block" : "hidden"} bg-green-500 text-white p-3 rounded-md shadow-lg`}
                            role="alert"
                            aria-live="assertive"
                            aria-atomic="true"
                        >
                            <div className="flex justify-between items-center">
                                <span>Interview result submitted successfully.</span>
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
                                <span>Failed to submit interview result.</span>
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

export default SubmitInterviewResult;