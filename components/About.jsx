import Image from "next/image";
import Title from "./ui/Title";
import { FaUtensils, FaTruck, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-bg.png"
          alt="Restaurant atmosphere"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/70"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 xl:px-0 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
              About Us
            </span>
            <Title addClass="text-4xl md:text-5xl text-white leading-tight mb-6">
              We Are Feane
            </Title>
            <div className="w-16 h-1 bg-primary rounded-full mb-8"></div>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-5">
              At Feane, we believe that food is more than just a meal — it&apos;s an
              experience. Every dish we serve is crafted with passion, using the
              freshest ingredients sourced from local farms.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-10">
              From our wood-fired pizzas to our signature gourmet burgers, we pour
              heart and soul into every recipe. Join thousands of happy customers
              who have made Feane their go-to destination for unforgettable flavors.
            </p>
            <button className="btn-primary text-base px-10 py-3 rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-primary/25">
              Read More
            </button>
          </motion.div>

          {/* Right: Feature Cards */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {/* Card 1 */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <FaUtensils className="text-primary" size={20} />
              </div>
              <h4 className="text-white text-lg font-bold mb-2">Fresh Food</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium ingredients sourced daily from trusted local suppliers.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <FaTruck className="text-primary" size={20} />
              </div>
              <h4 className="text-white text-lg font-bold mb-2">Fast Delivery</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Hot meals delivered to your door in 30 minutes or less.
              </p>
            </motion.div>

            {/* Card 3 - spans full width */}
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 sm:col-span-2 group"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <FaStar className="text-primary" size={20} />
              </div>
              <h4 className="text-white text-lg font-bold mb-2">Best Quality</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Award-winning recipes crafted by our expert chefs with love and care for every customer.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;