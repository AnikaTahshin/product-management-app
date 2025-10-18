import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
          <span className="text-gray-500 text-sm">Total Products</span>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">128</h2>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
          <span className="text-gray-500 text-sm">Total Categories</span>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">8</h2>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
          <span className="text-gray-500 text-sm">Orders Today</span>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">25</h2>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
          <span className="text-gray-500 text-sm">Revenue</span>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">BDT 45,000</h2>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b border-gray-200">ID</th>
                <th className="p-3 border-b border-gray-200">Name</th>
                <th className="p-3 border-b border-gray-200">Category</th>
                <th className="p-3 border-b border-gray-200">Price</th>
                <th className="p-3 border-b border-gray-200">Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-200">1</td>
                <td className="p-3 border-b border-gray-200">Leather Sofa</td>
                <td className="p-3 border-b border-gray-200">Furniture</td>
                <td className="p-3 border-b border-gray-200">BDT 25,000</td>
                <td className="p-3 border-b border-gray-200">5</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-200">2</td>
                <td className="p-3 border-b border-gray-200">Anime Figure</td>
                <td className="p-3 border-b border-gray-200">Anime</td>
                <td className="p-3 border-b border-gray-200">BDT 3,500</td>
                <td className="p-3 border-b border-gray-200">15</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-200">3</td>
                <td className="p-3 border-b border-gray-200">Wireless Headphones</td>
                <td className="p-3 border-b border-gray-200">Electronics</td>
                <td className="p-3 border-b border-gray-200">BDT 8,500</td>
                <td className="p-3 border-b border-gray-200">20</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-200">4</td>
                <td className="p-3 border-b border-gray-200">Men's Jacket</td>
                <td className="p-3 border-b border-gray-200">Clothes</td>
                <td className="p-3 border-b border-gray-200">BDT 2,200</td>
                <td className="p-3 border-b border-gray-200">30</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-200">5</td>
                <td className="p-3 border-b border-gray-200">Dining Table Set</td>
                <td className="p-3 border-b border-gray-200">Furniture</td>
                <td className="p-3 border-b border-gray-200">BDT 18,000</td>
                <td className="p-3 border-b border-gray-200">3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
