import Image from "next/image";
import { FaStar } from "react-icons/fa";

const CustomerItem = ({ imgSrc, name, role, text }) => {
  return (
    <div className="px-3 mt-2">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-7 relative">
        {/* Quote icon */}
        <div className="absolute top-6 right-7 text-primary/20 text-5xl font-serif leading-none select-none">
          &ldquo;
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={14} className="text-primary" />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6 pr-6">
          {text ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </p>

        {/* Customer Info */}
        <div className="flex items-center gap-4 pt-5 border-t border-white/10">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
            <Image
              src={imgSrc}
              alt={name || "Customer"}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <h5 className="text-white font-semibold text-sm">
              {name || "Customer Name"}
            </h5>
            <span className="text-primary text-xs">{role || "Customer"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerItem;