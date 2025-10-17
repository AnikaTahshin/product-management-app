"use client";
import { singleProductApi } from "@/services/api.service";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  category?: Category;
}

const ProductDetails = () => {
  const { slug } = useParams(); 
  const [details, setDetails] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await singleProductApi(slug as string);
        setDetails(res);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  if (!details) {
    return <p className="text-center mt-10 text-gray-500">Loading product details...</p>;
  }

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
  src={details.images?.[0]}
  alt={details.name}
  className="object-contain w-full h-80 md:h-full rounded"
/>

          </div>
          <div className="p-6 md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{details.name}</h1>
              <p className="text-gray-600 mb-4">{details.description}</p>
              <p className="text-lg font-semibold text-gray-800">
                Price: <span className="text-blue-600">BDT {details.price}</span>
              </p>
            </div>
            {/* {details.category && (
              <div className="mt-4 flex items-center gap-3">
                <img
  src={details.images?.[0]}
  alt={details.name}
  className="object-cover w-full h-80 md:h-full rounded"
/>

                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold text-gray-800">{details.category.name}</p>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
