import React, { useState } from 'react'
import { FaUserPlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { useContext } from 'react';
import { userContext } from '../context/context';




function Register() {
  const { loginUser } = useContext(userContext)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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
      register.year&&
      password ===confirmPassword
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
    <div className='h-screen flex justify-center items-center bg-[#eee]'>
      <div className="w-fit h-fit p-10 border border-[#ddd] rounded-[12px] shadow-sm bg-white">
        <div className="m-auto w-15 h-15 flex items-center justify-center bg-[#d0fae5] rounded-full">
          <FaUserPlus className="text-3xl text-[#009966]" />
        </div>
        <div className='m-auto'>
          <h1 className='text-4xl font-bold text-center mt-5'>
            Create an Account
          </h1>
          <p className='text-center mt-5'>
            Join the Student Guide platform to manage your academic journey
          </p>
        </div>
        <form onSubmit={handelRegister}>
          <div className="row-1 flex gap-5 ">
            <div className='mt-10 relative'>
              <label className='block font-bold'>Full Name</label>
              <input
                required
                type="text"
                placeholder='Enter your full name'
                className='border border-[#eee] rounded-[6px] px-10 py-3'
                onChange={(e) => { setRegister({ ...register, FullName: e.target.value }) }}
              />
              <FaUser className='absolute top-[55%] left-2 text-[18px]' />
            </div>
            <div className='mt-10 relative'>
              <label className='block font-bold'>Department</label>
              <input
                required
                type="text"
                list="departments"
                placeholder="Choose department"
                className='border border-[#eee] rounded-[6px] px-10 py-3 cursor-pointer'
                onChange={(e) => { setRegister({ ...register, Dep: e.target.value }) }}
              />
              <datalist id="departments">
                <option value="Computer Science" />
                <option value="Physics" />
                <option value="Applied Science" />
                <option value="Chemistry" />
                <option value="Statistics" />
              </datalist>
              <FaBookBookmark className='absolute top-[55%] left-2 text-[18px]' />
            </div>
          </div>
          <div className="row-2 flex gap-5 -mt-5">
            <div className='mt-10 relative'>
              <label className='block font-bold'>University ID</label>
              <input
                required
                type="text"
                placeholder='Enter your ID'
                className='border border-[#eee] rounded-[6px] px-10 py-3'
                onChange={(e) => { setRegister({ ...register, id: e.target.value }) }}
              />
              <FaHashtag className='absolute top-[55%] left-2 text-[18px]' />
            </div>
            <div className='mt-10 relative'>
              <label className='block font-bold'>Academic Year</label>
              <input
                required
                type="text"
                list='Year'
                placeholder='Enter academic year'
                className='border border-[#eee] rounded-[6px] px-10 py-3 cursor-pointer'
                onChange={(e) => { setRegister({ ...register, year: e.target.value }) }}
              />
                <datalist id="Year">
                  <option value="First Year"></option>
                  <option value="Second Year"></option>
                  <option value="Third Year"></option>
                  <option value="Fourth Year"></option>
                </datalist>
              <FaCalendar className='absolute top-[55%] left-2 text-[18px]' />
            </div>
          </div>
          <div className="row-3 flex gap-5 -mt-5">
            <div className='mt-10 relative'>
              <label className='block font-bold'>Email</label>
              <input
                required
                type="email"
                placeholder='Enter your email'
                className='border border-[#eee] rounded-[6px] px-10 py-3'
                onChange={(e) => setRegister({ ...register, email: e.target.value })}
              />
              <MdEmail className='absolute top-[55%] left-2 text-[18px]' />
            </div>
            <div className="password-container flex  items-center mt-10  gap-1 ">
              <div className='w-25 relative'>
                <label htmlFor="" className='block font-bold'>password</label>
                <input required type="password" placeholder='••••••••' className='border border-[#eee] rounded-md w-[120px] py-3  px-3 pl-7'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className='absolute top-10 left-1' />
              </div>
              <div className='w-25 ml-8 relative' >
                <label htmlFor="" className='block font-bold'>comfirm</label>
                <input required type="password" placeholder='••••••••' className='border border-[#eee] rounded-md w-[120px] py-3  px-3 pl-7'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FaLock className='absolute top-10 left-1' />
              </div>
            </div>
          </div>
          {confirmPassword && !isMatch && (
            <p className='text-white text-sm mt-5 w-[50%] m-auto py-2 font-bold bg-red-500 rounded-xl  text-center  '> password do not match</p>
          )}
          <button type="submit"
            className='w-full bg-[#009966] text-white font-semibold cursor-pointer hover:bg-green-800 mt-8 p-3 rounded-xl'
          >Complete Registration</button>
          <p className='text-center mt-2'>Already have an account?
            <Link to={"/login"}>
              <span className='text-green-500'>Sign in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register