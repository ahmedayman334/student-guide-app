import React from 'react';
import SideBar from './compontents/SideBar';
import { FaStar } from "react-icons/fa";
import { 
  IoCalendarOutline, 
  IoTrendingUp, 
  IoNotificationsOutline, 
  IoBookOutline,
  IoFlaskOutline,
  IoColorPaletteOutline,
  IoAdd,
  IoWarning,
  IoListOutline,
  IoPencil,
  IoCheckmark
} from "react-icons/io5";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F5F5FA] font-sans text-left" dir="ltr">
      <SideBar />
      <div className="flex-1 p-10 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[34px] font-bold text-[#1D214E] tracking-tight">
              Welcome back, <span className="text-[#4E58CA]">Alex</span>
            </h1>
            <p className="text-[#7F8A9E] text-[16px] mt-1 font-medium">
              You have 3 classes today. Stay focused!
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] text-[#1D214E] font-bold text-[14px]">
            <IoCalendarOutline className="text-[#4E58CA] text-lg" /> October 24, 2023
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between">
            <div className="w-1.5 h-12 bg-[#4E58CA] absolute left-0 top-6 rounded-r-full"></div>
            <p className="text-[#7F8A9E] text-[12px] font-bold tracking-widest mb-2 pl-2">CURRENT GPA</p>
            <h2 className="text-[36px] font-bold text-[#1D214E] mb-2 leading-none pl-2">3.82</h2>
            <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#00A86B] pl-2 mt-auto">
              <IoTrendingUp size={16} /> +0.12 this term
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <p className="text-[#7F8A9E] text-[12px] font-bold tracking-widest mb-2">SUBJECTS</p>
            <h2 className="text-[36px] font-bold text-[#1D214E] mb-3 leading-none">6</h2>
            <div className="flex items-center -space-x-2 mt-auto">
              <div className="w-8 h-8 rounded-full bg-[#8A94FA] text-white flex items-center justify-center text-[11px] font-bold border-[2px] border-white relative z-30">M</div>
              <div className="w-8 h-8 rounded-full bg-[#6EE2C8] text-white flex items-center justify-center text-[11px] font-bold border-[2px] border-white relative z-20">P</div>
              <div className="w-8 h-8 rounded-full bg-[#FFBE5C] text-white flex items-center justify-center text-[11px] font-bold border-[2px] border-white relative z-10">C</div>
              <div className="w-8 h-8 rounded-full bg-[#E8E8F2] text-[#7F8A9E] flex items-center justify-center text-[11px] font-bold border-[2px] border-white relative z-0">+3</div>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <p className="text-[#7F8A9E] text-[12px] font-bold tracking-widest mb-2">NEXT LECTURE</p>
            <h2 className="text-[20px] font-bold text-[#1D214E] mb-2 leading-tight mt-1">Adv. Calculus</h2>
            <p className="text-[#4E58CA] text-[14px] font-bold mt-auto">10:30 AM</p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <p className="text-[#7F8A9E] text-[12px] font-bold tracking-widest mb-2">UPCOMING EXAMS</p>
            <h2 className="text-[36px] font-bold text-[#D64F5D] mb-3 leading-none">2</h2>
            <div className="flex items-center gap-1.5 text-[#7F8A9E] text-[13px] font-bold mt-auto">
              <IoNotificationsOutline size={16} /> Next: Friday
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="grid grid-cols-3 gap-8">
          
          {/* Left Col */}
          <div className="col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[22px] font-bold text-[#1D214E]">Today's Schedule</h2>
              <button className="text-[#4E58CA] text-[12px] font-bold tracking-widest hover:underline uppercase">VIEW FULL CALENDAR</button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-[24px] p-5 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden">
                <div className="w-1.5 h-[60%] bg-[#4E58CA] absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"></div>
                <div className="flex items-center gap-5 ml-4">
                  <div className="w-14 h-14 rounded-[16px] bg-[#EEF0FF] flex items-center justify-center text-[#4E58CA]">
                     <IoBookOutline size={24} />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#1D214E]">Advanced Calculus</h3>
                    <p className="text-[#7F8A9E] text-[14px] font-medium mt-1">Room 402 • Prof. Higgins</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[16px] font-bold text-[#1D214E] mb-1.5">10:30 AM</p>
                  <span className="bg-[#4E58CA] text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider inline-block">IN 15M</span>
                </div>
              </div>

              <div className="bg-[#F4F9F8] rounded-[24px] p-5 flex items-center justify-between">
                <div className="flex items-center gap-5 ml-4">
                  <div className="w-14 h-14 rounded-[16px] bg-[#DFF1EB] flex items-center justify-center text-[#2A9D79]">
                     <IoFlaskOutline size={24} />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#1D214E]">Organic Chemistry Lab</h3>
                    <p className="text-[#7F8A9E] text-[14px] font-medium mt-1">Lab B • Dr. Aris</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[16px] font-bold text-[#1D214E] mb-1.5">01:00 PM</p>
                  <span className="text-[#7F8A9E] text-[12px] font-bold tracking-wider inline-block uppercase">2 HOURS</span>
                </div>
              </div>

              <div className="bg-[#FCF5F0] rounded-[24px] p-5 flex items-center justify-between">
                <div className="flex items-center gap-5 ml-4">
                  <div className="w-14 h-14 rounded-[16px] bg-[#F3DEC9] flex items-center justify-center text-[#D68D4F]">
                     <IoColorPaletteOutline size={24} />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-[#1D214E]">Modern Literature</h3>
                    <p className="text-[#7F8A9E] text-[14px] font-medium mt-1">Hall C • Prof. Blake</p>
                  </div>
                </div>
                <div className="text-right pr-2">
                  <p className="text-[16px] font-bold text-[#1D214E]">03:30 PM</p>
                </div>
              </div>
            </div>

            {/* Banner */}
            <div className="bg-[#4E58CA] rounded-[32px] p-10 flex items-center justify-between relative overflow-hidden h-[240px]">
              <div className="relative z-10 max-w-[65%]">
                <h2 className="text-[32px] font-bold text-white mb-3">Boost your GPA!</h2>
                <p className="text-white/80 text-[16px] leading-relaxed mb-6 font-medium pr-4">
                  Join the 'Advanced Study Techniques' workshop this weekend and get ahead of the curve. Limited seats available.
                </p>
                <button className="bg-white text-[#4E58CA] px-8 py-3.5 rounded-xl font-bold text-[15px] shadow-lg hover:bg-gray-50 transition-colors">
                  Register Now
                </button>
              </div>
              <div className="absolute right-[-20px] top-[20px] opacity-90 rotate-12">
                <div className="w-[220px] h-[220px] bg-white/10 rounded-[40px] flex items-center justify-center backdrop-blur-md border border-white/20">
                  <FaStar size={100} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Col */}
          <div className="bg-white rounded-[40px] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.03)] relative flex flex-col h-full">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-[22px] font-bold text-[#1D214E]">Quick Tasks</h2>
              <div className="w-8 h-8 rounded-full bg-[#4E58CA] text-white flex items-center justify-center cursor-pointer hover:bg-[#3c4dba] transition-colors">
                <IoAdd size={20} />
              </div>
            </div>

            <div className="space-y-6 flex-1">
              <TaskItem label="Finish Lab Report" checked={false} />
              <TaskItem label="Buy New Notebooks" checked={true} />
              <TaskItem label="Email Professor Higgins" checked={false} />
              <TaskItem label="Update Portfolio" checked={false} />
            </div>

            {/* Reminder */}
            <div className="bg-[#FFF8E7] rounded-[24px] p-5 flex gap-4 items-center mb-6 mt-6">
              <div className="w-10 h-10 rounded-[12px] bg-[#F4D189] flex items-center justify-center text-[#B07B18] shrink-0">
                <IoWarning size={20} />
              </div>
              <div>
                <p className="text-[#B07B18] text-[11px] font-bold tracking-widest mb-0.5">REMINDER</p>
                <p className="text-[#1D214E] text-[14px] font-bold leading-snug">Library books due tomorrow</p>
              </div>
            </div>

            <button className="w-full py-4 bg-[#F5F5FA] rounded-2xl text-[#1D214E] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#ebebf2] transition-colors">
              <IoListOutline size={18} /> View All Tasks
            </button>

            {/* FAB */}
            <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-[#4E58CA] rounded-full shadow-[0_10px_25px_rgba(78,88,202,0.4)] flex items-center justify-center text-white cursor-pointer hover:bg-[#3c4dba] transition-colors z-20">
              <IoPencil size={24} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const TaskItem = ({ label, checked }) => (
  <label className="flex items-center gap-4 cursor-pointer group">
    <div className={`w-[22px] h-[22px] rounded-md border-[2px] flex items-center justify-center transition-colors shrink-0 ${
      checked ? "bg-[#4E58CA] border-[#4E58CA]" : "border-[#D1D5E0] bg-white group-hover:border-[#4E58CA]"
    }`}>
      {checked && <IoCheckmark className="text-white text-md" />}
    </div>
    <span className={`text-[15px] font-semibold transition-colors ${
      checked ? "text-[#A0A5BA] line-through decoration-[1.5px]" : "text-[#1D214E]"
    }`}>
      {label}
    </span>
  </label>
);

export default Dashboard;