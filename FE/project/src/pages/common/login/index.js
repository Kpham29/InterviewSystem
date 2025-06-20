import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../utils/routers";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate(ROUTERS.COMMON.HOME);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-md w-full max-w-lg">
        <h1 className="text-[20px] font-bold text-center mb-6 uppercase text-[#1c1c1c]">
          IMS Recruitment
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4 flex items-center">
            <label className="block font-medium w-1/3 text-[14px]">
              Username
            </label>
            <input
              type="text"
              className="w-2/3 px-3 py-2 border border-gray-300 bg-gray-200 rounded-md focus:outline-none"
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <label className="block font-medium w-1/3 text-[14px]">
              Password
            </label>
            <input
              type="password"
              className="w-2/3 px-3 py-2 border border-gray-300 bg-gray-200 rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center text-[14px] font-normal">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a
              href={ROUTERS.COMMON.FORGOT_PASSWORD}
              className="text-blue-600 hover:underline text-[14px]"
            >
              Forgot password?
            </a>
          </div>
          <button className="text-[14px] text-[#ffffff] uppercase font-bold bg-[#008874] rounded-[4px] h-[46px] w-full cursor-pointer border-none">
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
