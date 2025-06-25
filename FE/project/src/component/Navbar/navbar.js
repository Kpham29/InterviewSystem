import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../utils/routers";
import ConfirmDialog from "../confirmation";
import logoImg from "../../assets/LogoIMS.jpg";

const Navbar = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(ROUTERS.COMMON.LOGIN);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-fluid flex items-center justify-between py-3 px-4">
        <a className="flex items-center space-x-2" href={ROUTERS.COMMON.HOME}>
          <img src={logoImg} alt="IMS Logo" className="h-10" />
          <span className="text-xl font-semibold">IMS Recruitment</span>
        </a>
        <div className="flex items-center space-x-3">
          <span className="text-gray-700">Admin User</span>
          <button
            onClick={() => setShowConfirm(true)}
            className="btn bg-transparent border border-red-600 text-red-600 px-3 py-1 rounded hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to logout?"
          onConfirm={handleLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
