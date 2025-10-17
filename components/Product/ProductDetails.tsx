"use client";

import { singleProductApi } from "@/services/api.service";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../loader/Loader";
import EditModal from "../modal/EditModal";

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
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await singleProductApi(slug as string);
        if (res) {
          setLoading(false);
          setDetails(res);

        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  const handleDelete = async () => {
    
  };



 

  const formattedCreatedAt = details ? new Date(details.createdAt).toLocaleString() : "";
  const formattedUpdatedAt = details ? new Date(details.updatedAt).toLocaleString() : "";



  const handleUpdateProduct = () => {
    
  }
  return (
    <>

    {
      isEdit && 
      <EditModal
        isOpen={isEdit}
        singleProduct={details}
        onClose={() => setIsEdit(false)}
        onUpdated={handleUpdateProduct}
      />
    }
    
    {
      loading ? <Loader /> : (
        <div className="flex justify-center items-center mt-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
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
              <h1 className="text-3xl font-semibold text-gray-900 mb-3">{details?.name}</h1>
              <p className="text-gray-600 mb-4">{details?.description}</p>

              <p className="text-lg font-semibold text-gray-800 mb-2">
                Price: <span className="text-blue-600">BDT {details?.price}</span>
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
                  {/* <img
                    src={details.category.image}
                    alt={details.category.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  /> */}
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-800">{details.category.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setIsEdit(true)}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
      )
    }
    </>
  );
};

export default ProductDetails;
