import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
    const [currentDateTime, setCurrentDateTime] = useState("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentDateTime(now.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }));
        };
        updateDateTime(); // Cập nhật ngay lập tức
        const interval = setInterval(updateDateTime, 60000); // Cập nhật mỗi phút
        return () => clearInterval(interval); // Dọn dẹp khi unmount
    }, []);

    // Dữ liệu giả lập cho thống kê và biểu đồ
    const statsData = {
        interviews: [
            { status: "Scheduled", count: 20 },
            { status: "Completed", count: 15 },
            { status: "Pending", count: 10 },
        ],
        offers: [
            { status: "Pending", count: 8 },
            { status: "Accepted", count: 3 },
            { status: "Rejected", count: 1 },
        ],
        users: [
            { status: "Active", count: 25 },
            { status: "Inactive", count: 5 },
        ],
    };

    const chartData = {
        labels: statsData.interviews.map((item) => item.status),
        datasets: [
            {
                data: statsData.interviews.map((item) => item.count),
                backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
                hoverOffset: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            tooltip: { enabled: true },
        },
    };

    return (
        <div className="container-fluid mt-4">
            <div className="mt-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Dashboard Overview</h1>
                        <p className="text-gray-600 mt-2">Welcome to Interview Management System - {currentDateTime}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Refresh Data
                    </button>
                </div>

                {/* Stats Table */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Statistics Summary</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Scheduled
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Completed
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Pending
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Accepted
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rejected
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Active
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Inactive
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Interviews
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {statsData.interviews.find((item) => item.status === "Scheduled")?.count || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {statsData.interviews.find((item) => item.status === "Completed")?.count || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {statsData.interviews.find((item) => item.status === "Pending")?.count || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Offers
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {statsData.offers.find((item) => item.status === "Pending")?.count || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {statsData.offers.find((item) => item.status === "Accepted")?.count || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {statsData.offers.find((item) => item.status === "Rejected")?.count || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Users
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {statsData.users.find((item) => item.status === "Active")?.count || 0}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {statsData.users.find((item) => item.status === "Inactive")?.count || 0}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interview Status Overview</h2>
                    <div className="w-full md:w-1/2 mx-auto">
                        <Pie data={chartData} options={chartOptions} />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a
                            href="/interview-list"
                            className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-center flex flex-col items-center"
                        >
                            <i className="fas fa-calendar-check text-4xl mb-2"></i>
                            <h3 className="text-lg font-semibold">View Interview List</h3>
                        </a>
                        <a
                            href="/offer-list"
                            className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:bg-green-700 transition-colors text-center flex flex-col items-center"
                        >
                            <i className="fas fa-file-signature text-4xl mb-2"></i>
                            <h3 className="text-lg font-semibold">View Offer List</h3>
                        </a>
                        <a
                            href="/user-list"
                            className="bg-yellow-600 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-700 transition-colors text-center flex flex-col items-center"
                        >
                            <i className="fas fa-users text-4xl mb-2"></i>
                            <h3 className="text-lg font-semibold">Manage Users</h3>
                        </a>
                    </div>
                </div>

                {/* Notifications */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <ul className="space-y-4">
                            <li className="flex items-center justify-between border-b pb-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Interview Reminder</p>
                                    <p className="text-xs text-gray-500">For Jane Smith on 2025-06-23 at 10:00 AM</p>
                                </div>
                                <button className="text-blue-600 hover:underline text-sm">View</button>
                            </li>
                            <li className="flex items-center justify-between border-b pb-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Offer Update</p>
                                    <p className="text-xs text-gray-500">Pending offer for Michael Brown</p>
                                </div>
                                <button className="text-blue-600 hover:underline text-sm">View</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;