"use client";

import { singleProductApi, deleteProductApi } from "@/services/api.service";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import EditModal from "../modal/EditModal";
import DeleteModal from "../modal/DeleteModal";

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}

const ProductDetails = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [details, setDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await singleProductApi(slug as string);
        if (res) setDetails(res);
      } catch (error: any) {
        console.error("Error fetching product details:", error);
        if (error?.message?.includes("Invalid product slug")) {
          router.push("/products");
        }
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug, router]);


const handleDeleteProduct = (deleted: Product) => {
  if (!deleted) return;

  router.push("/products");
};


  const handleUpdateProduct = async (updated: Product) => {
    const res = await singleProductApi(updated?.slug);
    setDetails(res);
    setIsEdit(false);
    
    if (updated?.slug && updated.slug !== slug) {
      router.replace(`/products/${updated.slug}`);
    }
  };

  const formattedCreatedAt = details ? new Date(details.createdAt).toLocaleString() : "";
  const formattedUpdatedAt = details ? new Date(details.updatedAt).toLocaleString() : "";

  return (
    <>
      {isEdit && details && (
        <EditModal
          isOpen={isEdit}
          singleProduct={details}
          onClose={() => setIsEdit(false)}
          onUpdated={handleUpdateProduct}
        />
      )}

       <DeleteModal
        isOpen={isDelete}
        onClose={() => setIsDelete(false)}
        singleProduct={details}
        onDeleted={handleDeleteProduct}
      />

      {loading ? (
        <Loader />
      ) : details ? (
        <div className="flex justify-center items-center mt-10 px-4">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
            <div className="flex flex-col md:flex-row">
              {/* Left side: Image */}
              <div className="md:w-1/2 bg-gray-100 flex justify-center items-center">
                <img
                  src={details?.images?.[0]}
                  alt={details?.name}
                  className="object-contain w-full h-80 md:h-[500px] p-4 rounded-lg"
                />
              </div>

              {/* Right side: Info */}
              <div className="md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl font-semibold text-gray-900 mb-3">
                    {details?.name}
                  </h1>
                  <p className="text-gray-600 mb-4">{details?.description}</p>

                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    Price: <span className="text-[#5A9367]">BDT {details?.price}</span>
                  </p>

                  <p className="text-sm text-gray-500 mb-1">
                    <strong>Slug:</strong> {details?.slug}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    <strong>Created At:</strong> {formattedCreatedAt}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    <strong>Updated At:</strong> {formattedUpdatedAt}
                  </p>

                  {details?.category && (
                    <div className="flex items-center gap-3 mt-3 p-2 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="font-medium text-gray-800">
                          {details?.category?.name}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setIsEdit(true)}
                    className="flex items-center cursor-pointer justify-center gap-2 bg-[#5A9367] text-white px-5 py-2 rounded-lg hover:bg-[#438953] transition"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => setIsDelete(true)}
                    className="flex items-center cursor-pointer justify-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center mt-10 text-red-500">Product not found.</p>
      )}
    </>
  );
};

export default ProductDetails;
