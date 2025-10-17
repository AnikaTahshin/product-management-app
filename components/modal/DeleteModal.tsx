"use client";

import { deleteProductApi } from "@/services/api.service";
import React, { useState } from "react";
import { toast, Bounce } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  singleProduct: { id: string } | null;
  onDeleted: (deleted: any) => void;
}

const DeleteModal = ({ isOpen, onClose, singleProduct, onDeleted }: Props) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !singleProduct) return null;

  const handleDeleteProduct = async () => {
    try {
      setLoading(true);

      const deleted = await deleteProductApi(singleProduct.id);
      toast.success("Product deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });

      // 🔥 Call parent callback to remove from UI
      onDeleted(deleted);

      onClose();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg z-50 relative w-96">
        <h2 className="text-xl font-bold mb-4">Delete Product</h2>
        <p>Are you sure you want to delete this product?</p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteProduct}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
