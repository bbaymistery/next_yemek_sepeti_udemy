import Image from "next/image";
import Title from "./ui/Title";
import Slider from "react-slick";
import { motion } from "framer-motion";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 30000,
    appendDots: (dots) => (
      <div>
        <ul className="container mx-auto w-full text-start">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 border bg-white rounded-full mt-10"></div>
    ),
  };

  return (
    <div className="min-h-[100vh] w-full -mt-[88px] relative">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="relative h-full w-full">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
      <Slider {...settings}>
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-48 container mx-auto text-white flex flex-col items-start gap-y-8 px-4 sm:px-0 relative z-10"
          >
            <Title addClass="text-5xl sm:text-6xl font-bold tracking-wide drop-shadow-md">Taste the Perfection</Title>
            <p className="text-sm sm:text-lg sm:w-2/5 w-full leading-relaxed font-medium drop-shadow-sm text-gray-200">
              Experience the ultimate blend of flavors with our handcrafted burgers,
              crispy fries, and refreshing beverages. Made daily with fresh, locally
              sourced ingredients to deliver a premium dining experience that you
              simply won&apos;t forget.
            </p>
            <button className="btn-primary rounded-full px-8 py-3 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Order Now
            </button>
          </motion.div>
        </div>
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-48 container mx-auto text-white flex flex-col items-start gap-y-8 px-4 sm:px-0 relative z-10"
          >
            <Title addClass="text-5xl sm:text-6xl font-bold tracking-wide drop-shadow-md">Fresh & Delicious</Title>
            <p className="text-sm sm:text-lg sm:w-2/5 w-full leading-relaxed font-medium drop-shadow-sm text-gray-200">
              We believe in serving food that not only tastes incredible but is made
              with genuine passion. From our signature sauces to our perfectly toasted buns,
              every bite is a testament to our dedication to quality and taste.
            </p>
            <button className="btn-primary rounded-full px-8 py-3 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Order Now
            </button>
          </motion.div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
