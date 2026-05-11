import React, { useState } from 'react';
import { 
  IoGridOutline, 
  IoCalendarOutline, 
  IoMegaphoneOutline, 
  IoPeopleOutline, 
  IoSettingsOutline,
  IoSearchOutline,
  IoNotificationsOutline,
  IoHelpCircleOutline,
  IoAdd,
  IoSchoolOutline,
  IoMedkitOutline,
  IoCashOutline,
  IoRibbonOutline,
  IoTimeOutline,
  IoHeadsetOutline,
  IoChevronForwardOutline,
  IoPaperPlaneOutline,
  IoClipboardOutline
} from "react-icons/io5";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <IoGridOutline size={20} /> },
    { name: 'Schedule Manager', icon: <IoCalendarOutline size={20} /> },
    { name: 'Announcements', icon: <IoMegaphoneOutline size={20} /> },
    { name: 'Students', icon: <IoPeopleOutline size={20} /> },
    { name: 'Settings', icon: <IoSettingsOutline size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F6FA] font-sans text-left" dir="ltr">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#181B34] flex flex-col justify-between fixed h-screen z-20">
        <div>
          {/* Logo */}
          <div className="p-8">
            <h1 className="text-white text-[24px] font-bold tracking-wide">Student Guide</h1>
            <p className="text-[#646A99] text-[10px] font-bold tracking-[0.2em] mt-1 uppercase">Admin Panel</p>
          </div>

          {/* Nav Menu */}
          <nav className="mt-4 px-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-[12px] text-[14px] font-semibold transition-all ${
                  activeMenu === item.name 
                    ? "bg-[#3B44B3] text-white shadow-[0_4px_15px_rgba(59,68,179,0.3)]" 
                    : "text-[#8E95C0] hover:text-white hover:bg-[#202442]"
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Admin Profile Bottom */}
        <div className="p-6 border-t border-[#202442]">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-[#18C4B8] flex items-center justify-center text-white font-bold text-[16px]">
              A
            </div>
            <span className="text-white font-semibold text-[14px] group-hover:text-[#18C4B8] transition-colors">
              Admin Profile
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[260px] flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-[80px] bg-white px-8 flex items-center justify-between sticky top-0 z-10 border-b border-[#EBEBF2]">
          <div className="relative w-[380px]">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A5BA] text-[18px]" />
            <input 
              type="text" 
              placeholder="Search data, students, or events..."
              className="w-full pl-11 pr-4 py-2.5 bg-[#F5F6FA] rounded-full text-[13px] font-medium text-[#1D214E] placeholder-[#A0A5BA] outline-none focus:ring-2 focus:ring-[#3B44B3] transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-[#6B7280] hover:text-[#1D214E] transition-colors">
              <IoNotificationsOutline size={22} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#F05252] rounded-full border-2 border-white"></span>
            </button>
            <button className="text-[#6B7280] hover:text-[#1D214E] transition-colors">
              <IoHelpCircleOutline size={22} />
            </button>
            <div className="h-8 w-[1px] bg-[#EBEBF2]"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="https://ui-avatars.com/api/?name=Admin+Console&background=EBF4FF&color=3B44B3&bold=true" alt="Admin" className="w-9 h-9 rounded-full" />
              <span className="text-[#1D214E] font-bold text-[14px]">Admin Console</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 flex-1">
          
          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard 
              icon={<IoPeopleOutline size={24} />} 
              iconBg="bg-[#3B44B3]" 
              iconColor="text-white"
              title="Total Students" 
              value="12,482" 
              badge="+4%" 
              badgeColor="text-[#059669] bg-[#DEF7EC]"
            />
            <StatCard 
              icon={<IoCalendarOutline size={24} />} 
              iconBg="bg-[#06B6D4]" 
              iconColor="text-white"
              title="Active Schedules" 
              value="148" 
              badge="Live" 
              badgeColor="text-[#6B7280] bg-[#F3F4F6]"
            />
            <StatCard 
              icon={<IoMegaphoneOutline size={24} />} 
              iconBg="bg-[#F59E0B]" 
              iconColor="text-white"
              title="Announcements Sent" 
              value="52" 
              badge="Weekly" 
              badgeColor="text-[#6B7280] bg-[#F3F4F6]"
            />
            <StatCard 
              icon={<IoClipboardOutline size={24} />} 
              iconBg="bg-[#F05252]" 
              iconColor="text-white"
              title="Pending Items" 
              value="14" 
              badge="Action Required" 
              badgeColor="text-[#9B1C1C] bg-[#FDE8E8]"
            />
          </div>

          <div className="grid grid-cols-3 gap-8">
            
            {/* Left Column - Recent Announcements */}
            <div className="col-span-2 bg-white rounded-[20px] p-7 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-bold text-[#1D214E]">Recent Announcements</h2>
                <button className="text-[#3B44B3] text-[13px] font-bold hover:underline">View All</button>
              </div>

              <div className="space-y-0 divide-y divide-[#F3F4F6]">
                <AnnouncementItem 
                  icon={<IoSchoolOutline size={20} />}
                  title="Spring 2024 Final Exam Schedule Released"
                  desc="The comprehensive final exam schedule for the upcoming spring semester i..."
                  date="Oct 12, 2023 • 09:30 AM"
                  status="Sent"
                  statusColor="text-[#059669] bg-[#DEF7EC]"
                />
                <AnnouncementItem 
                  icon={<IoCalendarOutline size={20} />}
                  title="Campus Infrastructure Maintenance Notice"
                  desc="Scheduled server maintenance will occur this weekend, affecting access to..."
                  date="Oct 11, 2023 • 02:15 PM"
                  status="Sent"
                  statusColor="text-[#059669] bg-[#DEF7EC]"
                />
                <AnnouncementItem 
                  icon={<IoMedkitOutline size={20} />}
                  title="Winter Vaccination Drive Volunteers"
                  desc="We are seeking student volunteers for the upcoming campus-wide health..."
                  date="Oct 10, 2023 • 11:00 AM"
                  status="Draft"
                  statusColor="text-[#B45309] bg-[#FEF3C7]"
                />
                <AnnouncementItem 
                  icon={<IoCashOutline size={20} />}
                  title="Scholarship Application Deadline Extended"
                  desc="Great news for students: the deadline for the University Merit Scholarship ha..."
                  date="Oct 08, 2023 • 04:45 PM"
                  status="Sent"
                  statusColor="text-[#059669] bg-[#DEF7EC]"
                />
                <AnnouncementItem 
                  icon={<IoRibbonOutline size={20} />}
                  title="Official Graduation Ceremony Details"
                  desc="Find the complete schedule and ticketing information for the Class of 2023..."
                  date="Oct 05, 2023 • 10:20 AM"
                  status="Sent"
                  statusColor="text-[#059669] bg-[#DEF7EC]"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-1 space-y-6">
              
              {/* Quick Actions */}
              <div className="bg-white rounded-[20px] p-7 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                <h2 className="text-[20px] font-bold text-[#1D214E] mb-5">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-[#3B44B3] to-[#06B6D4] text-white p-4 rounded-[12px] flex items-center justify-between shadow-[0_4px_15px_rgba(59,68,179,0.3)] hover:opacity-90 transition-opacity">
                    <div className="flex items-center gap-3 font-semibold text-[15px]">
                      <IoAdd size={20} /> Add Lecture
                    </div>
                    <IoChevronForwardOutline />
                  </button>
                  <button className="w-full border-2 border-[#EBEBF2] bg-white text-[#4B5563] p-4 rounded-[12px] flex items-center justify-between hover:border-[#3B44B3] hover:text-[#3B44B3] transition-colors">
                    <div className="flex items-center gap-3 font-semibold text-[15px]">
                      <IoPaperPlaneOutline size={20} /> Send Announcement
                    </div>
                    <IoChevronForwardOutline />
                  </button>
                  <button className="w-full border-2 border-[#EBEBF2] bg-white text-[#4B5563] p-4 rounded-[12px] flex items-center justify-between hover:border-[#3B44B3] hover:text-[#3B44B3] transition-colors">
                    <div className="flex items-center gap-3 font-semibold text-[15px]">
                      <IoCalendarOutline size={20} /> Add Exam
                    </div>
                    <IoChevronForwardOutline />
                  </button>
                </div>
              </div>

              {/* Featured Activity */}
              <div className="bg-gradient-to-br from-[#2D3380] to-[#181B34] rounded-[20px] p-7 shadow-[0_10px_30px_rgba(45,51,128,0.3)] relative overflow-hidden text-white">
                <p className="text-[11px] font-bold tracking-widest text-white/70 uppercase mb-3">FEATURED ACTIVITY</p>
                <h3 className="text-[24px] font-bold leading-tight mb-4">Faculty Orientation<br/>Workshop</h3>
                <div className="flex items-center gap-2 text-white/80 text-[13px] font-medium mb-6">
                  <IoTimeOutline size={16} /> Tomorrow, 09:00 AM
                </div>
                <button className="bg-white text-[#1D214E] px-6 py-2.5 rounded-full text-[13px] font-bold hover:bg-gray-100 transition-colors">
                  Manage Event
                </button>
                {/* Decorative circle */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              </div>

              {/* Support Card */}
              <div className="bg-white rounded-[20px] p-5 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#EBEBF2] flex items-center justify-center text-[#3B44B3]">
                    <IoHeadsetOutline size={20} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#1D214E]">Need help?</h4>
                    <p className="text-[#6B7280] text-[12px] font-medium mt-0.5">Contact campus IT support</p>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-[#3B44B3] text-white flex items-center justify-center hover:bg-[#2D3380] transition-colors shadow-[0_4px_10px_rgba(59,68,179,0.3)]">
                  <IoAdd size={20} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const StatCard = ({ icon, iconBg, iconColor, title, value, badge, badgeColor }) => (
  <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] relative overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-full ${iconBg} ${iconColor} flex items-center justify-center shadow-sm`}>
        {icon}
      </div>
      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${badgeColor}`}>
        {badge}
      </span>
    </div>
    <p className="text-[#6B7280] text-[13px] font-semibold mb-1">{title}</p>
    <h3 className="text-[28px] font-bold text-[#1D214E]">{value}</h3>
  </div>
);

const AnnouncementItem = ({ icon, title, desc, date, status, statusColor }) => (
  <div className="py-5 flex items-start gap-4 hover:bg-[#F9FAFB] transition-colors -mx-7 px-7">
    <div className="w-10 h-10 rounded-[10px] bg-[#F3F4F6] flex items-center justify-center text-[#4B5563] shrink-0 mt-1">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-[15px] font-bold text-[#1D214E] truncate mb-1">{title}</h4>
      <p className="text-[#6B7280] text-[13px] leading-relaxed truncate mb-2">{desc}</p>
      <p className="text-[#9CA3AF] text-[12px] font-medium">{date}</p>
    </div>
    <div className="shrink-0 ml-2">
      <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${statusColor}`}>
        {status}
      </span>
    </div>
  </div>
);
