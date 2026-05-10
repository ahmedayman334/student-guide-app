import React from 'react';
import { FaGraduationCap } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineInsertChart } from "react-icons/md";
import { IoCalendarOutline, IoLinkOutline } from "react-icons/io5";

function SideBar() {
  return (
    <div className="w-[260px] h-screen bg-white flex flex-col justify-between py-8 px-6 border-r border-[#F0F0F5] sticky top-0">
      <div>
        <div className="flex items-center gap-3 px-2 mb-12">
          <div className="bg-[#4E58CA] p-2 rounded-lg text-white">
             <FaGraduationCap size={20} />
          </div>
          <span className="font-bold text-[20px] text-[#1D214E]">Student Guide</span>
        </div>

        <nav className="space-y-2">
          <MenuItem icon={<MdOutlineDashboard size={22} />} label="DASHBOARD" active={true} />
          <MenuItem icon={<FaGraduationCap size={22} />} label="ACADEMIC" />
          <MenuItem icon={<MdOutlineInsertChart size={22} />} label="GPA ANALYTICS" />
          <MenuItem icon={<IoCalendarOutline size={22} />} label="SCHEDULE" />
          <MenuItem icon={<IoLinkOutline size={22} />} label="QUICK LINKS" />
        </nav>
      </div>

      <div className="bg-[#F2F2FF] rounded-[20px] p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#FFD7A3] flex items-center justify-center overflow-hidden border-2 border-white shrink-0 relative">
          {/* Simple avatar representation */}
          <div className="w-6 h-6 bg-[#D8A783] rounded-full absolute -bottom-1"></div>
        </div>
        <div className="overflow-hidden">
          <h4 className="text-[14px] font-bold text-[#1D214E] truncate">Alex Johnson</h4>
          <p className="text-[12px] text-[#7F8A9E] font-medium truncate">Computer Science</p>
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({ icon, label, active = false }) => {
  return (
    <div className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-colors ${
      active ? "bg-[#F2F2FF] text-[#4E58CA] font-bold" : "text-[#7F8A9E] font-semibold hover:bg-gray-50"
    }`}>
      {icon}
      <span className="text-[13px] tracking-wide">{label}</span>
    </div>
  );
};

export default SideBar;