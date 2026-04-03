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
    <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 flex flex-col border border-gray-100">
      {/* Image */}
      <Link href={`/product/${product._id}`}>
        <div className="relative w-full h-52 bg-gray-50 cursor-pointer overflow-hidden">
          <Image
            src={product.img}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-110 transition-transform duration-500"
            priority
          />
          {/* Price badge */}
          <div className="absolute top-4 right-4 bg-primary text-secondary text-sm font-extrabold px-4 py-1.5 rounded-full shadow-lg">
            ${product.prices[0]}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <Link href={`/product/${product._id}`}>
          <h4 className="text-lg font-bold text-secondary cursor-pointer hover:text-primary transition-colors duration-200">
            {product.title}
          </h4>
        </Link>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed line-clamp-2 flex-1">
          {product.desc}
        </p>

        {/* Add to Cart */}
        <button
          className="mt-4 w-full py-3 rounded-xl bg-secondary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary hover:text-secondary transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-secondary disabled:hover:text-white"
          disabled={findCart}
          onClick={handleClick}
        >
          <RiShoppingCart2Fill size={16} />
          {findCart ? "Already in Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
