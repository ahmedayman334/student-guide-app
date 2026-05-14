import React, { useState, useEffect } from 'react';
import { 
  IoGridOutline, 
  IoCalendarOutline, 
  IoMegaphoneOutline, 
  IoPeopleOutline, 
  IoSettingsOutline,
  IoAdd,
  IoSchoolOutline,
  IoMedkitOutline,
  IoCashOutline,
  IoRibbonOutline,
  IoTimeOutline,
  IoHeadsetOutline,
  IoChevronForwardOutline,
  IoPaperPlaneOutline,
  IoClipboardOutline,
  IoLogOutOutline
} from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("https://ahmedamara.pythonanywhere.com/api/students/");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

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
          <div className="flex items-center gap-3 cursor-pointer group mb-4">
            <div className="w-10 h-10 rounded-full bg-[#18C4B8] flex items-center justify-center text-white font-bold text-[16px]">
              A
            </div>
            <span className="text-white font-semibold text-[14px] group-hover:text-[#18C4B8] transition-colors">
              Admin Profile
            </span>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-[10px] text-[#F05252] font-semibold hover:bg-[#F05252]/10 transition-colors"
          >
            <IoLogOutOutline size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[260px] flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-[80px] bg-white px-8 flex items-center justify-end sticky top-0 z-10 border-b border-[#EBEBF2]">

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="https://ui-avatars.com/api/?name=Admin+Console&background=EBF4FF&color=3B44B3&bold=true" alt="Admin" className="w-9 h-9 rounded-full" />
              <span className="text-[#1D214E] font-bold text-[14px]">Admin Console</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 flex-1">
          
          {activeMenu === 'Dashboard' && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                <StatCard 
                  icon={<IoPeopleOutline size={24} />} 
                  iconBg="bg-[#3B44B3]" 
                  iconColor="text-white"
                  title="Total Students" 
                  value={loading ? "..." : students.length} 
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
                      <button onClick={() => setActiveMenu('Schedule Manager')} className="w-full bg-gradient-to-r from-[#3B44B3] to-[#06B6D4] text-white p-4 rounded-[12px] flex items-center justify-between shadow-[0_4px_15px_rgba(59,68,179,0.3)] hover:opacity-90 transition-opacity">
                        <div className="flex items-center gap-3 font-semibold text-[15px]">
                          <IoAdd size={20} /> Add Lecture
                        </div>
                        <IoChevronForwardOutline />
                      </button>
                      <button onClick={() => setActiveMenu('Announcements')} className="w-full border-2 border-[#EBEBF2] bg-white text-[#4B5563] p-4 rounded-[12px] flex items-center justify-between hover:border-[#3B44B3] hover:text-[#3B44B3] transition-colors">
                        <div className="flex items-center gap-3 font-semibold text-[15px]">
                          <IoPaperPlaneOutline size={20} /> Send Announcement
                        </div>
                        <IoChevronForwardOutline />
                      </button>
                      <button onClick={() => setActiveMenu('Schedule Manager')} className="w-full border-2 border-[#EBEBF2] bg-white text-[#4B5563] p-4 rounded-[12px] flex items-center justify-between hover:border-[#3B44B3] hover:text-[#3B44B3] transition-colors">
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

                </div>
              </div>
            </>
          )}

          {activeMenu === 'Students' && (
            <div className="bg-white rounded-[20px] p-7 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              <h2 className="text-[20px] font-bold text-[#1D214E] mb-6">All Students</h2>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B44B3]"></div>
                </div>
              ) : students.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#EBEBF2] text-[#8E95C0] text-[13px]">
                        <th className="py-4 px-2 font-semibold">ID</th>
                        <th className="py-4 px-2 font-semibold">Name</th>
                        <th className="py-4 px-2 font-semibold">Email</th>
                        <th className="py-4 px-2 font-semibold">Department</th>
                        <th className="py-4 px-2 font-semibold">CGPA</th>
                      </tr>
                    </thead>
                    <tbody className="text-[14px] text-[#1D214E]">
                      {students.map(student => (
                        <tr key={student.student_id} className="border-b border-[#EBEBF2] hover:bg-[#F9FAFB] transition-colors">
                          <td className="py-4 px-2 font-medium">{student.student_id}</td>
                          <td className="py-4 px-2 font-semibold">{student.full_name}</td>
                          <td className="py-4 px-2 text-[#6B7280]">{student.user?.email || '-'}</td>
                          <td className="py-4 px-2">{student.department?.name || '-'}</td>
                          <td className="py-4 px-2 font-bold text-[#3B44B3]">{student.current_cgpa || '0.00'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-[#6B7280] py-4 text-center">No students found.</p>
              )}
            </div>
          )}

          {activeMenu === 'Schedule Manager' && (
            <div className="bg-white rounded-[20px] p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              <h2 className="text-[22px] font-bold text-[#1D214E] mb-8 border-b border-[#EBEBF2] pb-4">Schedule Manager</h2>
              
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h3 className="text-[16px] font-bold text-[#1D214E] mb-5">Add New Event (Lecture / Exam)</h3>
                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Event added successfully!"); }}>
                    <div>
                      <label className="block text-[13px] font-bold text-[#6B7280] mb-2">Event Title</label>
                      <input type="text" placeholder="e.g. Advanced Calculus Midterm" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#EBEBF2] rounded-[12px] text-[14px] text-[#1D214E] outline-none focus:border-[#3B44B3] focus:ring-1 focus:ring-[#3B44B3] transition-all" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-bold text-[#6B7280] mb-2">Event Type</label>
                        <select className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#EBEBF2] rounded-[12px] text-[14px] text-[#1D214E] outline-none focus:border-[#3B44B3] focus:ring-1 focus:ring-[#3B44B3] transition-all">
                          <option>Lecture</option>
                          <option>Exam</option>
                          <option>Workshop</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-[#6B7280] mb-2">Date</label>
                        <input type="date" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#EBEBF2] rounded-[12px] text-[14px] text-[#1D214E] outline-none focus:border-[#3B44B3] focus:ring-1 focus:ring-[#3B44B3] transition-all" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-bold text-[#6B7280] mb-2">Time</label>
                        <input type="time" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#EBEBF2] rounded-[12px] text-[14px] text-[#1D214E] outline-none focus:border-[#3B44B3] focus:ring-1 focus:ring-[#3B44B3] transition-all" required />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-[#6B7280] mb-2">Room / Hall</label>
                        <input type="text" placeholder="e.g. Hall C" className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#EBEBF2] rounded-[12px] text-[14px] text-[#1D214E] outline-none focus:border-[#3B44B3] focus:ring-1 focus:ring-[#3B44B3] transition-all" />
                      </div>
                    </div>
                    <button type="submit" className="mt-4 bg-[#3B44B3] text-white px-6 py-3 rounded-[12px] font-bold text-[14px] shadow-[0_4px_15px_rgba(59,68,179,0.3)] hover:bg-[#2D3380] transition-colors w-full">
                      Save Event
                    </button>
                  </form>
                </div>
                
                <div>
                  <h3 className="text-[16px] font-bold text-[#1D214E] mb-5">Upload Full Schedule (Excel/CSV)</h3>
                  <div className="border-2 border-dashed border-[#EBEBF2] rounded-[20px] bg-[#F9FAFB] p-10 flex flex-col items-center justify-center text-center hover:bg-[#F3F4F6] transition-colors cursor-pointer">
                    <div className="w-16 h-16 bg-[#EEF0FF] rounded-full flex items-center justify-center text-[#3B44B3] mb-4">
                      <IoCalendarOutline size={30} />
                    </div>
                    <h4 className="text-[15px] font-bold text-[#1D214E] mb-1">Click to upload or drag and drop</h4>
                    <p className="text-[#6B7280] text-[13px]">XLSX, CSV up to 10MB</p>
                    <input type="file" className="hidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                    <button className="mt-6 border border-[#3B44B3] text-[#3B44B3] px-6 py-2 rounded-full font-bold text-[13px] hover:bg-[#3B44B3] hover:text-white transition-colors">
                      Browse Files
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'Announcements' && (
            <div className="bg-white rounded-[20px] p-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
              <h2 className="text-[22px] font-bold text-[#1D214E] mb-8 border-b border-[#EBEBF2] pb-4">Create Announcement</h2>
              
              <div className="max-w-2xl">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Announcement published!"); }}>
                  <div>
                    <label className="block text-[13px] font-bold text-[#6B7280] mb-2">Announcement Title</label>
                    <input type="text" placeholder="Enter a catchy title..." className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#EBEBF2] rounded-[12px] text-[14px] text-[#1D214E] outline-none focus:border-[#3B44B3] focus:ring-1 focus:ring-[#3B44B3] transition-all" required />
                  </div>
                  
                  <div>
                    <label className="block text-[13px] font-bold text-[#6B7280] mb-2">Message Body</label>
                    <textarea rows="5" placeholder="Write the details of the announcement here..." className="w-full px-4 py-3 bg-[#F9FAFB] border border-[#EBEBF2] rounded-[12px] text-[14px] text-[#1D214E] outline-none focus:border-[#3B44B3] focus:ring-1 focus:ring-[#3B44B3] transition-all resize-none" required></textarea>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-[#6B7280] mb-2">Attach Image (Optional)</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center justify-center gap-2 bg-[#EEF0FF] text-[#3B44B3] px-5 py-3 rounded-[12px] font-bold text-[14px] cursor-pointer hover:bg-[#E0E5FF] transition-colors border border-[#D1D9FF]">
                        <IoAdd size={20} />
                        Choose Image
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                      <span className="text-[#6B7280] text-[13px]">JPG, PNG or GIF. Max size 5MB.</span>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="bg-[#3B44B3] text-white px-8 py-3 rounded-[12px] font-bold text-[14px] shadow-[0_4px_15px_rgba(59,68,179,0.3)] hover:bg-[#2D3380] transition-colors flex items-center gap-2">
                      <IoPaperPlaneOutline size={18} /> Publish Now
                    </button>
                    <button type="button" className="bg-[#F3F4F6] text-[#4B5563] px-8 py-3 rounded-[12px] font-bold text-[14px] hover:bg-[#E5E7EB] transition-colors">
                      Save as Draft
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeMenu === 'Settings' && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-[#8E95C0]">
              <IoSettingsOutline size={48} className="mb-4 opacity-50" />
              <h2 className="text-[20px] font-bold text-[#1D214E] mb-2">Settings</h2>
              <p className="font-medium text-[15px]">This module is currently under construction.</p>
            </div>
          )}
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
