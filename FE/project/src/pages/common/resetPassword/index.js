import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTERS } from "../../../utils/routers";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const username = queryParams.get("username");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          newPassword,
          token,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Đặt lại mật khẩu thành công!");
        navigate(ROUTERS.COMMON.LOGIN);
      } else {
        alert("Không thể đặt lại mật khẩu. Vui lòng kiểm tra lại.");
      }
    } catch (error) {
      alert("Lỗi kết nối đến server!");
      console.error("Reset error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-md w-full max-w-lg">
        <h1 className="text-[20px] font-bold text-center mb-6 uppercase text-[#1c1c1c]">
          IMS Recruitment
        </h1>
        <h2 className="text-[18px] font-semibold text-center text-[#1c1c1c] mt-3 mb-3">
          Reset password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <label className="block font-medium w-1/3 text-[14px]">
              New password
            </label>
            <input
              type="password"
              className="w-2/3 px-3 py-2 border border-gray-300 bg-gray-200 rounded-md focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <label className="block font-medium w-1/3 text-[14px]">
              Confirm password
            </label>
            <input
              type="password"
              className="w-2/3 px-3 py-2 border border-gray-300 bg-gray-200 rounded-md focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="text-[14px] text-[#ffffff] uppercase font-bold bg-[#008874] rounded-[4px] h-[46px] w-[180px] cursor-pointer border-none"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
