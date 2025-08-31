import React from "react";
import { FaBrain } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="text-white w-full bg-[#222B52] flex items-center justify-between px-4 py-3 shadow-lg">
      <h1 className="text-2xl lg:text-3xl font-bold">CodeSage</h1>
      <FaBrain className="h-8 w-8 lg:h-10 lg:w-10" />
    </div>
  );
};

export default Navbar;
