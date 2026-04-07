import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-6 border-t border-gray-200/60 bg-white/70 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_-4px_20px_rgba(59,130,246,0.1)] transition">
      <div className="px-6 py-4 flex items-center justify-between text-sm text-gray-500">
        {/* Company Name */}
        <p className="font-medium text-gray-700">Zorvyn Fintech</p>

        {/* Copyright */}
        <p>© {new Date().getFullYear()} All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
