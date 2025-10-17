import { categoryIdApi, filterProductApi } from "@/services/api.service";
import { useEffect, useState } from "react";

interface FilterProductProps {
  onFiltered: (products: any[]) => void;
}

const FilterProduct = ({
  onFiltered,
}: {
  onFiltered: (products: any[]) => void;
}) => {
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryIdApi();
        setCategories(res);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleFilter = async (id: string) => {
    setCategoryId(id);
    try {
      const res = await filterProductApi(id);
      onFiltered(res); 
    } catch (error) {
      console.error("Error filtering products:", error);
      onFiltered([]); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <select
        className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={categoryId}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="">Filter by category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <div className="mt-4 w-full max-w-md">
        {filteredProducts.length > 0 && (
          <ul className="space-y-2">
            {filteredProducts.map((p) => (
              <li
                key={p.id}
                className="border p-2 rounded-md shadow-sm text-gray-700"
              >
                {p.name}
              </li>
            ))}
          </ul>
        ) }
      </div>
    </div>
  );
};

export default FilterProduct;
