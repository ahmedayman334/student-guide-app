import React, { useState, useContext, useEffect } from 'react';
import { userContext } from '../context/context';
import SideBar from '../compontents/SideBar';
import NotificationBell from '../compontents/NotificationBell';
import { FaPen, FaCheckCircle, FaUser, FaBuilding, FaMoon } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { 
  IoCalendarOutline, 
  IoSettingsOutline, 
  IoNotificationsOutline, 
  IoChevronDownOutline,
  IoDownloadOutline,
  IoIdCardOutline
} from "react-icons/io5";
import { BsBellFill } from "react-icons/bs";

export default function Profile() {
  const { userData, updateProfile } = useContext(userContext);
  
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    department: userData?.department || "Computer Science",
    year: userData?.year || "Third Year"
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        department: userData.department || "Computer Science",
        year: userData.year || "Third Year"
      });
    }
  }, [userData]);

  const handleSave = () => {
    updateProfile(formData);
    alert("Profile changes saved successfully!");
  };

  const initials = formData.name ? formData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : "JD";

  return (
    <div className="flex min-h-screen bg-[#F5F5FA] font-sans text-left" dir="ltr">
      <SideBar />
      <div className="flex-1 p-10 overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex justify-end items-center gap-6 mb-8 text-[#7F8A9E]">
          <NotificationBell size={24} />
          <IoSettingsOutline size={24} className="cursor-pointer hover:text-[#1D214E] transition-colors" />
        </div>

        {/* Banner & Avatar Section */}
        <div className="relative mb-24">
          {/* Banner */}
          <div className="h-[200px] w-full rounded-[24px] bg-gradient-to-r from-[#5C6CE1] to-[#80DFE6] shadow-md"></div>
          
          {/* Avatar Area */}
          <div className="absolute -bottom-16 left-12 flex items-end gap-6">
            <div className="relative">
              <div className="w-[140px] h-[140px] rounded-full bg-[#8758FF] border-[6px] border-[#F5F5FA] flex items-center justify-center shadow-lg">
                <span className="text-[48px] font-bold text-white tracking-widest">{initials}</span>
              </div>
              <div className="absolute bottom-2 right-2 w-10 h-10 bg-[#2D439A] rounded-full border-[3px] border-[#F5F5FA] flex items-center justify-center text-white cursor-pointer shadow-sm hover:bg-[#1d2d70] transition-colors">
                <FaPen size={14} />
              </div>
            </div>

            <div className="bg-white rounded-2xl px-8 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-2 relative">
              <h1 className="text-[28px] font-bold text-[#1D214E] tracking-tight leading-none mb-2">{userData?.name || "Johnathan Doe"}</h1>
              <p className="text-[#7F8A9E] text-[15px] font-medium">{userData?.department || "B.Sc. Computer Science"} • {userData?.year || "Third Year"} Student</p>
            </div>
          </div>
        </div>

        {/* Content Grids */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Column */}
          <div className="col-span-4 space-y-8">
            
            {/* Academic Status */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-6">
                <FaCheckCircle className="text-[#4E58CA] text-xl" />
                <h3 className="text-[18px] font-bold text-[#1D214E]">Academic Status</h3>
              </div>
              
              <div className="bg-[#F3F0FA] rounded-2xl p-5 flex justify-between items-center mb-4">
                <span className="text-[#64617A] text-[14px] font-bold">Current GPA</span>
                <span className="text-[#4E58CA] text-[28px] font-bold leading-none">3.85</span>
              </div>
              
              <div className="bg-[#FFF8E7] rounded-2xl p-5 flex justify-between items-center border border-[#FDEBCC]">
                <span className="text-[#A16F0F] text-[14px] font-bold">Credits Earned</span>
                <span className="text-[#B07B18] text-[24px] font-bold leading-none">92 / 120</span>
              </div>
            </div>

            {/* Quick Documents */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              <h3 className="text-[18px] font-bold text-[#1D214E] mb-6">Quick Documents</h3>
              
              <button className="w-full bg-[#F3F6FF] rounded-2xl p-4 flex items-center justify-center gap-4 mb-4 hover:bg-[#ebeeff] transition-colors group">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#4E58CA]">
                  <IoDownloadOutline size={20} className="group-hover:-translate-y-1 transition-transform" />
                </div>
                <span className="text-[#4E58CA] text-[13px] font-bold tracking-widest text-left leading-snug">
                  DIGITAL STUDENT ID<br/>CARD
                </span>
              </button>
              
              <button className="w-full bg-[#F2FBF6] rounded-2xl p-4 flex items-center justify-center gap-4 hover:bg-[#e6f7ec] transition-colors group">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#2A9D79]">
                  <FaFileLines size={18} />
                </div>
                <span className="text-[#2A9D79] text-[13px] font-bold tracking-widest text-left leading-snug">
                  OFFICIAL ACADEMIC<br/>TRANSCRIPT
                </span>
              </button>
            </div>
            
          </div>

          {/* Right Column */}
          <div className="col-span-8 space-y-8">
            
            {/* Personal Information */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-[24px] font-bold text-[#1D214E]">Personal Information</h2>
                  <p className="text-[#7F8A9E] text-[15px] font-medium mt-1">Update your university profile and contact details</p>
                </div>
                <button onClick={handleSave} className="bg-[#4E58CA] text-white px-8 py-3.5 rounded-xl font-bold text-[15px] shadow-[0_8px_20px_rgba(78,88,202,0.3)] hover:bg-[#3c4dba] transition-colors leading-snug">
                  Save Profile<br/>Changes
                </button>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                {/* Full Name */}
                <div>
                  <label className="block text-[#A09DB0] text-[11px] font-bold tracking-widest mb-2 uppercase">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A09DB0]" />
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-[#EBE8F4] rounded-2xl outline-none text-[#1D214E] font-bold focus:ring-2 focus:ring-[#4E58CA] transition-all"
                    />
                  </div>
                </div>

                {/* University ID */}
                <div>
                  <label className="block text-[#A09DB0] text-[11px] font-bold tracking-widest mb-2 uppercase">University ID (Read Only)</label>
                  <div className="relative">
                    <IoIdCardOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A09DB0] text-xl" />
                    <input 
                      type="text" 
                      readOnly 
                      value={userData?.id || "ST-9982441"}
                      className="w-full pl-12 pr-4 py-4 bg-[#F2F1F7] rounded-2xl outline-none text-[#A09DB0] font-bold italic opacity-80"
                    />
                  </div>
                </div>

                {/* Academic Email */}
                <div className="col-span-2">
                  <label className="block text-[#A09DB0] text-[11px] font-bold tracking-widest mb-2 uppercase">Academic Email Address</label>
                  <div className="relative">
                    <MdEmail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A09DB0] text-lg" />
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-[#EBE8F4] rounded-2xl outline-none text-[#1D214E] font-bold focus:ring-2 focus:ring-[#4E58CA] transition-all"
                    />
                  </div>
                </div>

                {/* Primary Department */}
                <div className="relative">
                  <label className="block text-[#A09DB0] text-[11px] font-bold tracking-widest mb-2 uppercase">Primary Department</label>
                  <div className="relative cursor-pointer">
                    <FaBuilding className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A09DB0]" />
                    <input 
                      type="text" 
                      list="DepartmentOptions"
                      value={formData.department} 
                      onChange={e => setFormData({...formData, department: e.target.value})} 
                      className="w-full pl-12 pr-10 py-4 bg-[#EBE8F4] rounded-2xl outline-none text-[#1D214E] font-bold cursor-pointer focus:ring-2 focus:ring-[#4E58CA] transition-all"
                    />
                    <datalist id="DepartmentOptions">
                      <option value="Computer Science" />
                      <option value="Information Technology" />
                      <option value="Software Engineering" />
                      <option value="Physics" />
                      <option value="Applied Science" />
                      <option value="Chemistry" />
                      <option value="Statistics" />
                    </datalist>
                    <IoChevronDownOutline className="absolute right-5 top-1/2 -translate-y-1/2 text-[#A09DB0] text-lg pointer-events-none" />
                  </div>
                </div>

                {/* Current Academic Year */}
                <div className="relative">
                  <label className="block text-[#A09DB0] text-[11px] font-bold tracking-widest mb-2 uppercase">Current Academic Year</label>
                  <div className="relative cursor-pointer">
                    <IoCalendarOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A09DB0] text-lg" />
                    <input 
                      type="text" 
                      list="YearOptions"
                      value={formData.year} 
                      onChange={e => setFormData({...formData, year: e.target.value})} 
                      className="w-full pl-12 pr-10 py-4 bg-[#EBE8F4] rounded-2xl outline-none text-[#1D214E] font-bold cursor-pointer focus:ring-2 focus:ring-[#4E58CA] transition-all"
                    />
                    <datalist id="YearOptions">
                      <option value="First Year" />
                      <option value="Second Year" />
                      <option value="Third Year" />
                      <option value="Fourth Year" />
                      <option value="Graduated" />
                    </datalist>
                    <IoChevronDownOutline className="absolute right-5 top-1/2 -translate-y-1/2 text-[#A09DB0] text-lg pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Portal Preferences */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              <h2 className="text-[20px] font-bold text-[#1D214E] mb-6">Portal Preferences</h2>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Dark Mode */}
                <div className="bg-[#F8F7FB] rounded-2xl p-5 flex items-center justify-between border border-[#F0EEF5]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#EBE8F4] flex items-center justify-center text-[#4E58CA]">
                      <FaMoon size={16} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-[#1D214E]">Dark Mode</h4>
                      <p className="text-[#7F8A9E] text-[12px] font-medium mt-0.5">Switch theme</p>
                    </div>
                  </div>
                  {/* Custom Toggle Switch */}
                  <div className="w-12 h-6 bg-[#4E58CA] rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Email Alerts */}
                <div className="bg-[#F4F9F8] rounded-2xl p-5 flex items-center justify-between border border-[#E9F3F0]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#DFF1EB] flex items-center justify-center text-[#2A9D79]">
                      <BsBellFill size={16} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-[#1D214E]">Email Alerts</h4>
                      <p className="text-[#7F8A9E] text-[12px] font-medium mt-0.5">Grade updates</p>
                    </div>
                  </div>
                  {/* Custom Toggle Switch */}
                  <div className="w-12 h-6 bg-[#5CE1B4] rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
