import { useEffect, useState } from "react";
import Image from "next/image";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = ({ categoryList, productList }) => {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState([]);
  const [productLimit, setProductLimit] = useState(6);

  useEffect(() => {
    setFilter(
      productList.filter(
        (product) =>
          product.category === categoryList[active]?.title.toLowerCase()
      )
    );
  }, [categoryList, productList, active]);

  return (
    <section className="relative w-full min-h-[600px] overflow-hidden py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/menu-bg.png"
          alt="Menu Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
        <div className="absolute inset-0 bg-secondary/90"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 xl:px-0 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
            Explore
          </span>
          <Title addClass="text-[40px] text-white leading-tight">
            Our Menu
          </Title>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4 mb-4"></div>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Discover our handcrafted dishes, prepared fresh with premium
            ingredients and served with love
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categoryList &&
            categoryList.map((category, index) => (
              <button
                key={category._id}
                onClick={() => {
                  setActive(index);
                  setProductLimit(6);
                }}
                className={`px-7 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border ${
                  index === active
                    ? "bg-primary text-secondary border-primary shadow-[0_4px_20px_rgba(255,190,51,0.3)]"
                    : "bg-white/5 text-gray-300 border-white/15 hover:border-primary hover:text-primary backdrop-blur-sm"
                }`}
              >
                {category.title}
              </button>
            ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filter.length > 0 &&
            filter
              .slice(0, productLimit)
              .map((product) => (
                <MenuItem key={product._id} product={product} />
              ))}
        </div>

        {/* Empty State */}
        {filter.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No dishes available in this category yet.
            </p>
          </div>
        )}

        {/* View More */}
        {filter.length > productLimit && (
          <div className="flex justify-center mt-12">
            <button
              className="px-10 py-3 rounded-full bg-primary text-secondary text-sm font-bold tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-[0_4px_20px_rgba(255,190,51,0.3)] hover:-translate-y-0.5"
              onClick={() => setProductLimit(productLimit + 6)}
            >
              View More Dishes
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuWrapper;
