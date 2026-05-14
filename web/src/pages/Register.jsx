import React, { useState } from 'react'
import { FaGraduationCap } from "react-icons/fa";
import { FiUser, FiHash, FiCalendar, FiBook, FiAtSign, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../context/context';

function Register() {
  const { loginUser } = useContext(userContext)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const isMatch = password === confirmPassword;
  
  const [register, setRegister] = useState({
    FullName: "",
    id: "",
    email: "",
    year: "",
    Dep: ""
  })
  
  const navigate = useNavigate();

  function handelRegister(e) {
    e.preventDefault();
    if (
      register.FullName &&
      register.id &&
      register.email &&
      password &&
      confirmPassword &&
      register.year &&
      password === confirmPassword
    ) {
      loginUser({
        FullName: register.FullName,
        email: register.email,
        id: register.id,
        year: register.year,
        department: register.Dep
      });
      navigate("/dashboard");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F7FB] p-4 sm:p-8 font-sans">
      <div className="relative w-full max-w-[650px] mt-10 sm:mt-0">
        
        {/* Main Card */}
        <div className="bg-white rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] p-8 sm:p-10 relative z-0">
          
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaGraduationCap className="text-[#3B44B3] text-[32px]" />
            <span className="text-[#2A2744] text-[22px] font-bold">Student Guide</span>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-[32px] font-extrabold text-[#2A2744] tracking-tight">
              Create an Account
            </h1>
            <p className="text-[#64617A] mt-2.5 text-[16px] font-medium leading-relaxed">
              Join the platform to manage your academic journey
            </p>
          </div>

          <form onSubmit={handelRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-[14px] font-bold text-[#44415B] mb-2.5">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] text-xl" />
                  <input
                    required
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-5 py-4 bg-[#EBE8F4] rounded-[20px] outline-none text-[#2A2744] font-medium placeholder-[#A09DB0] focus:ring-2 focus:ring-[#6370E8] transition-all"
                    onChange={(e) => setRegister({ ...register, FullName: e.target.value })}
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-[14px] font-bold text-[#44415B] mb-2.5">
                  Department
                </label>
                <div className="relative">
                  <FiBook className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] text-xl" />
                  <input
                    required
                    type="text"
                    list="departments"
                    placeholder="Choose department"
                    className="w-full pl-12 pr-5 py-4 bg-[#EBE8F4] rounded-[20px] outline-none text-[#2A2744] font-medium placeholder-[#A09DB0] focus:ring-2 focus:ring-[#6370E8] transition-all cursor-pointer"
                    onChange={(e) => setRegister({ ...register, Dep: e.target.value })}
                  />
                  <datalist id="departments">
                    <option value="Computer Science" />
                    <option value="Physics" />
                    <option value="Applied Science" />
                    <option value="Chemistry" />
                    <option value="Statistics" />
                  </datalist>
                </div>
              </div>

              {/* University ID */}
              <div>
                <label className="block text-[14px] font-bold text-[#44415B] mb-2.5">
                  University ID
                </label>
                <div className="relative">
                  <FiHash className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] text-xl" />
                  <input
                    required
                    type="text"
                    placeholder="Enter your ID"
                    className="w-full pl-12 pr-5 py-4 bg-[#EBE8F4] rounded-[20px] outline-none text-[#2A2744] font-medium placeholder-[#A09DB0] focus:ring-2 focus:ring-[#6370E8] transition-all"
                    onChange={(e) => setRegister({ ...register, id: e.target.value })}
                  />
                </div>
              </div>

              {/* Academic Year */}
              <div>
                <label className="block text-[14px] font-bold text-[#44415B] mb-2.5">
                  Academic Year
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] text-xl" />
                  <input
                    required
                    type="text"
                    list="Year"
                    placeholder="Enter academic year"
                    className="w-full pl-12 pr-5 py-4 bg-[#EBE8F4] rounded-[20px] outline-none text-[#2A2744] font-medium placeholder-[#A09DB0] focus:ring-2 focus:ring-[#6370E8] transition-all cursor-pointer"
                    onChange={(e) => setRegister({ ...register, year: e.target.value })}
                  />
                  <datalist id="Year">
                    <option value="First Year" />
                    <option value="Second Year" />
                    <option value="Third Year" />
                    <option value="Fourth Year" />
                  </datalist>
                </div>
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-[14px] font-bold text-[#44415B] mb-2.5">
                  University Email
                </label>
                <div className="relative">
                  <FiAtSign className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] text-xl" />
                  <input
                    required
                    type="email"
                    placeholder="name@university.edu"
                    className="w-full pl-12 pr-5 py-4 bg-[#EBE8F4] rounded-[20px] outline-none text-[#2A2744] font-medium placeholder-[#A09DB0] focus:ring-2 focus:ring-[#6370E8] transition-all"
                    onChange={(e) => setRegister({ ...register, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[14px] font-bold text-[#44415B] mb-2.5">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] text-xl" />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 bg-[#EBE8F4] rounded-[20px] outline-none text-[#2A2744] font-medium placeholder-[#A09DB0] tracking-widest focus:ring-2 focus:ring-[#6370E8] transition-all"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] hover:text-[#44415B] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[14px] font-bold text-[#44415B] mb-2.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] text-xl" />
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-4 bg-[#EBE8F4] rounded-[20px] outline-none text-[#2A2744] font-medium placeholder-[#A09DB0] tracking-widest transition-all ${
                      confirmPassword && !isMatch 
                        ? "border-2 border-red-500 focus:ring-red-500" 
                        : "focus:ring-2 focus:ring-[#6370E8]"
                    }`}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] hover:text-[#44415B] transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {confirmPassword && !isMatch && (
              <div className="bg-red-50 text-red-500 text-sm py-3 px-4 rounded-[15px] font-bold flex items-center gap-2 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Passwords do not match
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-8 py-4 bg-[#6370E8] text-white rounded-full font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#525ed4] transition-colors shadow-[0_8px_20px_rgba(99,112,232,0.35)] hover:shadow-[0_8px_20px_rgba(99,112,232,0.5)]"
            >
              Complete Registration
            </button>

            {/* Login Link */}
            <p className="text-center text-[15px] font-medium text-[#64617A] mt-8">
              Already have an account?{' '}
              <Link to="/login" className="text-[#3B44B3] font-bold hover:underline">
                Sign in instead
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register