import React, { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
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
    <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6]">
      <div className="w-[420px] bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <FaUserGraduate className="text-indigo-600 text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">
            Continue your scholarly progress today.
          </p>
        </div>
        {error && (
          <div className="bg-red-500 text-white text-center mt-4 p-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-gray-600">University Email</label>
            <div className="relative mt-1">
              <MdOutlineEmail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="name@university.edu"
                className="w-full pl-10 pr-3 py-3 bg-indigo-50 rounded-xl outline-none"
                onChange={(e) =>
                  setLogin({ ...login, email: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-600">
              <label>Security Code</label>
              <span className="text-indigo-600 cursor-pointer">
                Forgot?
              </span>
            </div>
            <div className="relative mt-1">
              <IoMdLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-indigo-50 rounded-xl outline-none"
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              onChange={(e) =>
                setLogin({ ...login, remember: e.target.checked })
              }
            />
            <span>Remember this session</span>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            Sign In to Dashboard →
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <div className="flex-1 h-[1px] bg-gray-300" />
          <span className="text-gray-400 text-sm">OR CONNECT WITH</span>
          <div className="flex-1 h-[1px] bg-gray-300" />
        </div>

        {/* Social */}
        <div className="flex gap-4">
          <button className="flex-1 py-3 bg-gray-100 rounded-xl">
            Google
          </button>
          <button className="flex-1 py-3 bg-gray-100 rounded-xl">
            LinkedIn
          </button>
        </div>

        {/* Register */}
        <p className="text-center text-sm mt-6">
          New to the guide?{' '}
          <Link to="/register" className="text-indigo-600 font-medium">
            Create Student Account
          </Link>
        </p>
      </div>
    </div>
  );
}
