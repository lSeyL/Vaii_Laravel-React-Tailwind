import React, { useState } from "react";
import api from "../../../services/api";
import Modal from "../../../components/UI/Modal";
import { toast } from "react-toastify";
import {
  HiCheck,
  HiOutlineXMark,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useACategory } from "./hooks/useACategory";
function AdminCategory({ category, setCategories }) {
  const {
    isEditing,
    setIsEditing,
    isModalOpen,
    setIsModalOpen,
    updatedCategory,
    setUpdatedCategory,
    handleUpdate,
    handleDelete,
  } = useACategory(category, setCategories);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center text-center border border-gray-200">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedCategory.name}
            onChange={(e) =>
              setUpdatedCategory({ ...updatedCategory, name: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            placeholder="Category Name"
          />
          <textarea
            value={updatedCategory.description}
            onChange={(e) =>
              setUpdatedCategory({
                ...updatedCategory,
                description: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            placeholder="Description"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              <HiCheck className="w-5 h-5" />
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              <HiOutlineXMark className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-900">
            {category.name}
          </h2>
          <p className="text-gray-600">{category.description}</p>

          <div className="flex space-x-2 mt-4">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              <HiOutlinePencil className="w-5 h-5" />
              Edit
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="delete-button"
            >
              <HiOutlineTrash className="w-5 h-5" />
              Delete
            </button>
          </div>
        </>
      )}
      <Modal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Category Deletion"
        message={`Are you sure you want to delete "${category.name}"?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

export default AdminCategory;
