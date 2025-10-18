import { updateProductApi } from "@/services/api.service";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  singleProduct: {
    id: string;
    name: string;
    price: string | number;
    description: string;
  } | null;
  onUpdated: (updated: any) => void;
}

// interface Category {
//   id: string;
//   name: string;
//   image: string;
// }
// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   images: string[];
//   price: number;
//   slug: string;
//   createdAt: string;
//   updatedAt: string;
//   category?: Category;
// }
const EditModal = ({ isOpen, onClose, singleProduct, onUpdated }: Props ) => {
  const [name, setName] = useState(singleProduct?.name || "");
  const [price, setPrice] = useState<string>((singleProduct?.price ?? "").toString());
  const [description, setDescription] = useState(
    singleProduct?.description || ""
  );
  const [productId, setProductId] = useState<string | null>(singleProduct?.id || null);


  useEffect(() => {
    if (singleProduct) {
      setProductId(singleProduct?.id);
      setName(singleProduct?.name);
      setPrice((singleProduct?.price ?? "").toString());
      setDescription(singleProduct?.description);
    }
  }, [singleProduct]);
  // console.log("deails page id",productId)

  const handleUpdate = async () => {
    if (!productId) {
      console.error("Product ID missing");
      return;
    }
    if (name === "" || name === undefined) {
      toast("Please type everything!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (price.trim() === "" || isNaN(Number(price)) || Number(price) <= 0) {
      toast("Please enter correct value!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      return;
    }

    if (description === "" || description === undefined) {
      toast("Please type everything!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    try {
      const updated = await updateProductApi(productId, {
        name,
        description,
        price: Number(price),
      });
      if (updated) {
        toast.success("Product updated!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }

      onUpdated(updated);
      onClose();
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg z-50 relative w-96">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Name"
          value={name ?? ""} 
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
          value={description ?? ""}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#5A9367] text-white rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
