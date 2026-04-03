import Image from "next/image";
import Title from "./ui/Title";

const About = () => {
  return (
    <section className="relative w-full min-h-[550px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-img.png"
          alt="About Feane"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-secondary/85"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 xl:px-0 py-20">
        <div className="max-w-2xl">
          <Title addClass="text-[40px] md:text-5xl text-white mb-6">
            We Are Feane
          </Title>
          <div className="w-16 h-1 bg-primary rounded-full mb-6"></div>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
            At Feane, we believe that food is more than just a meal — it&apos;s an
            experience. Every dish we serve is crafted with passion, using the
            freshest ingredients sourced from local farms.
          </p>
          <p className="text-gray-400 text-base leading-relaxed mb-8">
            From our wood-fired pizzas to our signature gourmet burgers, we pour
            heart and soul into every recipe. Join thousands of happy customers
            who have made Feane their go-to destination for unforgettable flavors.
          </p>
          <button className="btn-primary">Read More</button>
        </div>
      </div>
    </section>
  );
};

export default About;