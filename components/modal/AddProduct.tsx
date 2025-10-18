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

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryIdApi();
        setCategories(res);

        // Auto-select the first category if available
        if (res.length > 0) {
          setCategoryId(res[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!name || !description || !price || !categoryId) {
      toast.error("Please fill all fields correctly!", { transition: Bounce });
      return;
    }

    const data = {
      name,
      description,
      images: [image || "https://laravelpoint.com/files/p_img.jpg"], // placeholder image
      price: Number(price),
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
      toast.error("Failed to add product", { transition: Bounce });
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
        onClick={onClose}
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
