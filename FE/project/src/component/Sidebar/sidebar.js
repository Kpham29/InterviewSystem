import React from "react";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const navItems = [
        { href: "/home", icon: "fas fa-home", text: "Homepage" },
        { href: "/candidate-list", icon: "fas fa-users", text: "Candidate" },
        { href: "/job-list", icon: "fas fa-briefcase", text: "Job" },
        { href: "/interview-list", icon: "fas fa-calendar-alt", text: "Interview" },
        { href: "/offer-list", icon: "fas fa-file-contract", text: "Offer" },
        { href: "/user-list", icon: "fas fa-user-cog", text: "User", active: true },
    ];

    return (
        <div
            className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
        >
            <ul className="flex flex-col space-y-1">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.href}
                            className={`flex items-center text-white px-4 py-2 ${
                                item.active ? "bg-blue-600" : "hover:bg-gray-700"
                            }`}
                        >
                            <i className={`${item.icon} min-w-[20px] mr-3`}></i>
                            <span className={isCollapsed ? "hidden" : ""}>{item.text}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;