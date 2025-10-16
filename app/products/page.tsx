"use client";
import { productsApi, productsApiLength, singleProductApi } from "@/services/api.service";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import DeleteModal from "@/components/modal/DeleteModal";
import EditModal from "@/components/modal/EditModal";
import Image from "next/image";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [offset, setOffset] = useState(0);
  const [singleProduct, setSingleProduct] = useState()
  const [productSlug, setProductSlug] = useState<string>("")
  const limit = 10;

  const getAllProductsLength = async () => {
    const res = await productsApiLength();
    setAllProducts(res);
  };
  const fetchAllProducts = async () => {
    const res = await productsApi(offset, limit);
    setProducts(res);
  };

  useEffect(() => {
    getAllProductsLength();
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [offset]);

  const totalPages = Math.ceil(allProducts.length / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const handlePage = (page: number) => {
    setOffset((page - 1) * limit);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setOffset(offset + limit);
  };

  const handlePrev = () => {
    if (currentPage > 1) setOffset(offset - limit);
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };


  const singleProductFetch = async () => {
    const res = await singleProductApi(productSlug);
    setSingleProduct(res);
  }
  const handleEdit = (slug: string) => {
    setIsEdit(true);
    setProductSlug(slug)
    
    
  };


  useEffect(() => {
    singleProductFetch();
  }, [productSlug])
  

  return (
    <>
      <DeleteModal isOpen={isDelete} onClose={() => setIsDelete(false)} />

      <EditModal isOpen={isEdit} product={singleProduct} onClose={() => setIsEdit(false)} />

      <div className="flex flex-col items-center justify-center p-6 w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Products List
        </h1>

        {/* search input */}
        <div className="search-box border border-[#dfe0e4] relative h-[45px] hidden lg:flex items-center rounded-full w-70 outline-none mb-6">
          <input
            type="text"
            placeholder="Search"
            className="h-full w-full ps-4 outline-none rounded-full"
          />
          <div className="absolute bg-[#006dca] right-0.5 p-3 rounded-full">
            <MdSearch color="white" />
          </div>
        </div>
        {/* search input ends */}

        <div className="relative overflow-x-auto w-full max-w-4xl mx-auto">
          <table className="w-full min-w-[600px] text-left table-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <thead className="sticky top-0 bg-slate-50 z-10">
              <tr>
                <th className="p-4 border-b border-slate-300">ID</th>
                <th className="p-4 border-b border-slate-300">Name</th>
                {/* <th className="p-4 border-b border-slate-300">Image</th> */}

                <th className="p-4 border-b border-slate-300">Price</th>
                <th className="p-4 border-b border-slate-300">Category</th>
                {/* <th className="p-4 border-b border-slate-300">Description</th> */}

                <th className="p-4 border-b border-slate-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="p-4 border-b border-slate-200">
                      {(currentPage - 1) * limit + index + 1}
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      {product.name}
                    </td>

                    <td className="p-4 border-b border-slate-200">
                      {product.price}
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      {product.category?.name}
                    </td>

                    {/* <td className="p-4 border-b border-slate-200">
                    {product.description}
                  </td> */}
                    <td className="p-4 border-b border-slate-200 flex flex-row ">
                      <FaRegEdit
                        onClick={() => handleEdit(product.slug)}
                        className="cursor-pointer"
                        size={25}
                      />
                      <MdDeleteOutline
                        onClick={() => setIsDelete(true)}
                        className="cursor-pointer"
                        size={25}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <nav aria-label="Page navigation" className="mt-4">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>

            {getPageNumbers().map((pageNum) => (
              <li key={pageNum}>
                <button
                  onClick={() => handlePage(pageNum)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                    currentPage === pageNum
                      ? "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                      : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {pageNum}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Products;
