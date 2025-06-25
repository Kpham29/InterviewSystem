import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InterviewDetails = () => {
    const navigate = useNavigate();
    // Pre-filled data for demonstration (future date from June 23, 2025)
    const [interview] = useState({
        id: 1,
        candidateName: "Jane Smith",
        interviewer: "John Doe",
        date: "2025-06-23",
        time: "10:00 AM",
        duration: "30 minutes",
        location: "Conference Room A",
        status: "Scheduled",
        notes: "Prepare technical questions for the candidate.",
    });

    return (
        <div className="container-fluid mt-4">
            <div className="mt-4">
                <h2 className="text-3xl font-bold text-gray-900">Interview Details</h2>
                <nav aria-label="breadcrumb" className="mt-2 text-gray-600">
                    <ol className="flex space-x-2">
                        <li className="hover:text-gray-900">
                            <a href="/interview-list" className="hover:underline">
                                Interview Management
                            </a>
                        </li>
                        <li className="text-gray-900">Interview Details</li>
                    </ol>
                </nav>

                <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">Candidate Information</h3>
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
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-700">Interview Details</h3>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Duration</label>
                                    <p className="mt-1 text-lg text-gray-900">{interview.duration}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Location</label>
                                    <p className="mt-1 text-lg text-gray-900">{interview.location}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Status</label>
                                    <span
                                        className={`mt-1 inline-block px-3 py-1 rounded-full text-sm ${
                                            interview.status === "Scheduled"
                                                ? "bg-green-100 text-green-800"
                                                : interview.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                        }`}
                                    >
                    {interview.status}
                  </span>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Notes</label>
                                    <p className="mt-1 text-lg text-gray-900">{interview.notes}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <a
                            href="/interview-list"
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Back to List
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewDetails;