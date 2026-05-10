import React, { useState } from "react";
import { FaGraduationCap, FaGoogle, FaLinkedin, FaInfo } from "react-icons/fa";
import { FiAtSign, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { IoArrowForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!login.email || !login.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://ahmedamara.pythonanywhere.com/api/students/"
      );
      const students = await res.json();

      const student = students.find(
        (s) => s.email === login.email && s.password === login.password
      );

      if (student) {
        localStorage.setItem("token", "fake-token");
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F7FB] p-4 sm:p-8 font-sans">
      <div className="relative w-full max-w-[440px] mt-10 sm:mt-0">
        {/* Badge */}
        <div className="absolute -top-6 -right-2 sm:-right-8 bg-[#2A2744] text-white rounded-[30px] py-2.5 px-5 flex items-center gap-3 shadow-[0_8px_20px_rgba(42,39,68,0.2)] z-10 w-max">
          <div className="bg-[#FFB800] text-[#2A2744] rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
            <FaInfo />
          </div>
          <div className="text-[13px] font-medium leading-[1.3]">
            University portal<br />status: Optimal
          </div>
        </div>

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
              Welcome Back
            </h1>
            <p className="text-[#64617A] mt-2.5 text-[16px] font-medium leading-relaxed">
              Continue your scholarly progress<br />today.
            </p>
          </div>

          {error && (
            <div className="bg-red-500 text-white text-center mb-6 p-3 rounded-2xl text-sm font-medium shadow-md">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[14px] font-bold text-[#44415B] mb-2.5">
                University Email
              </label>
              <div className="relative">
                <FiAtSign className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] text-xl" />
                <input
                  type="email"
                  placeholder="name@university.edu"
                  className="w-full pl-12 pr-5 py-4 bg-[#EBE8F4] rounded-[20px] outline-none text-[#2A2744] font-medium placeholder-[#A09DB0] focus:ring-2 focus:ring-[#6370E8] transition-all"
                  onChange={(e) =>
                    setLogin({ ...login, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-[14px] font-bold text-[#44415B]">
                  Security Code
                </label>
                <span className="text-[#3B44B3] text-[13px] font-bold cursor-pointer hover:underline">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-[#EBE8F4] rounded-[20px] outline-none text-[#2A2744] font-medium placeholder-[#A09DB0] tracking-widest focus:ring-2 focus:ring-[#6370E8] transition-all"
                  onChange={(e) =>
                    setLogin({ ...login, password: e.target.value })
                  }
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

            {/* Remember Me */}
            <div className="flex items-center gap-3 pt-2">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="peer appearance-none w-[22px] h-[22px] bg-[#EBE8F4] border border-[#D1CEE3] rounded-md checked:bg-[#6370E8] checked:border-[#6370E8] cursor-pointer transition-colors"
                  onChange={(e) =>
                    setLogin({ ...login, remember: e.target.checked })
                  }
                />
                <svg
                  className="absolute left-[3px] top-[3px] w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <label htmlFor="remember" className="text-[14px] font-bold text-[#64617A] cursor-pointer select-none">
                Remember this session
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 py-4 bg-[#6370E8] text-white rounded-full font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#525ed4] transition-colors shadow-[0_8px_20px_rgba(99,112,232,0.35)] hover:shadow-[0_8px_20px_rgba(99,112,232,0.5)]"
            >
              Sign In to Dashboard <IoArrowForward size={20} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-[1px] bg-[#E5E3F0]" />
            <span className="text-[#A09DB0] text-[12px] font-bold tracking-widest">
              OR CONNECT WITH
            </span>
            <div className="flex-1 h-[1px] bg-[#E5E3F0]" />
          </div>

          {/* Social */}
          <div className="flex gap-4">
            <button className="flex-1 py-3.5 bg-[#F3F0FA] hover:bg-[#EBE8F4] text-[#2A2744] rounded-[20px] font-bold text-[14px] flex items-center justify-center gap-2.5 transition-colors">
              <FaGoogle className="text-[16px] text-gray-700" /> Google
            </button>
            <button className="flex-1 py-3.5 bg-[#F3F0FA] hover:bg-[#EBE8F4] text-[#2A2744] rounded-[20px] font-bold text-[14px] flex items-center justify-center gap-2.5 transition-colors">
              <FaLinkedin className="text-[16px] text-[#0A66C2]" /> LinkedIn
            </button>
          </div>

          {/* Register */}
          <p className="text-center text-[15px] font-medium text-[#64617A] mt-8">
            New to the guide?{' '}
            <Link to="/register" className="text-[#3B44B3] font-bold hover:underline">
              Create Student Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

