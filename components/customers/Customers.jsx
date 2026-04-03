import React from "react";
import Title from "../ui/Title";
import CustomerItem from "./CustomerItem";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Customers = () => {
  function NextBtn({ onClick }) {
    return (
      <button
        className="absolute -bottom-14 left-1/2 ml-1 bg-primary hover:bg-primary/80 flex items-center justify-center w-11 h-11 rounded-full text-secondary transition-all duration-200 shadow-lg"
        onClick={onClick}
      >
        <IoIosArrowForward size={18} />
      </button>
    );
  }

  function PrevBtn({ onClick }) {
    return (
      <button
        className="absolute -bottom-14 right-1/2 mr-1 bg-white/10 border border-white/20 hover:bg-primary hover:border-primary flex items-center justify-center w-11 h-11 rounded-full text-white hover:text-secondary transition-all duration-200"
        onClick={onClick}
      >
        <IoIosArrowBack size={18} />
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-secondary py-20 pb-28">
      <div className="container mx-auto px-4 xl:px-0">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-primary text-xs font-bold uppercase tracking-[0.25em] mb-3">
            Testimonials
          </span>
          <Title addClass="text-[40px] text-white leading-tight">
            What Our Customers Say
          </Title>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4 mb-4"></div>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Hear from the people who love dining with us
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <Slider {...settings}>
            <CustomerItem
              imgSrc="/images/client1.jpg"
              name="Sarah Mitchell"
              role="Food Blogger"
              text="The ambiance was perfect and the food was absolutely divine. Every dish was a masterpiece. I can't wait to come back!"
            />
            <CustomerItem
              imgSrc="/images/client2.jpg"
              name="James Wilson"
              role="Regular Customer"
              text="Best dining experience in town! The attention to detail and the quality of ingredients really sets this place apart."
            />
            <CustomerItem
              imgSrc="/images/client1.jpg"
              name="Emily Parker"
              role="Restaurant Critic"
              text="From the moment you walk in, you're treated to an exceptional culinary journey. Highly recommended for food lovers!"
            />
            <CustomerItem
              imgSrc="/images/client2.jpg"
              name="Michael Chen"
              role="Local Foodie"
              text="A hidden gem with incredible flavors. The menu is creative and every plate is beautifully presented. Five stars!"
            />
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Customers;