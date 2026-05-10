import React from 'react';
import SideBar from '../compontents/SideBar';
import { 
  IoAddOutline, 
  IoTrashOutline,
  IoTrash
} from "react-icons/io5";
import { FaChevronDown, FaLightbulb } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";

export default function GpaCalculator() {
  return (
    <div className="flex min-h-screen bg-[#F5F5FA] font-sans text-left" dir="ltr">
      <SideBar />
      <div className="flex-1 p-10 overflow-y-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-10">
          <div className="max-w-[60%]">
            <span className="inline-block bg-[#EBEBFF] text-[#4E58CA] text-[11px] font-bold tracking-widest px-3 py-1.5 rounded-full mb-3 uppercase">
              Academic Tool
            </span>
            <h1 className="text-[36px] font-bold text-[#1D214E] tracking-tight leading-tight mb-2">
              GPA Strategy
            </h1>
            <p className="text-[#7F8A9E] text-[16px] font-medium leading-relaxed">
              Simulate your semester outcomes and plan your path to<br/>academic excellence with precision.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#066F5B] text-white px-6 py-3.5 rounded-full font-bold text-[14px] shadow-[0_8px_20px_rgba(6,111,91,0.25)] hover:bg-[#055b4b] transition-colors mt-2">
            <IoAddOutline size={18} /> Add New Semester
          </button>
        </div>

        {/* Content Grids */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Left Column (Main Tools) */}
          <div className="col-span-8 flex flex-col gap-8">
            
            {/* Semester Subjects */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-bold text-[#1D214E]">Semester Subjects</h2>
                <button className="flex items-center gap-2 text-[#4E58CA] font-bold text-[14px] hover:underline">
                  <IoAddOutline size={18} /> Add Subject
                </button>
              </div>

              <div className="space-y-4">
                {/* Row 1 */}
                <div className="bg-[#F8F7FB] rounded-[20px] p-4 flex items-center gap-4 border border-[#F0EEF5]">
                  <div className="flex-1">
                    <label className="block text-[#1D214E] text-[10px] font-bold tracking-widest mb-1.5 uppercase ml-2">Subject Name</label>
                    <input type="text" defaultValue="Advanced Microeconomics" className="w-full bg-white px-4 py-3.5 rounded-xl text-[#1D214E] font-semibold text-[15px] outline-none shadow-sm" />
                  </div>
                  <div className="w-[100px]">
                    <label className="block text-[#1D214E] text-[10px] font-bold tracking-widest mb-1.5 uppercase ml-2">Credits</label>
                    <input type="number" defaultValue="4" className="w-full bg-white px-4 py-3.5 rounded-xl text-[#1D214E] font-semibold text-[15px] outline-none shadow-sm text-center" />
                  </div>
                  <div className="w-[160px]">
                    <label className="block text-[#1D214E] text-[10px] font-bold tracking-widest mb-1.5 uppercase ml-2">Grade</label>
                    <div className="relative">
                      <select className="w-full bg-white px-4 py-3.5 rounded-xl text-[#1D214E] font-semibold text-[15px] outline-none shadow-sm appearance-none cursor-pointer">
                        <option>A- (3.7)</option>
                        <option>A (4.0)</option>
                        <option>B+ (3.3)</option>
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7F8A9E] text-xs pointer-events-none" />
                    </div>
                  </div>
                  <div className="w-10 h-10 mt-5 rounded-xl bg-[#FFF5F6] flex items-center justify-center text-[#D64F5D] cursor-pointer hover:bg-[#ffe5e8] transition-colors shrink-0">
                    <IoTrash size={18} />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="bg-[#F8F7FB] rounded-[20px] p-4 flex items-center gap-4 border border-[#F0EEF5]">
                  <div className="flex-1">
                    <label className="block text-[#1D214E] text-[10px] font-bold tracking-widest mb-1.5 uppercase ml-2">Subject Name</label>
                    <input type="text" defaultValue="Data Structures & Algorithms" className="w-full bg-white px-4 py-3.5 rounded-xl text-[#1D214E] font-semibold text-[15px] outline-none shadow-sm" />
                  </div>
                  <div className="w-[100px]">
                    <label className="block text-[#1D214E] text-[10px] font-bold tracking-widest mb-1.5 uppercase ml-2">Credits</label>
                    <input type="number" defaultValue="3" className="w-full bg-white px-4 py-3.5 rounded-xl text-[#1D214E] font-semibold text-[15px] outline-none shadow-sm text-center" />
                  </div>
                  <div className="w-[160px]">
                    <label className="block text-[#1D214E] text-[10px] font-bold tracking-widest mb-1.5 uppercase ml-2">Grade</label>
                    <div className="relative">
                      <select className="w-full bg-white px-4 py-3.5 rounded-xl text-[#1D214E] font-semibold text-[15px] outline-none shadow-sm appearance-none cursor-pointer">
                        <option>A (4.0)</option>
                        <option>A- (3.7)</option>
                        <option>B+ (3.3)</option>
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7F8A9E] text-xs pointer-events-none" />
                    </div>
                  </div>
                  <div className="w-10 h-10 mt-5 rounded-xl bg-[#FFF5F6] flex items-center justify-center text-[#D64F5D] cursor-pointer hover:bg-[#ffe5e8] transition-colors shrink-0">
                    <IoTrash size={18} />
                  </div>
                </div>

                {/* Row 3 (Empty State) */}
                <div className="bg-[#FCFBFE] rounded-[20px] p-4 flex items-center gap-4 border border-dashed border-[#D1D5E0]">
                  <div className="flex-1">
                    <label className="block text-[#1D214E] text-[10px] font-bold tracking-widest mb-1.5 uppercase ml-2">Subject Name</label>
                    <input type="text" placeholder="Add subject name..." className="w-full bg-white px-4 py-3.5 rounded-xl text-[#1D214E] font-semibold text-[15px] outline-none shadow-sm placeholder-[#A09DB0]" />
                  </div>
                  <div className="w-[100px]">
                    <label className="block text-[#1D214E] text-[10px] font-bold tracking-widest mb-1.5 uppercase ml-2">Credits</label>
                    <input type="number" placeholder="0" className="w-full bg-white px-4 py-3.5 rounded-xl text-[#1D214E] font-semibold text-[15px] outline-none shadow-sm placeholder-[#A09DB0] text-center" />
                  </div>
                  <div className="w-[160px]">
                    <label className="block text-[#1D214E] text-[10px] font-bold tracking-widest mb-1.5 uppercase ml-2">Grade</label>
                    <div className="relative">
                      <select className="w-full bg-white px-4 py-3.5 rounded-xl text-[#A09DB0] font-semibold text-[15px] outline-none shadow-sm appearance-none cursor-pointer">
                        <option>Select Grade</option>
                        <option>A (4.0)</option>
                        <option>B (3.0)</option>
                      </select>
                      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A09DB0] text-xs pointer-events-none" />
                    </div>
                  </div>
                  <div className="w-10 h-10 mt-5 rounded-xl bg-transparent flex items-center justify-center text-[#A09DB0] shrink-0">
                    <IoTrashOutline size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Target CGPA Planner */}
            <div className="bg-[#F2F1FA] rounded-[24px] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4E58CA] shadow-sm">
                  <FiTarget size={18} />
                </div>
                <h2 className="text-[20px] font-bold text-[#1D214E]">Target CGPA Planner</h2>
              </div>

              <div className="grid grid-cols-2 gap-10">
                {/* Slider Side */}
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-[#1D214E] font-bold text-[14px]">Desired Final CGPA</span>
                    <span className="text-[#4E58CA] font-bold text-[18px]">3.85</span>
                  </div>
                  
                  {/* Custom Slider */}
                  <div className="relative w-full h-2.5 bg-[#E1E0EF] rounded-full mb-3">
                    <div className="absolute left-0 top-0 h-full w-[70%] bg-[#4E58CA] rounded-full"></div>
                    <div className="absolute left-[70%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-[#4E58CA] border-[4px] border-white rounded-full shadow-md cursor-pointer"></div>
                  </div>
                  
                  <div className="flex justify-between text-[#8A94FA] text-[11px] font-bold tracking-widest uppercase">
                    <span>Current: 3.62</span>
                    <span>Target: 3.85</span>
                  </div>
                </div>

                {/* Simulation Result */}
                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-white">
                  <p className="text-[#7F8A9E] text-[10px] font-bold tracking-widest uppercase mb-3 italic">Simulation Result</p>
                  <p className="text-[#1D214E] text-[18px] leading-relaxed font-medium">
                    To reach <strong className="text-[#4E58CA] font-bold">3.85</strong>, you need an average of <strong className="text-[#066F5B] font-bold">3.92</strong> across the next 3 semesters.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Summaries) */}
          <div className="col-span-4 flex flex-col gap-6">
            
            {/* Estimated GPA Card */}
            <div className="bg-[#3A45A0] rounded-[24px] p-8 text-center text-white relative overflow-hidden shadow-[0_10px_30px_rgba(58,69,160,0.2)]">
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                <p className="text-[11px] font-bold tracking-[0.25em] mb-2 opacity-90 uppercase">Estimated GPA</p>
                <h1 className="text-[85px] font-bold leading-none tracking-tighter mb-4 mt-2">3.82</h1>
                <div className="inline-block bg-[#5A66C2] rounded-full px-5 py-2.5 mb-6 text-[13px] font-bold tracking-wide">
                  Distinction Level
                </div>
                <p className="text-[12px] opacity-80 leading-relaxed font-medium px-4">
                  Based on 7 current credits and selected grade projections.
                </p>
              </div>
            </div>

            {/* Performance Shift Card */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[13px] font-bold text-[#1D214E] uppercase tracking-wide w-24 leading-tight">Performance Shift</h3>
                <span className="bg-[#E6F8F0] text-[#00A86B] font-bold text-[13px] px-3 py-1.5 rounded-full tracking-wider">
                  +12.02%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="flex h-3 bg-[#EBE8F4] rounded-full mb-6 overflow-hidden">
                <div className="w-[65%] h-full bg-[#066F5B] rounded-full"></div>
              </div>

              <p className="text-[#64617A] text-[14px] leading-relaxed font-medium mb-6">
                Your projected semester GPA is higher than last semester's 3.41 by <strong className="text-[#1D214E] font-bold">0.41 points</strong>.
              </p>

              <div className="border-t border-[#F0EEF5] pt-5 space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="text-[#7F8A9E] text-[13px] font-medium">Current CGPA</span>
                  <span className="text-[#1D214E] text-[14px] font-bold">3.62</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#7F8A9E] text-[13px] font-medium">Total Credits Earnt</span>
                  <span className="text-[#1D214E] text-[14px] font-bold">84</span>
                </div>
              </div>
            </div>

            {/* Strategy Tip Card */}
            <div className="bg-[#FAF3EA] rounded-[24px] p-6 relative overflow-hidden shadow-sm">
              <div className="flex items-center gap-2.5 mb-4 relative z-10">
                <FaLightbulb className="text-[#9A690B] text-lg" />
                <h3 className="text-[12px] font-bold text-[#9A690B] uppercase tracking-widest">Strategy Tip</h3>
              </div>
              <p className="text-[#1D214E] text-[14px] leading-relaxed font-medium relative z-10">
                Focus on <strong className="font-bold">'Data Structures'</strong> (4 credits). Increasing that grade to A+ would boost your CGPA by an additional <strong className="font-bold">0.03</strong>.
              </p>
              
              {/* Faded Background Icon */}
              <FaLightbulb className="absolute -top-4 -right-2 text-[120px] text-[#9A690B] opacity-5 pointer-events-none" />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
