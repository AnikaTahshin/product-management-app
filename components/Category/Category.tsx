"use client";
import { categoryIdApi } from "@/services/api.service";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import Loader from "../loader/Loader";

const Category = () => {
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [loding, setLoding] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryIdApi();
        if (res) {
            setLoding(false)
        setCategories(res);

        }

        if (res.length > 0) {
          setCategoryId(res[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
     {
         !loding ?
         
         (
             <div className="flex flex-col items-center justify-center p-6 w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Category List
        </h1>

        <div className="flex flex-row justify-between items-center w-full max-w-4xl mb-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-11 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5A9367] focus:border-transparent transition"
            />
            <button className="absolute right-1.5 top-1.5 bg-[#5A9367] hover:bg-[#438953] text-white p-2 rounded-full transition">
              <MdSearch className="text-xl" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto w-full max-w-4xl mx-auto">
          <table className="w-full min-w-[600px] text-left table-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <thead className="sticky top-0 bg-slate-50 z-10">
              <tr>
                <th className="p-4 border-b border-slate-300">ID</th>
                <th className="p-4 border-b border-slate-300">Name</th>

                <th className="p-4 border-b border-slate-300">Description</th>
                <th className="p-4 border-b border-slate-300">Image</th>
                <th className="p-4 border-b border-slate-300">Created At</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No products found
                  </td>
                </tr>
              ) : (
                categories.map((category, index) => (
                  <tr
                    key={category.id}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="p-4 border-b border-slate-200">
                      {index + 1}
                      {/* {(currentPage - 1) * limit + index + 1} */}
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      {category.name}
                    </td>

                    <td className="p-4 border-b border-slate-200">
                      {category.description
                        ? category.description
                        : "No description available"}
                    </td>

                    <td className="p-4 border-b border-slate-200">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        "No image"
                      )}
                    </td>

                    <td className="p-4 border-b border-slate-200 flex flex-row">
                      {category.createdAt}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {/* <nav aria-label="Page navigation" className="mt-4">
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <li>
                <button
                   onClick={handlePrev}
                   disabled={currentPage === 1}
                  className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                  </svg>
                </button>
              </li>

              {getPageNumbers().map((pageNum) => (
                <li key={pageNum}>
                  <button
                    onClick={() => handlePage(pageNum)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight border ${currentPage === pageNum ? "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700" : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"}`}
                  >
                    {pageNum}
                  </button>
                </li>
              ))}

              <li>
                <button
                   onClick={handleNext}
                   disabled={isFiltering ? currentPage === totalFilteredPages : currentPage === totalAllPages}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${isFiltering ? currentPage === totalFilteredPages ? "opacity-50 cursor-not-allowed" : "" : currentPage === totalAllPages ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span className="sr-only">Next</span>
                  <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav> */}
      </div>
         )
         :<Loader />
     }
    </div>
  );
};

export default Category;
