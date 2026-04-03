import Image from "next/image";
import Link from "next/link";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const MenuItem = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const findCart = cart.products.find((item) => item._id === product._id);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addProduct({
        ...product,
        extras: [{ text: "empty" }],
        price: product.prices[0],
        quantity: 1,
      })
    );
  };

  return (
    <div className="group relative bg-secondary rounded-2xl overflow-hidden flex flex-col">
      {/* Image Area */}
      <Link href={`/product/${product._id}`}>
        <div className="relative w-full h-52 bg-[#1a1e27] cursor-pointer overflow-hidden">
          <Image
            src={product.img}
            alt={product.title}
            layout="fill"
            objectFit="contain"
            className="p-6 group-hover:scale-105 transition-transform duration-500"
            priority
          />
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-secondary to-transparent"></div>
        </div>
      </Link>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5">
        <Link href={`/product/${product._id}`}>
          <h4 className="text-lg font-bold text-white cursor-pointer hover:text-primary transition-colors duration-200 leading-tight">
            {product.title}
          </h4>
        </Link>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed line-clamp-2 flex-1">
          {product.desc}
        </p>

        {/* Price + Cart Row */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <span className="text-xl font-extrabold text-primary">${product.prices[0]}</span>
          <button
            className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center hover:bg-primary hover:text-secondary transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary/15 disabled:hover:text-primary"
            disabled={findCart}
            onClick={handleClick}
          >
            <RiShoppingCart2Fill size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
