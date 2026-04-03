import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../ui/Title";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const [footer, setFooter] = useState([]);

  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        setFooter(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getFooter();
  }, []);

  return (
    <footer className="bg-secondary text-white">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>

      <div className="container mx-auto px-4 xl:px-0 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-primary rounded-full"></span>
            </h3>
            <div className="flex flex-col gap-y-4 mt-4">
              <a
                href={footer?.location}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors duration-200 group"
              >
                <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FaMapMarkerAlt size={14} className="text-primary" />
                </span>
                <span className="text-sm">Location</span>
              </a>
              <a
                href={`tel:${footer?.phoneNumber}`}
                className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors duration-200 group"
              >
                <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FaPhoneAlt size={14} className="text-primary" />
                </span>
                <span className="text-sm">+90 {footer?.phoneNumber}</span>
              </a>
              <a
                href={`mailto:${footer?.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors duration-200 group"
              >
                <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FaEnvelope size={14} className="text-primary" />
                </span>
                <span className="text-sm">{footer?.email || "demo@gmail.com"}</span>
              </a>
            </div>
          </div>

          {/* Brand Center */}
          <div className="text-center">
            <Title addClass="text-4xl text-white mb-4">Feane</Title>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
              {footer?.desc || "Delicious food delivered to your doorstep. Experience the finest flavors crafted with passion."}
            </p>
            <div className="flex items-center justify-center mt-6 gap-3">
              {footer?.socialMedia?.map((item) => (
                <a
                  href={item?.link}
                  className="w-10 h-10 grid place-content-center bg-white/10 text-gray-300 rounded-full hover:bg-primary hover:text-secondary transition-all duration-200 hover:-translate-y-0.5"
                  key={item._id}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={item.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Opening Hours */}
          <div className="md:text-right">
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              Opening Hours
              <span className="absolute -bottom-2 left-0 md:left-auto md:right-0 w-10 h-0.5 bg-primary rounded-full"></span>
            </h3>
            <div className="flex flex-col gap-y-3 mt-4">
              <div className="text-gray-400 text-sm">
                {footer?.openingHours?.day || "Monday - Sunday"}
              </div>
              <div className="text-white font-semibold text-lg">
                {footer?.openingHours?.hour || "10:00 AM - 11:00 PM"}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6">
          <p className="text-center text-gray-500 text-xs tracking-wide">
            © {new Date().getFullYear()} Feane. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
