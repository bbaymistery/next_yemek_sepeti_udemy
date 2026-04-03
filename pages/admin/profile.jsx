import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Category from "../../components/admin/Category";
import Footer from "../../components/admin/Footer";
import Order from "../../components/admin/Order";
import Products from "../../components/admin/Products";
import { toast } from "react-toastify";
import AddProduct from "../../components/admin/AddProduct";
import {
  FaUtensils,
  FaMotorcycle,
  FaTags,
  FaWindowMaximize,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";

const Profile = () => {
  const [tabs, setTabs] = useState(0);
  const [isProductModal, setIsProductModal] = useState(false);
  const { push } = useRouter();

  const closeAdminAccount = async () => {
    try {
      if (confirm("Are you sure you want to close your Admin Account?")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
          push("/admin");
          toast.success("Admin Account Closed!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navItems = [
    { id: 0, label: "Products", icon: <FaUtensils className="text-lg" /> },
    { id: 1, label: "Orders", icon: <FaMotorcycle className="text-lg" /> },
    { id: 2, label: "Categories", icon: <FaTags className="text-lg" /> },
    {
      id: 3,
      label: "Footer Info",
      icon: <FaWindowMaximize className="text-lg" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans">
      {/* Sidebar */}
      <div className="lg:w-[300px] w-full bg-white shadow-2xl shadow-gray-200/50 flex-shrink-0 lg:min-h-screen flex flex-col pt-10 border-r border-gray-100 relative z-10">
        {/* Admin Profile Info */}
        <div className="flex flex-col items-center pb-8 border-b border-gray-100">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
            <Image
              src="/images/admin.png"
              alt="Admin"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Admin Panel
          </h2>
          <span className="mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full tracking-wider">
            Online
          </span>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-5 py-8 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTabs(item.id)}
              className={`w-full flex items-center gap-x-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold tracking-wide ${
                tabs === item.id
                  ? "bg-primary text-secondary shadow-xl shadow-primary/30 transform scale-[1.02]"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 hover:scale-[1.01]"
              }`}
            >
              <div
                className={`${
                  tabs === item.id ? "text-secondary" : "text-gray-400"
                } transition-colors duration-300`}
              >
                {item.icon}
              </div>
              {item.label}
            </button>
          ))}
        </div>

        {/* Exit Button */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={closeAdminAccount}
            className="w-full flex items-center justify-center gap-x-3 px-5 py-4 rounded-xl font-bold text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-700 transition-all duration-300"
          >
            <FaSignOutAlt className="text-xl" />
            Secure Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50 p-6 lg:p-12 relative overflow-x-hidden">
        {/* Dynamic Header Section based on active tab can be placed inside the components themselves 
            but the overall container will provide the premium canvas */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100/60 p-8 lg:p-12 min-h-full transition-all duration-500">
          {tabs === 0 && <Products />}
          {tabs === 1 && <Order />}
          {tabs === 2 && <Category />}
          {tabs === 3 && <Footer />}
        </div>
      </div>

      {/* Floating Action Button for Products (Global Context) */}
      {tabs === 0 && ( /* Only show + button on Products tab for better UX UX */
        <button
          onClick={() => setIsProductModal(true)}
          className="fixed bottom-10 right-10 z-50 w-16 h-16 bg-primary text-secondary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/50 hover:-translate-y-2 hover:bg-primary/90 transition-all duration-300 group overflow-hidden"
          title="Add New Product"
        >
          <div className="absolute inset-0 bg-white/20 transform skew-x-12 -translate-x-full group-hover:animate-shine" />
          <FaPlus className="text-2xl group-hover:rotate-90 transition-transform duration-500" />
        </button>
      )}
      
      {isProductModal && <AddProduct setIsProductModal={setIsProductModal} />}
    </div>
  );
};

export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Profile;
