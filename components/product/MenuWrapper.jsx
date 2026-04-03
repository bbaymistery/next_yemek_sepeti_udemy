import { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = ({ categoryList, productList }) => {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState([]);
  const [productLimit, setProductLimit] = useState(3);

  useEffect(() => {
    setFilter(
      productList.filter(
        (product) =>
          product.category === categoryList[active]?.title.toLowerCase()
      )
    );
  }, [categoryList, productList, active]);

  return (
    <div className="container mx-auto py-10 px-4 xl:px-0">
      {/* Section Header */}
      <div className="text-center mb-8">
        <Title addClass="text-[40px] text-secondary">Our Menu</Title>
        <p className="text-gray-400 mt-2 text-sm max-w-md mx-auto">
          Explore our carefully crafted dishes, made with the finest ingredients
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {categoryList &&
          categoryList.map((category, index) => (
            <button
              key={category._id}
              onClick={() => {
                setActive(index);
                setProductLimit(3);
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
                index === active
                  ? "bg-primary text-secondary shadow-[0_4px_20px_rgba(255,190,51,0.35)]"
                  : "bg-secondary/10 text-secondary hover:bg-secondary hover:text-white"
              }`}
            >
              {category.title}
            </button>
          ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filter.length > 0 &&
          filter
            .slice(0, productLimit)
            .map((product) => (
              <MenuItem key={product._id} product={product} />
            ))}
      </div>

      {/* View More */}
      {filter.length > productLimit && (
        <div className="flex justify-center mt-8">
          <button
            className="btn-primary"
            onClick={() => setProductLimit(productLimit + 3)}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuWrapper;
