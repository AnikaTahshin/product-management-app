"use client";
import {
  productsApi,
  productsApiLength,
  searchProductsApi,
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
import FilterProduct from "@/components/filterProduct/FilterProduct";
import { useRouter } from "next/navigation";

const Products = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [filteredOffset, setFilteredOffset] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [singleProduct, setSingleProduct] = useState<productType | null>(null);
  const limit = 10;
  const router = useRouter();
   const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
    const [searchText, setSearchText] = useState("");

  const getAllProductsLength = async () => {
    const res = await productsApiLength();
    setAllProducts(res);
  };

  const fetchAllProducts = async () => {
    const res = await productsApi(offset, limit);
    setProducts(res);
  };

  const isFiltering = filteredProducts.length > 0;

  const displayedProducts = isFiltering
    ? filteredProducts.slice(filteredOffset, filteredOffset + limit)
    : products;

  const totalAllPages = Math.ceil(allProducts.length / limit);
  const totalFilteredPages = Math.ceil(filteredProducts.length / limit);

  const currentPage = isFiltering
    ? Math.floor(filteredOffset / limit) + 1
    : Math.floor(offset / limit) + 1;

  // Pagination handlers
  const handlePage = (page: number) => {
    if (isFiltering) setFilteredOffset((page - 1) * limit);
    else setOffset((page - 1) * limit);
  };

  const handleNext = () => {
    if (isFiltering) {
      if (filteredOffset + limit < filteredProducts.length)
        setFilteredOffset(filteredOffset + limit);
    } else {
      if (currentPage < totalAllPages) setOffset(offset + limit);
    }
  };

  const handlePrev = () => {
    if (isFiltering) {
      if (filteredOffset > 0) setFilteredOffset(filteredOffset - limit);
    } else {
      if (currentPage > 1) setOffset(offset - limit);
    }
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const totalPagesToUse = isFiltering ? totalFilteredPages : totalAllPages;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPagesToUse) {
      endPage = totalPagesToUse;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) pages.push(i);
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
          ? { ...p, name: updated.name, price: updated.price, description: updated.description, slug: updated.slug }
          : p
      )
    );
    setFilteredProducts((prev) =>
      prev.map((p) =>
        p.id === updated.id
          ? { ...p, name: updated.name, price: updated.price, description: updated.description, slug: updated.slug }
          : p
      )
    );
    setSingleProduct(updated);
    setIsEdit(false);
  };

  const handleDeleteProduct = (deleted: any) => {
    setProducts((prev) => prev.filter((p) => p.id !== deleted.id));
    setFilteredProducts((prev) => prev.filter((p) => p.id !== deleted.id));
  };

  const handleAddProduct = (newProduct: any) => {
    if (!newProduct) return;
    setProducts((prev) => [newProduct, ...prev]);
    setFilteredProducts((prev) => [newProduct, ...prev]);
    setIsAdd(false);
  };



   // On offset change: paginate active dataset
  useEffect(() => {
    if (isSearching) {
      const start = offset;
      const end = offset + limit;
      setProducts(searchResults.slice(start, end));
    } else {
      fetchAllProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);


  const handleSearch = async () => {
    const text = searchText.trim();
    if (!text) {
      setIsSearching(false);
      setSearchResults([]);
      setOffset(0);
      await fetchAllProducts();
      return;
    }
    const res = await searchProductsApi(text);
    setIsSearching(true);
    setSearchResults(res || []);
    setOffset(0);
    setProducts((res || []).slice(0, limit));
  };

  const totalItemCount = isSearching ? searchResults.length : allProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItemCount / limit));

  useEffect(() => { getAllProductsLength(); }, []);
  useEffect(() => { fetchAllProducts(); }, [offset]);

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

      {!displayedProducts.length ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center p-6 w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Products List
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mb-6">
            <button
              onClick={() => setIsAdd(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all"
            >
              + Add Product
            </button>

            <div className="relative w-64">
              <input
                value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
                type="text"
                placeholder="Search products..."
                className="w-full h-11 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <button onClick={handleSearch} className="absolute right-1.5 top-1.5 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition">
                <MdSearch className="text-xl" />
              </button>
            </div>

            <FilterProduct
              onFiltered={(products) => {
                setFilteredProducts(products);
                setFilteredOffset(0); 
              }}
            />
          </div>

          {/* Table */}
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
                {displayedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No products found
                    </td>
                  </tr>
                ) : (
                  displayedProducts.map((product, index) => (
                    <tr key={product.id} onClick={() => {router.push(`/products/${product.slug}`)}} className="hover:bg-slate-50 cursor-pointer">
                      <td className="p-4 border-b border-slate-200">
                        {(currentPage - 1) * limit + index + 1}
                      </td>
                      <td className="p-4 border-b border-slate-200">{product.name}</td>
                      <td className="p-4 border-b border-slate-200">
                        {product.images && product.images.length > 0 && (
                          <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        )}
                      </td>
                      <td className="p-4 border-b border-slate-200">BDT. {product.price}</td>
                      <td className="p-4 border-b border-slate-200">{product.category?.name}</td>
                      <td className="p-4 border-b border-slate-200">{product.description}</td>
                      <td className="p-4 border-b border-slate-200 flex flex-row">
                        <FaRegEdit onClick={() => handleEdit(product.slug)} className="cursor-pointer" size={25} />
                        <MdDeleteOutline onClick={() => handleDelete(product.slug)} className="cursor-pointer" size={25} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <nav aria-label="Page navigation" className="mt-4">
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
          </nav>
        </div>
      )}
    </>
  );
};

export default Products;
