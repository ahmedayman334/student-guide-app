import React, { useState, useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FiUser, FiHash, FiCalendar, FiBook, FiAtSign, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../context/context";
import { getDepartments, yearLabelToLevel } from "../api";
import axios from "axios";
import { env } from "../environment/environment";

function Register() {
  const { loginUser } = useContext(userContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);

  const isMatch = password === confirmPassword;

  const [register, setRegister] = useState({
    FullName: "",
    username: "",
    email: "",
    year: "",
    departmentId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getDepartments()
      .then(setDepartments)
      .catch((err) => console.warn("Could not load departments:", err.message));
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (
      !register.FullName ||
      !register.username ||
      !register.email ||
      !password ||
      !confirmPassword ||
      !register.year ||
      !register.departmentId
    ) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${ env.baseUrl }/register/`,
        {
          username: register.username.trim(),
          email: register.email.trim(),
          password,
          full_name: register.FullName.trim(),
          department: register.departmentId,
          current_level: yearLabelToLevel(register.year),
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (response.data.user) {
        loginUser(response.data.user);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Register error:", err);
    
      // need modify from backend 
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F7FB] p-4 sm:p-8 font-sans">
      <div className="relative w-full max-w-[650px] mt-10 sm:mt-0">
        <div className="bg-white rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] p-8 sm:p-10 relative z-0">
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaGraduationCap className="text-[#3B44B3] text-[32px]" />
            <span className="text-[#2A2744] text-[22px] font-bold">Student Guide</span>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-[32px] font-extrabold text-[#2A2744] tracking-tight">
              Create an Account
            </h1>
            <p className="text-[#64617A] mt-2.5 text-[16px] font-medium leading-relaxed">
              Join the platform to manage your academic journey
            </p>
          </div>

          {error && (
            <div className="bg-red-500 text-white text-center mb-6 p-3 rounded-2xl text-sm font-medium shadow-md">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    value={register.FullName}
                    onChange={(e) => setRegister({ ...register, FullName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-[#44415B] mb-2.5">
                  Department
                </label>
                <div className="relative">
                  <FiBook className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] text-xl" />
                  <select
                    required
                    className="w-full pl-12 pr-5 py-4 bg-[#EBE8F4] rounded-[20px] outline-none text-[#2A2744] font-medium focus:ring-2 focus:ring-[#6370E8] transition-all appearance-none cursor-pointer"
                    value={register.departmentId}
                    onChange={(e) => setRegister({ ...register, departmentId: e.target.value })}
                  >
                    <option value="">Choose department</option>
                    {departments.map((dep) => (
                      <option key={dep.department_id} value={dep.department_id}>
                        {dep.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-[#44415B] mb-2.5">
                  Username
                </label>
                <div className="relative">
                  <FiHash className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] text-xl" />
                  <input
                    required
                    type="text"
                    placeholder="Choose a username"
                    className="w-full pl-12 pr-5 py-4 bg-[#EBE8F4] rounded-[20px] outline-none text-[#2A2744] font-medium placeholder-[#A09DB0] focus:ring-2 focus:ring-[#6370E8] transition-all"
                    value={register.username}
                    onChange={(e) => setRegister({ ...register, username: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-[#44415B] mb-2.5">
                  Academic Year
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] text-xl" />
                  <select
                    required
                    className="w-full pl-12 pr-5 py-4 bg-[#EBE8F4] rounded-[20px] outline-none text-[#2A2744] font-medium focus:ring-2 focus:ring-[#6370E8] transition-all appearance-none cursor-pointer"
                    value={register.year}
                    onChange={(e) => setRegister({ ...register, year: e.target.value })}
                  >
                    <option value="">Select year</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Fourth Year">Fourth Year</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[14px] font-bold text-[#44415B] mb-2.5">
                  Email
                </label>
                <div className="relative">
                  <FiAtSign className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8D8A9F] text-xl" />
                  <input
                    required
                    type="email"
                    placeholder="name@university.edu"
                    className="w-full pl-12 pr-5 py-4 bg-[#EBE8F4] rounded-[20px] outline-none text-[#2A2744] font-medium placeholder-[#A09DB0] focus:ring-2 focus:ring-[#6370E8] transition-all"
                    value={register.email}
                    onChange={(e) => setRegister({ ...register, email: e.target.value })}
                  />
                </div>
              </div>

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

            {confirmPassword && !isMatch && (
              <div className="bg-red-50 text-red-500 text-sm py-3 px-4 rounded-[15px] font-bold flex items-center gap-2 mt-2">
                Passwords do not match
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-4 bg-[#6370E8] text-white rounded-full font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#525ed4] transition-colors shadow-[0_8px_20px_rgba(99,112,232,0.35)] hover:shadow-[0_8px_20px_rgba(99,112,232,0.5)] disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Complete Registration"}
            </button>

            <p className="text-center text-[15px] font-medium text-[#64617A] mt-8">
              Already have an account?{" "}
              <Link to="/login" className="text-[#3B44B3] font-bold hover:underline">
                Sign in instead
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
