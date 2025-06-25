import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../utils/routers";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("A reset link has been sent to your email.");
      } else {
        alert("Email not found!");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
      console.error("Forgot password error:", error);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate(ROUTERS.COMMON.LOGIN);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-md w-full max-w-lg">
        <h1 className="text-[20px] font-bold text-center mb-6 uppercase text-[#1c1c1c]">
          IMS Recruitment
        </h1>
        <p className="text-center mt-3 mb-3">
          Please enter your email to get a link to reset password{" "}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <label className="block font-medium w-1/3 text-[14px] text-center">
              Email
            </label>
            <input
              type="email"
              className="w-2/3 px-3 py-2 border border-gray-300 bg-gray-200 rounded-md focus:outline-none"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="text-[14px] text-[#ffffff] uppercase font-bold bg-[#008874] rounded-[4px] h-[46px] w-[150px] cursor-pointer border-none mr-8"
            >
              Send
            </button>
            <button
              className="text-[14px] text-[#ffffff] uppercase font-bold bg-red-600 rounded-[4px] h-[46px] w-[150px] cursor-pointer border-none"
              onClick={handleBack}
            >
              Back to login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
