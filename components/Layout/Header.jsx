import { useState } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);
  const cart = useSelector((state) => state.cart);

  const router = useRouter();

  return (
    <header className="h-[5.5rem] z-50 sticky top-0 w-full bg-secondary">
      <div className="container mx-auto text-white flex justify-between items-center h-full px-4 sm:px-0">
        <Logo />

        {/* DESKTOP NAV */}
        <nav className="sm:flex hidden flex-1 justify-center z-50">
          <ul className="flex gap-x-8 text-[15px] font-medium uppercase tracking-wider">
            <li className={`relative group cursor-pointer transition-colors ${router.asPath === "/" ? "text-primary" : "text-white hover:text-white/80"}`}>
              <Link href="/">Home</Link>
              <div className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 origin-left ${router.asPath === "/" ? "w-full" : "w-0 group-hover:w-full"}`}></div>
            </li>
            <li className={`relative group cursor-pointer transition-colors ${router.asPath === "/menu" ? "text-primary" : "text-white hover:text-white/80"}`}>
              <Link href="/menu">Menu</Link>
              <div className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 origin-left ${router.asPath === "/menu" ? "w-full" : "w-0 group-hover:w-full"}`}></div>
            </li>
            <li className={`relative group cursor-pointer transition-colors ${router.asPath === "/about" ? "text-primary" : "text-white hover:text-white/80"}`}>
              <Link href="/about">About</Link>
              <div className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 origin-left ${router.asPath === "/about" ? "w-full" : "w-0 group-hover:w-full"}`}></div>
            </li>
            <li className={`relative group cursor-pointer transition-colors ${router.asPath === "/reservation" ? "text-primary" : "text-white hover:text-white/80"}`}>
              <Link href="/reservation">Book Table</Link>
              <div className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 origin-left ${router.asPath === "/reservation" ? "w-full" : "w-0 group-hover:w-full"}`}></div>
            </li>
          </ul>
        </nav>

        {/* ACTION ICONS & ORDER BUTTON */}
        <div className="flex gap-x-5 items-center">
          <Link href="/auth/login">
            <span className={`hover:text-primary transition-all cursor-pointer ${
              (router.asPath.includes("profile") || router.asPath.includes("auth")) ? "text-primary" : "text-white"
            }`}>
              <FaUserAlt size={18} />
            </span>
          </Link>
          <Link href="/cart">
            <span className="relative">
              <FaShoppingCart
                className={`hover:text-primary transition-all cursor-pointer ${
                  router.asPath === "/cart" ? "text-primary" : "text-white"
                }`}
                size={18}
              />
              <span className="w-4 h-4 text-[10px] rounded-full bg-primary absolute -top-2 -right-3 text-black inline-flex items-center justify-center font-bold">
                {cart.products.length === 0 ? "0" : cart.products.length}
              </span>
            </span>
          </Link>
          <button onClick={() => setIsSearchModal(true)} className="text-white hover:text-primary transition-colors">
            <FaSearch size={18} />
          </button>
          <a href="/menu" className="md:inline-block hidden">
            <button className="btn-primary rounded-full px-6 py-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-semibold">
              Order Online
            </button>
          </a>
          {/* Hamburger Icon for Mobile */}
          <button
            className="sm:hidden inline-block text-white hover:text-primary transition-colors focus:outline-none"
            onClick={() => setIsMenuModal(true)}
          >
            <GiHamburgerMenu className="text-2xl" />
          </button>
        </div>
      </div>

      {/* MOBILE NAV OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 sm:hidden transition-opacity duration-300 ${
          isMenuModal ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuModal(false)}
      ></div>

      {/* MOBILE NAV MENU DRAWER */}
      <nav
        className={`fixed top-0 left-0 w-[70%] max-w-[300px] h-screen bg-secondary border-r border-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out sm:hidden flex flex-col ${
          isMenuModal ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-gray-800/50">
          <Logo />
          <button onClick={() => setIsMenuModal(false)} className="text-white hover:text-primary transition-colors">
            <GiCancel size={28} />
          </button>
        </div>
        <ul className="flex flex-col gap-y-6 px-6 pt-8 text-lg font-medium tracking-widest uppercase">
          <li
            className={`hover:text-primary transition-colors cursor-pointer ${
              router.asPath === "/" ? "text-primary" : ""
            }`}
            onClick={() => setIsMenuModal(false)}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`hover:text-primary transition-colors cursor-pointer ${
              router.asPath === "/menu" ? "text-primary" : ""
            }`}
            onClick={() => setIsMenuModal(false)}
          >
            <Link href="/menu">Menu</Link>
          </li>
          <li
            className={`hover:text-primary transition-colors cursor-pointer ${
              router.asPath === "/about" ? "text-primary" : ""
            }`}
            onClick={() => setIsMenuModal(false)}
          >
            <Link href="/about">About</Link>
          </li>
          <li
            className={`hover:text-primary transition-colors cursor-pointer ${
              router.asPath === "/reservation" ? "text-primary" : ""
            }`}
            onClick={() => setIsMenuModal(false)}
          >
            <Link href="/reservation">Book Table</Link>
          </li>
        </ul>
      </nav>

      {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
    </header>
  );
};

export default Header;
