import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import { useRouter } from "next/router";
import PacmanLoader from "react-spinners/PacmanLoader";

const Search = ({ setIsSearchModal }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input on mount
    setTimeout(() => inputRef.current?.focus(), 100);

    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        setProducts(res.data);
        setFiltered(res.data.slice(0, 5));
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsSearchModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsSearchModal]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    const searchFilter = products
      .filter((product) =>
        product.title.toLowerCase().includes(val.toLowerCase())
      )
      .slice(0, 5);
    setFiltered(searchFilter);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-secondary/80 backdrop-blur-sm animate-fadeIn"
        onClick={() => setIsSearchModal(false)}
      />

      <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
        <div className="relative z-50 w-[calc(100vw-48px)] max-w-[600px] animate-slideDown">
          {/* Search Card */}
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden">
            {/* Search Input Area */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
              <IoSearchOutline className="text-gray-400 flex-shrink-0" size={22} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for dishes..."
                value={query}
                onChange={handleSearch}
                className="flex-1 text-base text-secondary outline-none placeholder:text-gray-300 bg-transparent"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setFiltered(products.slice(0, 5));
                    inputRef.current?.focus();
                  }}
                  className="text-gray-300 hover:text-gray-500 transition-colors"
                >
                  <IoClose size={20} />
                </button>
              )}
              <button
                onClick={() => setIsSearchModal(false)}
                className="ml-1 text-xs text-gray-400 border border-gray-200 rounded-md px-2 py-1 hover:bg-gray-50 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto">
              {products.length > 0 ? (
                <>
                  {filtered.length > 0 ? (
                    <ul className="py-2">
                      {filtered.map((product) => (
                        <li
                          key={product._id}
                          className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 group"
                          onClick={() => {
                            router.push(`/product/${product?._id}`);
                            setIsSearchModal(false);
                          }}
                        >
                          {/* Image */}
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                            <Image
                              src={product?.img}
                              alt={product?.title}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-secondary truncate group-hover:text-primary transition-colors">
                              {product?.title}
                            </h4>
                            <p className="text-xs text-gray-400 truncate mt-0.5">
                              {product?.desc?.slice(0, 50)}...
                            </p>
                          </div>

                          {/* Price */}
                          <span className="text-sm font-bold text-primary flex-shrink-0">
                            ${product.prices[0]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-gray-400 text-sm">
                        No results found for &ldquo;
                        <span className="text-secondary font-medium">
                          {query}
                        </span>
                        &rdquo;
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-center items-center py-12">
                  <PacmanLoader color="#ffbe33" size={18} />
                </div>
              )}
            </div>

            {/* Footer hint */}
            {filtered.length > 0 && products.length > 0 && (
              <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50">
                <p className="text-[11px] text-gray-400 text-center">
                  Showing {filtered.length} of {products.length} dishes · Press{" "}
                  <kbd className="bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded text-[10px] font-mono">
                    ESC
                  </kbd>{" "}
                  to close
                </p>
              </div>
            )}
          </div>
        </div>
      </OutsideClickHandler>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideDown { animation: slideDown 0.25s ease-out; }
      `}</style>
    </div>
  );
};

export default Search;
