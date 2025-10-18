"use client";
import { categoryIdApi, searchCategoryApi } from "@/services/api.service";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import Loader from "../loader/Loader";

const Category = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categoryIdApi();
      if (res && Array.isArray(res)) {
        setCategories(res);
        setTotalPages(Math.ceil(res.length / limit));
        setIsSearching(false);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const text = searchText.trim();

    if (!text) {
      fetchCategories();
      return;
    }

    try {
      setLoading(true);
      const res = await searchCategoryApi(text);
      setIsSearching(true);
      setCategories(res || []);
      setTotalPages(1);
      setCurrentPage(1);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText.trim() === "") {
      fetchCategories();
    }
  }, [searchText]);

  const indexOfLast = currentPage * limit;
  const indexOfFirst = indexOfLast - limit;
  const currentCategories = categories.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePage = (pageNum: number) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6 w-full flex flex-col items-center">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Category List
          </h1>

          {/* Search Bar */}
          <div className="flex flex-row justify-between items-center w-full max-w-4xl mb-6">
            <div className="relative w-64">
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                type="text"
                placeholder="Search categories..."
                className="w-full h-11 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5A9367] focus:border-transparent transition"
              />
              <button
                onClick={handleSearch}
                className="absolute right-1.5 top-1.5 bg-[#5A9367] hover:bg-[#438953] text-white p-2 rounded-full transition"
              >
                <MdSearch className="text-xl" />
              </button>
            </div>
          </div>

          {/* Category Table */}
          <div className="relative overflow-x-auto w-full max-w-4xl mx-auto">
            <table className="w-full min-w-[600px] text-left table-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
              <thead className="sticky top-0 bg-slate-50 z-10">
                <tr>
                  <th className="p-4 border-b border-slate-300">#</th>
                  <th className="p-4 border-b border-slate-300">Name</th>
                  <th className="p-4 border-b border-slate-300">Description</th>
                  <th className="p-4 border-b border-slate-300">Image</th>
                  <th className="p-4 border-b border-slate-300">Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  currentCategories.map((category, index) => (
                    <tr
                      key={category.id}
                      className="hover:bg-slate-50 cursor-pointer"
                    >
                      <td className="p-4 border-b border-slate-200">
                        {(currentPage - 1) * limit + index + 1}
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
                      <td className="p-4 border-b border-slate-200">
                        {new Date(category.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isSearching && totalPages > 1 && (
            <nav aria-label="Page navigation" className="mt-6">
              <ul className="flex items-center gap-2 text-sm">
                <li>
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Prev
                  </button>
                </li>

                {[...Array(totalPages)].map((_, pageNum) => (
                  <li key={pageNum}>
                    <button
                      onClick={() => handlePage(pageNum + 1)}
                      className={`px-3 py-1 border rounded-md ${
                        currentPage === pageNum + 1
                          ? "bg-[#5A9367] text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {pageNum + 1}
                    </button>
                  </li>
                ))}

                <li>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default Category;
