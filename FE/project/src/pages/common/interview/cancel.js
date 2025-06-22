import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CancelInterviewSchedule = () => {
    const navigate = useNavigate();
    // Pre-filled data for demonstration (future date from June 23, 2025)
    const [interview] = useState({
        id: 1,
        candidateName: "Jane Smith",
        interviewer: "John Doe",
        date: "2025-06-23",
        time: "10:00 AM",
        location: "Conference Room A",
        status: "Scheduled",
    });

    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);

    const handleCancel = () => {
        setShowConfirm(true);
    };

    const confirmCancel = () => {
        // Simulate API call with 80% success rate
        const success = Math.random() > 0.2;
        if (success) {
            setShowSuccessToast(true);
            setTimeout(() => navigate("/interview-schedule"), 2000); // Redirect to schedule
        } else {
            setShowErrorToast(true);
        }
        setShowConfirm(false);
    };

    const cancelAction = () => {
        setShowConfirm(false);
    };

    return (
        <div className="container-fluid mt-4">
            <div className="mt-4">
                <h2 className="text-3xl font-bold text-gray-900">Cancel Interview Schedule</h2>
                <nav aria-label="breadcrumb" className="mt-2 text-gray-600">
                    <ol className="flex space-x-2">
                        <li className="hover:text-gray-900">
                            <a href="/interview-list" className="hover:underline">
                                Interview Management
                            </a>
                        </li>
                        <li className="text-gray-900">Cancel Interview Schedule</li>
                    </ol>
                </nav>

                <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                    <div className="space-y-6">
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Status</label>
                                    <p className="mt-1 text-lg text-gray-900">{interview.status}</p>
                                </div>
                            </div>
                        </div>

                        {!showConfirm && (
                            <button
                                onClick={handleCancel}
                                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Cancel Schedule
                            </button>
                        )}
                        {showConfirm && (
                            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                                <p className="text-sm text-yellow-700">
                                    Are you sure you want to cancel this interview schedule? This action cannot be undone.
                                </p>
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        onClick={confirmCancel}
                                        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                    >
                                        Confirm Cancel
                                    </button>
                                    <button
                                        onClick={cancelAction}
                                        className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                        {!showConfirm && (
                            <a
                                href="/interview-schedule"
                                className="ml-4 px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            >
                                Back to Schedule
                            </a>
                        )}
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
                                <span>Interview schedule cancelled successfully.</span>
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
                                <span>Failed to cancel interview schedule.</span>
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


export default CancelInterviewSchedule ;