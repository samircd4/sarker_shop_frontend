import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility on mobile

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container flex min-h-screen mx-auto p-4 bg-teal-600">
      {/* Filter Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-24 right-4 bg-white p-3 rounded-full shadow-lg z-50"
      >
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          ></path>
        </svg>
      </button>

      {/* Sidebar for Filters */}
      <div
        className={`fixed inset-y-0 left-0 md:w-2/6 mt-[68px] md:mt-[48px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64 md:shadow-none`}
      >
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">Filters</h3>
          <div className="space-y-4">
            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price Range
              </label>
              <input type="range" min="0" max="100" className="w-full" />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select className="w-full p-2 border rounded">
                <option>All</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Accessories</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <select className="w-full p-2 border rounded">
                <option>All</option>
                <option>5 Stars</option>
                <option>4 Stars & Above</option>
                <option>3 Stars & Above</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="ml-0 md:ml-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-2 transform transition-transform duration-300 group-hover:scale-110"
                />
                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>

              {/* Review Stars */}
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= product.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
                    ></path>
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Price and Add to Cart Button */}
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold">${product.price}</p>
                {product.originalPrice && (
                  <p className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </p>
                )}
              </div>
              <button className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
