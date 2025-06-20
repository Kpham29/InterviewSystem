import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm">
            <div className="container-fluid flex items-center justify-between py-3 px-4">
                <a className="flex items-center space-x-2" href="#">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="IMS Logo"
                        className="h-10"
                    />
                    <span className="text-xl font-semibold">IMS Recruitment</span>
                </a>
                <div className="flex items-center space-x-3">
                    <span className="text-gray-700">Admin User</span>
                    <a
                        href="/logout"
                        className="btn bg-transparent border border-red-600 text-red-600 px-3 py-1 rounded hover:bg-red-50"
                    >
                        Logout
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;