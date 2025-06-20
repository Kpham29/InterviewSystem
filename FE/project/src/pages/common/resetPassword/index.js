import React from "react";
import { ROUTERS } from "../../../utils/routers";

const ResetPassword = () => {
  const handleSubmit = (e) => {};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-md w-full max-w-lg">
        <h1 className="text-[20px] font-bold text-center mb-6 uppercase text-[#1c1c1c]">
          IMS Recruitment
        </h1>
        <h2 className="text-[18px] font-semibold text-center text-[#1c1c1c] mt-3 mb-3">
          Reset password
        </h2>
        <form>
          <div className="mb-4 flex items-center">
            <label className="block font-medium w-1/3 text-[14px]">
              New password
            </label>
            <input
              type="password"
              className="w-2/3 px-3 py-2 border border-gray-300 bg-gray-200 rounded-md focus:outline-none"
              name=""
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
              name="confirmpass"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button className="text-[14px] text-[#ffffff] uppercase font-bold bg-[#008874] rounded-[4px] h-[46px] w-[180px] cursor-pointer border-none">
              reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
