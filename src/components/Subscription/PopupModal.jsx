import React from "react";

function PopupModal({ show, onClose, title, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="modal-content mb-4">{children}</div>
        <button
          onClick={onClose}
          className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PopupModal;
