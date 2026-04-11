import React, { useContext, useState } from 'react';
import SideBar from './compontents/SideBar';
import { IoNotificationsOutline, IoTimeSharp } from "react-icons/io5";
import { SlBadge } from "react-icons/sl";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { userContext } from './context/context';
function Dashboard() {
  const [openMenu, SetopenMenu] = useState(false);
  const {username}=useContext(userContext)
  return (
    <div className="dashboard flex min-h-screen bg-gray-50">
      <SideBar openMenu={openMenu} SetopenMenu={SetopenMenu} />
    <div
        className={`content flex-1 flex flex-col min-w-0 ${
          openMenu ? "max-md:hidden" : ""
        }`}
        dir="rtl"
      >
        <div className="header flex items-center justify-between px-6 h-[70px] bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className='w-[40px] h-[40px] bg-blue-950 rounded-full text-white flex items-center justify-center font-bold'>M</div>
            <div className='border-l pl-4'>
              <p className='font-semibold'>{username}</p>
              <span className='text-sm text-gray-500'>Computer Science</span>
            </div>
            <div className='relative mr-2'>
              <IoNotificationsOutline className='text-2xl cursor-pointer' />
              <span className='absolute top-0 left-0 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white'></span>
            </div>
          </div>
        </div>
        <div className="p-6 lg:p-10 overflow-y-auto">
          <div className="mb-10 text-left">
            <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>👋! Welcome back, {username}</h2>
            <p className='text-gray-500 mt-2'>Here's what's happening with your academic schedule today</p>
          </div>
          <div className={`grid gap-6 transition-all duration-500 mb-10 ${
            openMenu
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`} dir="ltr">
            <StatCard icon={<SlBadge className='text-green-600'/>} title="Current GPA" value="3.8" subValue="+0.1" subText="Cumulative" color="green" />
            <StatCard icon={<FaBookOpen className='text-blue-600'/>} title="Subjects" value="6" subValue="18" subText="Hrs This Semester" color="blue" />
            <StatCard icon={<IoTimeSharp className='text-orange-500'/>} title="Next Lecture" value="10:00 AM" subValue="Mathematics" subText="(Hall B)" color="orange" />
            <StatCard icon={<MdOutlineDateRange className='text-red-500'/>} title="Upcoming Exams" value="2" subValue="+0.1" subText="OS in 7d" color="red" />
          </div>
          <div className="flex flex-col lg:flex-row gap-8" dir="ltr">
            <div className={`flex-1 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className='font-bold text-xl'>Today's Schedule</h2>
                <button className='text-blue-600 font-semibold hover:underline cursor-pointer'>View All</button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex gap-4 items-center border border-gray-100 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="text-sm">
                      <span className='block font-bold text-gray-700'>10:00 AM</span>
                      <span className='text-gray-400'>12:00 PM</span>
                    </div>
                    <div className='w-1.5 h-12 bg-indigo-600 rounded-full'></div>
                    <div>
                      <span className='block font-bold text-gray-800'>Mathematics</span>
                      <span className='text-sm text-gray-500'>Lecture . Hall B</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-[350px] space-y-6">
              <div className="p-6 bg-indigo-600 text-white rounded-2xl relative overflow-hidden">
                <div className='absolute bg-indigo-500 -top-10 -right-10 rounded-full w-32 h-32 opacity-50'></div>
                <div className="relative z-10">
                  <h3 className='font-bold text-lg mb-2'>Need help calculating GPA?</h3>
                  <p className='text-sm text-indigo-100 mb-4'>Try our smart calculator to estimate what grades you need.</p>
                  <button className='w-full py-2.5 bg-white text-indigo-600 rounded-lg font-bold hover:bg-indigo-50 transition-colors'>Calculate Now</button>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className='text-xl font-bold mb-4'>To-Do Next</h2>
                <div className="space-y-3">
                  <TodoItem label="Submit OS Assignment 2" checked={false} />
                  <TodoItem label="Register for next Semester" checked={false} />
                  <TodoItem label="Meeting with Advisor" checked={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const StatCard = ({ icon, title, value, subValue, subText, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-[180px] ">
    <div className="flex justify-between items-start">
      <div>
        <p className='text-gray-400 text-sm font-bold uppercase tracking-wider'>{title}</p>
        <h3 className='text-3xl font-bold mt-2'>{value}</h3>
      </div>
      <div className="text-2xl p-2 bg-gray-50 rounded-lg">{icon}</div>
    </div>
    <div className='mt-4 text-sm'>
      <span className={`text-${color}-500 font-bold`}>{subValue} </span>
      <span className='text-gray-500'>{subText}</span>
    </div>
  </div>
);

const TodoItem = ({ label, checked }) => (
  <label className='flex items-center gap-3 cursor-pointer group'>
    <input type="checkbox" defaultChecked={checked} className='w-5 h-5 accent-indigo-600 rounded' />
    <span className={`text-gray-700 group-hover:text-indigo-600 transition-colors ${checked ? 'line-through text-gray-400' : ''}`}>
      {label}
    </span>
  </label>
);

export default Dashboard;