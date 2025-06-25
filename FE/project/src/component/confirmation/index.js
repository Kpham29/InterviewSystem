import React from "react";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 bg-white p-6 rounded-lg shadow-xl w-96 text-center">
        <p className="text-lg font-medium mb-6">{message}</p>
        <div className="flex justify-around gap-6">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-gray-200 rounded font-semibold hover:bg-[#2563eb] hover:text-white"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 hover:bg-red-600 rounded font-semibold hover:text-white"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
