import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto px-4">
                {/* Footer Links */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 ">
                    {/* YourBrand */}
                    <div className="text-lg font-bold md:ml-0 lg:ml-4">
                        Polyhaven
                    </div>

                    {/* Navigation Links */}
                    <div className="flex md:ml-7 lg:ml-7 flex-col sm:items-center md:flex-row md:space-x-8 text-center ">
                        <Link
                            to="/about"
                            className="hover:text-gray-400 transition-all duration-300"
                        >
                            About Us
                        </Link>
                        <Link
                            to="/products"
                            className="hover:text-gray-400 transition-all duration-300"
                        >
                            Products
                        </Link>
                        <Link
                            to="/contact"
                            className="hover:text-gray-400 transition-all duration-300"
                        >
                            Contact
                        </Link>
                        <Link
                            to="/faq"
                            className="hover:text-gray-400 transition-all duration-300"
                        >
                            FAQ
                        </Link>
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-6 md:mr-0 lg:mr-4">
                        <Link
                            to="/about"
                            className="hover:text-gray-400 transition-all duration-300"
                        >
                            <FaFacebookF size={20} />
                        </Link>
                        <Link
                            to="/about"
                            className="hover:text-gray-400 transition-all duration-300"
                        >
                            <FaTwitter size={20} />
                        </Link>
                        <Link
                            to="/about"
                            className="hover:text-gray-400 transition-all duration-300"
                        >
                            <FaInstagram size={20} />
                        </Link>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Polyhaven. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
