import { useState } from "react";
import NavItem from "../UI/NavItem";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiMiniBars4 } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { HiOutlineGlobeEuropeAfrica } from "react-icons/hi2";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { HiOutlineHome } from "react-icons/hi2";
import { HiMiniChevronDown } from "react-icons/hi2";
import { HiMiniChevronUp } from "react-icons/hi2";
import { HiOutlineStar } from "react-icons/hi2";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi2";

import Logo from "../UI/Logo";
import SearchBar from "../UI/SearchBar";
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleSearchIconClick = () => {
        console.log("search");
        setIsSearching((prevState) => !prevState);
    };
    const toggleMenu = () => {
        setIsOpen((prevState) => !prevState);
    };
    const toggleCatalogMenu = () => {
        setIsCatalogOpen((prevState) => !prevState);
    };

    return (
        <header className="flex items-center justify-between p-4 text-black sticky top-0 bg-white shadow-md z-50">
            <div className="text-xl font-bold">
                <Logo />
            </div>

            <nav
                className={`bg-neutral space-x-4 hidden py-2 px-2 rounded-full ${
                    isSearching ? "md:hidden lg:flex" : "md:flex"
                }`}
            >
                <NavItem to="/" dot={true}>
                    Home
                </NavItem>
                <NavItem to="/products" dot={true}>
                    Catalog
                </NavItem>
                <NavItem to="/about" dot={true}>
                    About
                </NavItem>
                <NavItem to="/faq" dot={true}>
                    FAQ
                </NavItem>
                <NavItem to="/contact" dot={true}>
                    Contact
                </NavItem>
            </nav>
            <div className="md:flex space-x-4 hidden ">
                {/*<HiOutlineHeart size={32} /> */}
                <SearchBar
                    onSearchIconClick={handleSearchIconClick}
                    isOpen={isSearching}
                    iconSize={32}
                ></SearchBar>

                <NavItem to="/cart">
                    <HiOutlineShoppingCart size={32} />
                </NavItem>

                <NavItem to="/profile">
                    <HiOutlineUser size={32} />
                </NavItem>
            </div>
            <div
                onClick={toggleMenu}
                className={`
          fixed inset-0      
          backdrop-blur-[2px]    
          z-[1000]
          transition-all duration-300 ease-in-out
          ${
              isOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
          }
        `}
            />

            <div className="md:hidden z-[9999] top-0 stick flex align-middle space-x-4">
                <SearchBar
                    onSearchIconClick={handleSearchIconClick}
                    isOpen={isSearching}
                    iconSize={32}
                ></SearchBar>
                <button
                    onClick={toggleMenu}
                    className={`focus:outline-none z-60 transition-all duration-300 ${
                        isOpen
                            ? `bg-neutral rounded-full py-1 px-1 border-2 border-stone-800 hover:bg-stone-200`
                            : ""
                    }`}
                >
                    <>
                        {isOpen ? (
                            <HiXMark size={32} />
                        ) : (
                            <>
                                <HiMiniBars4 size={32} />
                            </>
                        )}
                    </>
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 transform md:hidden ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out bg-stone-100 shadow-md text-black w-64 p-4 z-[2000]`}
            >
                <nav className="flex flex-col space-y-4">
                    <NavItem to="/" onClick={toggleMenu} phone={true}>
                        <HiOutlineHome size={34} />
                        <span>Home</span>
                    </NavItem>
                    <div className="relative ">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={toggleCatalogMenu}
                        >
                            <div className="flex items-center space-x-2">
                                <NavItem
                                    to="/products"
                                    onClick={toggleMenu}
                                    phone={true}
                                >
                                    {" "}
                                    <HiOutlineBookOpen size={34} />
                                    <span>Catalog</span>
                                </NavItem>
                            </div>
                            <button className="focus:outline-none text:bg-accent transition-all duration-300 ease-in-out">
                                {isCatalogOpen ? (
                                    <HiMiniChevronUp size={26} />
                                ) : (
                                    <HiMiniChevronDown size={26} />
                                )}
                            </button>
                        </div>
                    </div>
                    <div
                        className={`overflow-hidden transform ${
                            isCatalogOpen
                                ? "max-h-40 translate-y-0"
                                : "max-h-0 -translate-y-2"
                        } transition-all duration-500 ease-in-out`}
                    >
                        <div className="mt-2 ml-8 space-y-2 text-md ">
                            <NavItem
                                to="/popular"
                                onClick={toggleMenu}
                                phone={true}
                            >
                                <HiOutlineStar size={22} />
                                <span>Popular</span>
                            </NavItem>
                            <NavItem
                                to="/new-arrivals"
                                onClick={toggleMenu}
                                phone={true}
                            >
                                <HiOutlineRocketLaunch size={22} />
                                <span>Downloadable</span>
                            </NavItem>
                        </div>
                    </div>
                    <NavItem to="/about" onClick={toggleMenu} phone={true}>
                        <HiOutlineGlobeEuropeAfrica size={34} />
                        <span>About</span>
                    </NavItem>
                    <NavItem to="/faq" onClick={toggleMenu} phone={true}>
                        <HiOutlineQuestionMarkCircle size={34} />
                        <span>FAQ</span>
                    </NavItem>
                    <NavItem to="/contact" onClick={toggleMenu} phone={true}>
                        <HiOutlineEnvelope size={34} />
                        <span>Contact</span>
                    </NavItem>
                    <NavItem to="/cart" onClick={toggleMenu} phone={true}>
                        <HiOutlineShoppingCart size={34} />
                        <span> Cart</span>
                    </NavItem>
                    <NavItem to="/profile" onClick={toggleMenu} phone={true}>
                        <HiOutlineUser size={34} />
                        <span> Profile</span>
                    </NavItem>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;

/*
function Navbar() {
    return (
        <nav className="p-4 flex shadow-md py-4 px-4 sm:px-10">
            <div className="flex flex-wrap items-center justify-between gap-5 w-full bg-red-500">
                
                <div className="flex-shrink-0 ml-20">
                    <Logo />
                </div>

                
                <ul
                    className="lg:flex gap-x-5 max-lg:space-y-3
                 max-lg:fixed max-lg:bg-red-400 max-lg:w-1/2 
                 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 
                 max-lg:p-6 max-lg:h-full max-lg:shadow-md 
                 max-lg:overflow-auto z-50 max-lg:pl-20"
                >
                    <li>
                        <NavItem to="/">Home</NavItem>
                    </li>
                    <li>
                        <NavItem to="/about">About</NavItem>
                    </li>
                    <li>
                        <NavItem to="/products">Products</NavItem>
                    </li>
                    <li>
                        <NavItem to="/contact">Contact</NavItem>
                    </li>
                </ul>

                
                <div className="flex max-lg:ml-auto space-x-4">
                    <NavItem
                        class="px-4 py-2 text-sm rounded-full font-bold text-gray-500 border-2 bg-transparent hover:bg-gray-50 transition-all ease-in-out duration-300"
                        to="/profile"
                    >
                        Profile
                    </NavItem>
                    <NavItem to="/cart">Cart</NavItem>
                </div>
            </div>
        </nav>
    );
}
*/
