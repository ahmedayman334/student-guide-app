import React from 'react';
import { IoBookOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { LuCalculator } from "react-icons/lu";
import { FaCalendar, FaRegUserCircle } from "react-icons/fa";
import { PiLinkSimpleLight } from "react-icons/pi";
import { MdOutlineDashboard } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function SideBar({ openMenu, SetopenMenu }) {
  const navgaite=useNavigate();
  return (
    <div
      className={`border-r border-gray-200 bg-white h-screen sticky top-0 transition-all duration-300 flex flex-col ${
        openMenu  ? "w-full lg:w-[200px]"
      : "w-[60px] lg:w-[85px] overflow-hidden"
      }`}
    >
      <div className="h-[70px] flex items-center justify-center border-b border-gray-100">
        {openMenu ? (
          <h1 className="text-xl font-bold text-[#4f39f6] whitespace-nowrap">
            Student Guide
          </h1>
        ) : (
          <div className="w-10 h-10 bg-[#4f39f6] rounded-xl flex items-center justify-center text-white font-bold">
            S
          </div>
        )}
      </div>
      <div className="pt-2 flex justify-center">
        <IoIosMenu
          className="text-3xl cursor-pointer text-gray-600 hover:text-[#4f39f6] transition-colors"
          onClick={() => SetopenMenu(!openMenu)}
        />
      </div>
  <ul
  className={`mt-4 flex flex-col gap-y-3 ${
    openMenu ? "px-3 -ml-[40px] md:text-center py-3" : "px-5 items-center py-3"
  }`}
>
        <MenuItem className icon={<MdOutlineDashboard />} label="Dashboard" isOpen={openMenu} active />
        <MenuItem icon={<IoBookOutline />} label="Academic Guide" isOpen={openMenu} onClick={()=>{navgaite("/login")}} />
        <MenuItem icon={<LuCalculator />} label="GPA Calculator" isOpen={openMenu} />
        <MenuItem icon={<FaCalendar />} label="Smart Schedule" isOpen={openMenu} />
        <MenuItem icon={<PiLinkSimpleLight />} label="Quick Links" isOpen={openMenu} />
        <MenuItem icon={<FaRegUserCircle />} label="Profile" isOpen={openMenu} />
      </ul>
    </div>
  );
}

const MenuItem = ({ icon, label, isOpen, active = false ,onClick}) => {
  return (
    <li
    onClick={onClick}
      className={`flex items-center mt-5 justify-center sm:justify-start mt-5 ${
        isOpen ? "gap-2 ml-12 px-3 py-1   "  : "justify-center p-2 "
      } rounded-xl cursor-pointer transition-all duration-200 ${
        active
          ? "bg-[#4f39f6] text-white"
          : "text-gray-500 hover:bg-indigo-50 hover:text-[#4f39f6]"
      }`}
    >
      <div className="text-xl">{icon}</div>

      {isOpen && (
        <span className="sm:text-center md:text-center font-semibold whitespace-nowrap ">
          {label}
        </span>
      )}
    </li>
  );
};

export default SideBar;