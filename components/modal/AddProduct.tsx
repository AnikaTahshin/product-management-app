"use client";

import { AddProductApi, categoryIdApi } from "@/services/api.service";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (created: any) => void;
}

const AddProduct = ({ isOpen, onClose, onUpdated }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState(""); 
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryIdApi();
        setCategories(res);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleAdd = async () => {
  // Name validation
  if (!name.trim()) {
    toast.warn("Product name is required!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    return;
  }

  // Price validation
  const numericPrice = Number(price);
  if (price.trim() === "") {
    toast.warn("Price is required!", { transition: Bounce });
    return;
  } else if (isNaN(numericPrice)) {
    toast.warn("Price must be a valid number!", { transition: Bounce });
    return;
  } else if (numericPrice <= 0) {
    toast.warn("Price must be greater than 0!", { transition: Bounce });
    return;
  }

  // Description validation
  if (!description.trim()) {
    toast.error("Product description is required!", { transition: Bounce });
    return;
  }

  // Category validation
  if (!categoryId) {
    toast.error("Please select a category!", { transition: Bounce });
    return;
  }

  // Image validation
  if (!image.trim()) {
    toast.warn("Please provide an image URL!", { transition: Bounce });
    return;
  }

  const data = {
    name: name.trim(),
    description: description.trim(),
    images: [image.trim()],
    price: numericPrice,
    categoryId,
  };

  try {
    const added = await AddProductApi(data);
    toast.success("Product added successfully!", { transition: Bounce });
    onUpdated(added);

    setName("");
    setPrice("");
    setDescription("");
    setImage("");
    setCategoryId("");
    onClose();
  } catch (err) {
    console.error("Failed to add product:", err);
    toast.error("Failed to add product!", { transition: Bounce });
  }
};


  const handleClose = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
    setCategoryId("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>
      <div className="bg-white p-6 rounded-lg z-50 relative w-96">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 border rounded"
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          className="w-full mb-3 p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full mb-3 p-2 border rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          className="w-full mb-3 p-2 border rounded"
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#5A9367] text-white rounded hover:bg-[#438953]"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
