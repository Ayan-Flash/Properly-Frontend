import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white backdrop-blur-sm bg-opacity-90 text-blue-500 pt-16 pb-8 px-6 md:px-20">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold  text-blue-400">Properly</h2>
          <p className="mt-4 text-orange-400 leading-relaxed text-xl  ">
            
            We help property investors make smart, tax-optimized and profitable
            decisions through research-driven insights as well as tracks the expensens related to property.
          </p>

          <p className="mt-5 text-gray-800 font-medium text-xl">
            ACN: <span className="hover:text-orange-400 transition-colors duration-300 text-xl">664 478 595</span>
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-400 mb-4 border-l-4 border-orange-400 pl-3">
            Services
          </h3>
          <ul className="space-y-3 text-black text-xl">
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors duration-300 text-xl">Property Tax Advisory</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors duration-300 text-xl">Investment Planning</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors duration-300 text-xl">Portfolio Review</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors duration-300 text-xl">Home Loan Assistance</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors duration-300 text-xl">Property Evaluation</a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-400 mb-4 border-l-4 border-orange-400 pl-3">
            Resources
          </h3>
          <ul className="space-y-3 text-black text-xl">
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors duration-300 text-xl">FAQ</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors duration-300 text-xl">Blog</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors duration-300 text-xl">Help Center</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors duration-300 text-xl">Guides</a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors duration-300 text-xl">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-400 mb-4 border-l-4 border-orange-400 pl-3">
            Contact
          </h3>

          <p className="text-black text-xl">
            <strong>Phone:</strong> +61 493 767 832
          </p>

          <p className="mt-3 text-black text-xl">
            <strong>Email:</strong> support@Properly.com
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <a href="#" className="p-3 rounded-full border border-orange-400 text-blue-400 hover:bg-orange-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-6 flex items-center justify-center">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="p-3 rounded-full border border-orange-400 text-blue-400 hover:bg-orange-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-6 flex items-center justify-center">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="p-3 rounded-full border border-orange-400 text-blue-400 hover:bg-orange-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-6 flex items-center justify-center">
              <FaLinkedinIn size={18} />
            </a>
            <a href="#" className="p-3 rounded-full border border-orange-400 text-blue-400 hover:bg-orange-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-6 flex items-center justify-center">
              <FaYoutube size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 pt-6 border-t border-gray-700 text-center">
        <p className="text-gray-500 text-xl">
          © 2025 All Rights Reserved by{" "}
          <span className="text-blue-400 font-medium">Properly</span>.
        </p>
      </div>
    </footer>
  );
}