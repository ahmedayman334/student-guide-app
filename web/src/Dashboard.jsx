import React, { useContext, useState } from 'react';
import { userContext } from './context/context';
import SideBar from './compontents/SideBar';
import NotificationBell from './compontents/NotificationBell';
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
  IoCheckmark,
  IoTrash
} from "react-icons/io5";

function Dashboard() {
  const { userData, schedules } = useContext(userContext);
  const firstName = userData?.name ? userData.name.split(' ')[0] : "Alex";
  const currentGpa = userData?.gpa || "3.62";
  const subjectsCount = userData?.subjects?.length || 6;

  // Interactive Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, label: "Finish Lab Report", checked: false },
    { id: 2, label: "Buy New Notebooks", checked: true },
    { id: 3, label: "Email Professor Higgins", checked: false },
    { id: 4, label: "Update Portfolio", checked: false },
  ]);

  const [newTaskLabel, setNewTaskLabel] = useState("");

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskLabel.trim()) {
      setTasks([...tasks, { id: Date.now(), label: newTaskLabel.trim(), checked: false }]);
      setNewTaskLabel("");
    }
  };

  const getLocalDate = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const formatTime12h = (time24) => {
    if (!time24) return "--:--";
    if (time24.includes("AM") || time24.includes("PM")) return time24; // Already formatted
    let [hours, minutes] = time24.split(':');
    hours = parseInt(hours);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    return `${hours}:${minutes} ${ampm}`;
  };

  const today = getLocalDate();
  const todaysSchedules = schedules?.filter(s => s.date === today) || [];
  
  // If no schedules for today, get upcoming ones
  const upcomingSchedules = !todaysSchedules.length 
    ? (schedules?.filter(s => s.date > today) || []).slice(0, 3)
    : [];

  const [showAll, setShowAll] = useState(false);
  const displaySchedules = showAll ? schedules : (todaysSchedules.length > 0 ? todaysSchedules : upcomingSchedules);
  const nextLecture = displaySchedules.length > 0 ? displaySchedules[0] : null;

  return (
    <div className="flex min-h-screen bg-[#F5F5FA] font-sans text-left" dir="ltr">
      <SideBar />
      <div className="flex-1 p-10 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[34px] font-bold text-[#1D214E] tracking-tight">
              Welcome back, <span className="text-[#4E58CA]">{firstName}</span>
            </h1>
            <p className="text-[#7F8A9E] text-[16px] mt-1 font-medium">
              {todaysSchedules.length > 0 
                ? `You have ${todaysSchedules.length} classes today. Stay focused!` 
                : upcomingSchedules.length > 0 
                  ? `No classes today, but you have ${upcomingSchedules.length} upcoming soon.`
                  : "No classes scheduled. Enjoy your free time!"}
            </p>
          </div>
          <div className="text-[#7F8A9E] mt-2 pr-2">
            <NotificationBell size={24} />
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] relative overflow-hidden flex flex-col justify-between">
            <div className="w-1.5 h-12 bg-[#4E58CA] absolute left-0 top-6 rounded-r-full"></div>
            <p className="text-[#7F8A9E] text-[12px] font-bold tracking-widest mb-2 pl-2">CURRENT GPA</p>
            <h2 className="text-[36px] font-bold text-[#1D214E] mb-2 leading-none pl-2">{currentGpa}</h2>
            <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#00A86B] pl-2 mt-auto">
              <IoTrendingUp size={16} /> +0.12 this term
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <p className="text-[#7F8A9E] text-[12px] font-bold tracking-widest mb-2">SUBJECTS</p>
            <h2 className="text-[36px] font-bold text-[#1D214E] mb-3 leading-none">{userData?.subjects?.length || 0}</h2>
            {userData?.subjects?.length > 0 ? (
              <div className="flex items-center -space-x-2 mt-auto">
                {userData.subjects.slice(0, 3).map((sub, idx) => {
                  const colors = ["bg-[#8A94FA]", "bg-[#6EE2C8]", "bg-[#FFBE5C]"];
                  return (
                    <div key={idx} className={`w-8 h-8 rounded-full ${colors[idx % colors.length]} text-white flex items-center justify-center text-[11px] font-bold border-[2px] border-white relative`} style={{ zIndex: 30 - idx }}>
                      {sub.name ? sub.name.charAt(0).toUpperCase() : 'S'}
                    </div>
                  );
                })}
                {userData.subjects.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-[#E8E8F2] text-[#7F8A9E] flex items-center justify-center text-[11px] font-bold border-[2px] border-white relative z-0">
                    +{userData.subjects.length - 3}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-[12px] text-[#7F8A9E] font-medium mt-auto">No subjects added.</div>
            )}
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <p className="text-[#7F8A9E] text-[12px] font-bold tracking-widest mb-2">NEXT LECTURE</p>
            <h2 className="text-[20px] font-bold text-[#1D214E] mb-2 leading-tight mt-1">{nextLecture ? nextLecture.title : "No more classes"}</h2>
            <p className="text-[#4E58CA] text-[14px] font-bold mt-auto">{nextLecture ? formatTime12h(nextLecture.time) : "--:--"}</p>
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
              <div className="flex flex-col">
                <h2 className="text-[22px] font-bold text-[#1D214E]">
                  {showAll ? "All Schedules" : todaysSchedules.length > 0 ? "Today's Schedule" : "Upcoming Schedule"}
                </h2>
                {schedules?.length > 0 && (
                   <button 
                    onClick={() => setShowAll(!showAll)} 
                    className="text-[#4E58CA] text-[12px] font-bold mt-1 hover:underline text-left"
                   >
                    {showAll ? "← Show Today Only" : `Show All (${schedules.length}) →`}
                   </button>
                )}
              </div>
              <button className="text-[#4E58CA] text-[12px] font-bold tracking-widest hover:underline uppercase">VIEW FULL CALENDAR</button>
            </div>

            <div className="space-y-4 mb-8">
              {displaySchedules.length > 0 ? (
                displaySchedules.map((item, index) => (
                  <div key={item.id} className={`${item.bgColor || "bg-white"} rounded-[24px] p-5 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden`}>
                    {index === 0 && <div className="w-1.5 h-[60%] bg-[#4E58CA] absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"></div>}
                    <div className="flex items-center gap-5 ml-4">
                      <div className={`w-14 h-14 rounded-[16px] ${item.bgColor ? "bg-black/5" : "bg-[#EEF0FF]"} flex items-center justify-center ${item.textColor || "text-[#4E58CA]"}`}>
                         {item.iconType === 'flask' ? <IoFlaskOutline size={24} /> : item.iconType === 'palette' ? <IoColorPaletteOutline size={24} /> : <IoBookOutline size={24} />}
                      </div>
                      <div>
                        <h3 className="text-[17px] font-bold text-[#1D214E]">{item.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-[#7F8A9E] text-[13px] font-medium">{item.room}</p>
                          <div className="flex items-center gap-1 bg-[#EEF0FF] px-2 py-0.5 rounded-md">
                            <IoCalendarOutline size={12} className="text-[#4E58CA]" />
                            <span className="text-[#4E58CA] text-[11px] font-bold">{item.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[16px] font-bold text-[#1D214E] mb-1.5">{formatTime12h(item.time)}</p>
                      {index === 0 && (
                        <span className="bg-[#4E58CA] text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider inline-block uppercase">
                          {todaysSchedules.length > 0 ? "NEXT UP" : "UPCOMING"}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-[24px] p-10 text-center border-2 border-dashed border-[#EBEBF2]">
                  <p className="text-[#7F8A9E] font-bold">No lectures scheduled for today.</p>
                </div>
              )}
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
            </div>

            <div className="space-y-6 flex-1 overflow-y-auto">
              {tasks.map(task => (
                <TaskItem key={task.id} label={task.label} checked={task.checked} onToggle={() => toggleTask(task.id)} onDelete={() => deleteTask(task.id)} />
              ))}
              <form onSubmit={handleAddTask} className="flex items-center gap-3 mt-4">
                <input 
                  type="text" 
                  value={newTaskLabel} 
                  onChange={(e) => setNewTaskLabel(e.target.value)} 
                  placeholder="Add a new task..."
                  className="flex-1 bg-[#F5F5FA] rounded-xl px-4 py-3 text-[14px] font-semibold text-[#1D214E] outline-none border border-transparent focus:border-[#4E58CA]"
                />
                <button type="submit" className="w-12 h-12 rounded-xl bg-[#4E58CA] text-white flex items-center justify-center shrink-0 hover:bg-[#3c4dba] transition-colors cursor-pointer">
                  <IoAdd size={24} />
                </button>
              </form>
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
          </div>

        </div>

        {/* Debug: All Schedules (Hidden in production or subtle) */}
        {schedules?.length > 0 && todaysSchedules.length === 0 && upcomingSchedules.length === 0 && (
          <div className="mt-10 p-6 bg-white rounded-[24px] border border-[#EBEBF2]">
            <h3 className="text-[#1D214E] font-bold mb-4">Note: You have {schedules.length} schedules in the system, but none for today or the future.</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {schedules.map(s => (
                <div key={s.id} className="min-w-[200px] p-4 bg-[#F5F5FA] rounded-xl text-[12px]">
                  <p className="font-bold">{s.title}</p>
                  <p>{s.date} at {s.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const TaskItem = ({ label, checked, onToggle, onDelete }) => (
  <div className="flex justify-between items-center group">
    <label className="flex items-center gap-4 cursor-pointer flex-1" onClick={onToggle}>
      <div className={`w-[22px] h-[22px] rounded-md border-[2px] flex items-center justify-center transition-colors shrink-0 ${
        checked ? "bg-[#4E58CA] border-[#4E58CA]" : "border-[#D1D5E0] bg-white group-hover:border-[#4E58CA]"
      }`}>
        {checked && <IoCheckmark className="text-white text-md" />}
      </div>
      <span className={`text-[15px] font-semibold transition-colors truncate max-w-[200px] ${
        checked ? "text-[#A0A5BA] line-through decoration-[1.5px]" : "text-[#1D214E]"
      }`}>
        {label}
      </span>
    </label>
    <div 
      onClick={(e) => { e.stopPropagation(); onDelete(); }} 
      className="text-[#D1D5E0] hover:text-[#D64F5D] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-[#FFF5F6]"
    >
      <IoTrash size={16} />
    </div>
  </div>
);

export default Dashboard;