import React, { useContext } from 'react';
import SideBar from '../compontents/SideBar';
import { userContext } from '../context/context';
import { 
  IoAddOutline, 
  IoTrashOutline,
  IoTrash
} from "react-icons/io5";
import { FaChevronDown, FaLightbulb } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";

const GRADE_POINTS = {
  "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "C+": 2.7, "C": 2.4, "D": 2.0, "F": 0.0
};

export default function GpaCalculator() {
  const { userData, addSubject, updateSubject, deleteSubject, updateTargetGpa } = useContext(userContext);

  const subjects = userData?.subjects || [];
  const currentGpa = userData?.gpa || 3.62;
  const totalCredits = userData?.credits || 84;
  const targetGpa = userData?.targetGpa || 3.85;

  const handleAddSubject = () => {
    addSubject({ name: "", credits: 3, grade: "A", points: 4.0 });
  };

  const handleUpdate = (id, field, value) => {
    const subject = subjects.find(s => s.id === id);
    if (!subject) return;
    
    let updated = { ...subject, [field]: value };
    
    if (field === "grade" && GRADE_POINTS[value] !== undefined) {
        updated.points = GRADE_POINTS[value];
    } else if (field === "grade") {
        updated.points = 0;
    }
    
    updateSubject(id, updated);
  };

  // Math Logic
  const semCredits = subjects.reduce((acc, sub) => acc + (Number(sub.credits) || 0), 0);
  const semPoints = subjects.reduce((acc, sub) => acc + ((Number(sub.credits) || 0) * (sub.points || 0)), 0);
  const estimatedGpa = semCredits > 0 ? (semPoints / semCredits).toFixed(2) : "0.00";

  const shift = estimatedGpa > 0 ? (estimatedGpa - currentGpa).toFixed(2) : "0.00";
  const shiftPercentage = currentGpa > 0 ? ((shift / currentGpa) * 100).toFixed(2) : "0.00";
  const shiftIsPositive = Number(shift) >= 0;

  // Target Simulation (Assuming 3 semesters left at 15 credits each = 45 credits)
  const futureCredits = 45;
  const currentTotalPoints = totalCredits * currentGpa;
  const requiredPoints = (targetGpa * (totalCredits + futureCredits)) - currentTotalPoints;
  const requiredAverage = (requiredPoints / futureCredits).toFixed(2);

  // Custom Slider Logic
  const minGpa = 2.0;
  const maxGpa = 4.0;
  const sliderPercentage = Math.max(0, Math.min(100, ((targetGpa - minGpa) / (maxGpa - minGpa)) * 100));

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
          <button onClick={handleAddSubject} className="flex items-center gap-2 bg-[#066F5B] text-white px-6 py-3.5 rounded-full font-bold text-[14px] shadow-[0_8px_20px_rgba(6,111,91,0.25)] hover:bg-[#055b4b] transition-colors mt-2">
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
                <button onClick={handleAddSubject} className="flex items-center gap-2 text-[#4E58CA] font-bold text-[14px] hover:underline cursor-pointer">
                  <IoAddOutline size={18} /> Add Subject
                </button>
              </div>

              <div className="space-y-4">
                {subjects.map((sub) => (
                  <div key={sub.id} className="bg-[#F8F7FB] rounded-[20px] p-4 flex items-center gap-4 border border-[#F0EEF5]">
                    <div className="flex-1">
                      <label className="block text-[#1D214E] text-[10px] font-bold tracking-widest mb-1.5 uppercase ml-2">Subject Name</label>
                      <input 
                        type="text" 
                        value={sub.name} 
                        onChange={e => handleUpdate(sub.id, "name", e.target.value)}
                        placeholder="Add subject name..."
                        className="w-full bg-white px-4 py-3.5 rounded-xl text-[#1D214E] font-semibold text-[15px] outline-none shadow-sm" 
                      />
                    </div>
                    <div className="w-[100px]">
                      <label className="block text-[#1D214E] text-[10px] font-bold tracking-widest mb-1.5 uppercase ml-2">Credits</label>
                      <input 
                        type="number" 
                        value={sub.credits} 
                        onChange={e => handleUpdate(sub.id, "credits", Number(e.target.value))}
                        className="w-full bg-white px-4 py-3.5 rounded-xl text-[#1D214E] font-semibold text-[15px] outline-none shadow-sm text-center" 
                      />
                    </div>
                    <div className="w-[160px]">
                      <label className="block text-[#1D214E] text-[10px] font-bold tracking-widest mb-1.5 uppercase ml-2">Grade</label>
                      <div className="relative">
                        <select 
                          value={sub.grade} 
                          onChange={e => handleUpdate(sub.id, "grade", e.target.value)}
                          className="w-full bg-white px-4 py-3.5 rounded-xl text-[#1D214E] font-semibold text-[15px] outline-none shadow-sm appearance-none cursor-pointer"
                        >
                          <option value="Select Grade">Select Grade</option>
                          {Object.keys(GRADE_POINTS).map(g => (
                            <option key={g} value={g}>{g} ({GRADE_POINTS[g].toFixed(1)})</option>
                          ))}
                        </select>
                        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7F8A9E] text-xs pointer-events-none" />
                      </div>
                    </div>
                    <div 
                      onClick={() => deleteSubject(sub.id)}
                      className="w-10 h-10 mt-5 rounded-xl bg-[#FFF5F6] flex items-center justify-center text-[#D64F5D] cursor-pointer hover:bg-[#ffe5e8] transition-colors shrink-0"
                    >
                      <IoTrash size={18} />
                    </div>
                  </div>
                ))}
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
                    <span className="text-[#4E58CA] font-bold text-[18px]">{targetGpa.toFixed(2)}</span>
                  </div>
                  
                  {/* Custom Slider replacing native range input for visual accuracy */}
                  <div className="relative w-full h-2.5 bg-[#E1E0EF] rounded-full mb-3 flex items-center">
                    <div className="absolute left-0 top-0 h-full bg-[#4E58CA] rounded-full pointer-events-none" style={{width: `${sliderPercentage}%`}}></div>
                    <input 
                      type="range" 
                      min={minGpa} max={maxGpa} step="0.01" 
                      value={targetGpa} 
                      onChange={e => updateTargetGpa(Number(e.target.value))}
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-[#4E58CA] border-[4px] border-white rounded-full shadow-md pointer-events-none" style={{left: `calc(${sliderPercentage}% - 12px)`}}></div>
                  </div>
                  
                  <div className="flex justify-between text-[#8A94FA] text-[11px] font-bold tracking-widest uppercase">
                    <span>Current: {currentGpa.toFixed(2)}</span>
                    <span>Max: 4.00</span>
                  </div>
                </div>

                {/* Simulation Result */}
                <div className="bg-white rounded-[20px] p-6 shadow-sm border border-white">
                  <p className="text-[#7F8A9E] text-[10px] font-bold tracking-widest uppercase mb-3 italic">Simulation Result</p>
                  <p className="text-[#1D214E] text-[18px] leading-relaxed font-medium">
                    To reach <strong className="text-[#4E58CA] font-bold">{targetGpa.toFixed(2)}</strong>, you need an average of <strong className="text-[#066F5B] font-bold">{requiredAverage}</strong> across the next 3 semesters.
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
                <h1 className="text-[85px] font-bold leading-none tracking-tighter mb-4 mt-2">{estimatedGpa}</h1>
                <div className="inline-block bg-[#5A66C2] rounded-full px-5 py-2.5 mb-6 text-[13px] font-bold tracking-wide">
                  {estimatedGpa >= 3.8 ? "Distinction Level" : estimatedGpa >= 3.5 ? "Excellent Level" : estimatedGpa >= 3.0 ? "Very Good Level" : "Good Level"}
                </div>
                <p className="text-[12px] opacity-80 leading-relaxed font-medium px-4">
                  Based on {semCredits} current credits and selected grade projections.
                </p>
              </div>
            </div>

            {/* Performance Shift Card */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[13px] font-bold text-[#1D214E] uppercase tracking-wide w-24 leading-tight">Performance Shift</h3>
                <span className={`font-bold text-[13px] px-3 py-1.5 rounded-full tracking-wider ${shiftIsPositive ? 'bg-[#E6F8F0] text-[#00A86B]' : 'bg-[#FFF5F6] text-[#D64F5D]'}`}>
                  {shiftIsPositive ? "+" : ""}{shiftPercentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="flex h-3 bg-[#EBE8F4] rounded-full mb-6 overflow-hidden relative">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${shiftIsPositive ? 'bg-[#066F5B]' : 'bg-[#D64F5D]'}`} 
                  style={{width: `${Math.min(100, Math.abs(shiftPercentage) * 5)}%`}}
                ></div>
              </div>

              <p className="text-[#64617A] text-[14px] leading-relaxed font-medium mb-6">
                Your projected semester GPA is {shiftIsPositive ? 'higher' : 'lower'} than last semester's {currentGpa.toFixed(2)} by <strong className="text-[#1D214E] font-bold">{Math.abs(shift)} points</strong>.
              </p>

              <div className="border-t border-[#F0EEF5] pt-5 space-y-3.5">
                <div className="flex justify-between items-center">
                  <span className="text-[#7F8A9E] text-[13px] font-medium">Current CGPA</span>
                  <span className="text-[#1D214E] text-[14px] font-bold">{currentGpa.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#7F8A9E] text-[13px] font-medium">Total Credits Earnt</span>
                  <span className="text-[#1D214E] text-[14px] font-bold">{totalCredits}</span>
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
                {subjects.length > 0 ? (
                  <>Focus on <strong className="font-bold">'{subjects[0].name || 'Subject'}'</strong> ({subjects[0].credits || 0} credits). Increasing that grade to A+ would boost your CGPA by an additional <strong className="font-bold">0.03</strong>.</>
                ) : (
                  <>Add some subjects to get strategy tips on how to improve your GPA.</>
                )}
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
