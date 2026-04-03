import Image from "next/image";
import Title from "./ui/Title";
import { MdShoppingCart } from "react-icons/md";

const CampaignItem = ({ image, title, discount, subtitle, buttonText }) => {
  return (
    <div className="bg-secondary flex-1 rounded-2xl py-8 px-6 flex flex-col md:flex-row items-center gap-6 shadow-2xl relative overflow-hidden group">
      {/* Premium accent flair */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] -z-0 pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>
      
      {/* Image container */}
      <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0 border-4 border-primary rounded-full overflow-hidden shadow-xl z-10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      
      {/* Content wrapper */}
      <div className="text-white flex-1 text-center md:text-left z-10">
        <Title addClass="text-3xl md:text-4xl font-bold tracking-wide">{title}</Title>
        {subtitle && <p className="text-gray-300 mt-3 text-[15px] font-medium leading-relaxed">{subtitle}</p>}
        
        <div className="font-dancing my-5 text-primary flex items-baseline justify-center md:justify-start">
          <span className="text-5xl font-bold">{discount}</span>
          <span className="text-lg inline-block ml-2 text-white font-sans font-semibold uppercase tracking-widest">Off</span>
        </div>
        
        <button className="btn-primary rounded-full px-8 py-3 flex items-center justify-center gap-x-3 mx-auto md:mx-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm font-bold uppercase tracking-wider">
          {buttonText} <MdShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

const Campaigns = () => {
  return (
    <section className="w-full bg-[#f8f9fa] py-16 border-y border-gray-200/50">
      <div className="container mx-auto px-4 xl:px-0">
        {/* Stunning Section Title */}
        <div className="text-center mb-12 flex flex-col items-center">
          <Title addClass="text-5xl font-extrabold text-secondary drop-shadow-sm tracking-tight mb-3">
            Special Offers
          </Title>
          <div className="w-24 h-1 bg-primary rounded-full mb-4"></div>
          <p className="text-gray-500 text-lg font-medium max-w-lg">
            Savor the flavors with our exclusive limited-time deals! Grab them before they're gone.
          </p>
        </div>

        {/* Campaign Cards */}
        <div className="flex justify-between gap-8 flex-col lg:flex-row">
          <CampaignItem 
            image="/images/pizza_campaign.png"
            title="Tasty Fridays"
            subtitle="Enjoy our premium wood-fired artisan pizza made with fresh ingredients."
            discount="20%"
            buttonText="Order Now"
          />
          <CampaignItem 
            image="/images/burger_campaign.png"
            title="Burger Bonanza"
            subtitle="A towering gourmet burger with melting cheese. Upgrade to combo save more!"
            discount="15%"
            buttonText="Grab Menu"
          />
        </div>
      </div>
    </section>
  );
};

export default Campaigns;