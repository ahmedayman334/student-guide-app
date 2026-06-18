import React, { useContext } from 'react';
import { userContext } from '../context/context';
import { FaGraduationCap, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { IoCalendarOutline, IoLinkOutline, IoLogOutOutline } from "react-icons/io5";
import { BsBarChartFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, logoutUser } = useContext(userContext);
  
  const displayName = userData?.name || "Alex Student";
  const displayDepartment = userData?.department || "Economics Major";

  const handleLogoutClick = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="w-[260px] h-screen bg-white flex flex-col justify-between py-8 px-6 border-r border-[#F0F0F5] sticky top-0 shrink-0">
      <div>
        <div className="flex items-center gap-3 px-2 mb-12">
          <div className="bg-[#4E58CA] p-2 rounded-lg text-white">
             <FaGraduationCap size={20} />
          </div>
          <span className="font-bold text-[20px] text-[#1D214E]">Student Guide</span>
        </div>

        <nav className="space-y-1 flex flex-col gap-2">
          <MenuItem icon={<MdOutlineDashboard size={22} />} label="DASHBOARD" path="/dashboard" currentPath={location.pathname} />
          <MenuItem icon={<FaGraduationCap size={22} />} label="ACADEMIC" path="/academic" currentPath={location.pathname} />
          <MenuItem icon={<BsBarChartFill size={22} />} label="GPA Calculator" path="/calculator" currentPath={location.pathname} />
          <MenuItem icon={<IoCalendarOutline size={22} />} label="SCHEDULE" path="/schedule" currentPath={location.pathname} />
          <MenuItem icon={<IoLinkOutline size={22} />} label="QUICK LINKS" path="/links" currentPath={location.pathname} />
          <MenuItem icon={<FaRegUserCircle size={22} />} label="PROFILE" path="/profile" currentPath={location.pathname} />
        </nav>
      </div>

      <div className="flex flex-col gap-3">
        <button 
          onClick={handleLogoutClick}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-[#EBEBF2] text-[#7F8A9E] hover:text-[#D64F5D] hover:bg-[#FFF5F6] hover:border-[#FADCDD] transition-all duration-200 font-bold text-[13px] shadow-[0_2px_10px_rgba(0,0,0,0.01)] cursor-pointer"
        >
          <IoLogOutOutline size={18} />
          Logout
        </button>
        <div className="bg-[#F2F2FF] rounded-[20px] p-4 flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-[#FFD7A3] flex items-center justify-center overflow-hidden border-2 border-white shrink-0 relative">
            <div className="w-6 h-6 bg-[#D8A783] rounded-full absolute -bottom-1"></div>
          </div>
          <div className="overflow-hidden">
            <h4 className="text-[14px] font-bold text-[#1D214E] truncate">{displayName}</h4>
            <p className="text-[10px] text-[#7F8A9E] font-bold tracking-wider uppercase truncate">{displayDepartment}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({ icon, label, path, currentPath }) => {
  const active = currentPath === path;
  return (
    <Link to={path}>
      <div className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-colors ${
        active ? "bg-[#F2F2FF] text-[#4E58CA] font-bold" : "text-[#7F8A9E] font-semibold hover:bg-gray-50"
      }`}>
        {icon}
        <span className="text-[13px] tracking-wide">{label}</span>
      </div>
    </Link>
  );
};

export default SideBar;