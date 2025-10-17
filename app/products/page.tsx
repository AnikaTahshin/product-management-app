"use client";
import {
  productsApi,
  productsApiLength,
  singleProductApi,
} from "@/services/api.service";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import DeleteModal from "@/components/modal/DeleteModal";
import EditModal from "@/components/modal/EditModal";
import { productType } from "@/types/types";
import AddProduct from "@/components/modal/AddProduct";
import Loader from "@/components/loader/Loader";
const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [offset, setOffset] = useState(0);
  const [singleProduct, setSingleProduct] = useState<productType | null>(null);
  const limit = 10;

  const getAllProductsLength = async () => {
    const res = await productsApiLength();
    setAllProducts(res);
  };
  const fetchAllProducts = async () => {
    const res = await productsApi(offset, limit);
    setProducts(res);
  };

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

  const handleEdit = async (slug: string) => {
    setIsEdit(true);
    const res = await singleProductApi(slug);
    setSingleProduct(res);
  };

  const handleDelete = async (slug: string) => {
    setIsDelete(true);
    const res = await singleProductApi(slug);
    setSingleProduct(res);
  };

  const handleUpdateProduct = (updated: productType) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === updated.id
          ? {
              ...p,
              name: updated.name,
              price: updated.price,
              description: updated.description,
              slug: updated.slug,
            }
          : p
      )
    );

    setSingleProduct(updated);
    setIsEdit(false);
  };
  const handleDeleteProduct = (deleted: any) => {
    setProducts((prev) => prev.filter((p) => p.id !== deleted.id));
  };

  const handleAddProduct = async (newProduct: any) => {
    if (!newProduct) return;
    setIsAdd(false);

    setProducts((prev) => [newProduct, ...prev]);
  };

  useEffect(() => {
    getAllProductsLength();
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [offset]);
  return (
    <>
      <DeleteModal
        isOpen={isDelete}
        onClose={() => setIsDelete(false)}
        singleProduct={singleProduct}
        onDeleted={handleDeleteProduct}
      />

      <EditModal
        isOpen={isEdit}
        singleProduct={singleProduct}
        onClose={() => setIsEdit(false)}
        onUpdated={handleUpdateProduct}
      />

      <AddProduct
        isOpen={isAdd}
        onClose={() => setIsAdd(false)}
        onUpdated={handleAddProduct}
      />

      {!products.length ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center p-6 w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Products List
          </h1>

          <div className="flex flex-row justify-between items-center w-full max-w-4xl mb-6">
            {/* Add Product Button */}
            <button
              onClick={() => setIsAdd(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all"
            >
              + Add Product
            </button>

            {/* Search Box */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full h-11 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <button className="absolute right-1.5 top-1.5 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition">
                <MdSearch className="text-xl" />
              </button>
            </div>
          </div>
          {/* table starts */}
          <div className="relative overflow-x-auto w-full max-w-4xl mx-auto">
            <table className="w-full min-w-[600px] text-left table-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
              <thead className="sticky top-0 bg-slate-50 z-10">
                <tr>
                  <th className="p-4 border-b border-slate-300">ID</th>
                  <th className="p-4 border-b border-slate-300">Name</th>
                  <th className="p-4 border-b border-slate-300">Image</th>

                  <th className="p-4 border-b border-slate-300">Price</th>
                  <th className="p-4 border-b border-slate-300">Category</th>
                  <th className="p-4 border-b border-slate-300">Description</th>

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
                        {product.images && product.images.length > 0 && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                      </td>

                      <td className="p-4 border-b border-slate-200">
                        {product.price}
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        {product.category?.name}
                      </td>

                      <td className="p-4 border-b border-slate-200">
                        {product.description}
                      </td>
                      <td className="p-4 border-b border-slate-200 flex flex-row ">
                        <FaRegEdit
                          onClick={() => handleEdit(product.slug)}
                          className="cursor-pointer"
                          size={25}
                        />

                        <MdDeleteOutline
                          onClick={() => handleDelete(product.slug)}
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
          {/* table ends */}

          {/* pagination starts */}
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

          {/* pagination ends */}
        </div>
      )}
    </>
  );
};

export default Products;
