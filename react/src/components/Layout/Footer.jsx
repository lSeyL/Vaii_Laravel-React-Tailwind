import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 ">
          <div className="text-lg font-bold md:ml-0 lg:ml-4">Polyhaven</div>

          <div className="flex md:ml-7 lg:ml-7 flex-col sm:items-center md:flex-row md:space-x-8 text-center ">
            <Link to="/about" className="footer-link ">
              About Us
            </Link>
            <Link to="/products" className="footer-link ">
              Products
            </Link>
            <Link to="/contact" className="footer-link ">
              Contact
            </Link>
            <Link to="/faq" className="footer-link ">
              FAQ
            </Link>
          </div>

          <div className="flex space-x-6 md:mr-0 lg:mr-4">
            <Link to="/about" className="footer-link ">
              <FaFacebookF size={20} />
            </Link>
            <Link to="/about" className="footer-link ">
              <FaTwitter size={20} />
            </Link>
            <Link to="/about" className="footer-link ">
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Polyhaven. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
