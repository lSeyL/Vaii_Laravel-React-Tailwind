import React from "react";

const Modal = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
  message,
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white mx-5 md:mx-0 p-6 rounded-lg shadow-lg text-center z-100">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-2">{message}</p>
        <div className="flex justify-center mt-4 space-x-4">
          <button onClick={onConfirm} className="modal-confirm">
            {confirmText}
          </button>
          <button onClick={onCancel} className="modal-cancel">
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
