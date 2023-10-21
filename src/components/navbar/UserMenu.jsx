'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar'
import { UserContext } from '../../Usercontext';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  var token=localStorage.getItem("token");
    const [open, setopen] = useState(false);
    const {user,setuser}=useContext(UserContext);
    const handleclick=()=>{
        setopen((value)=>!value)
    }
    const handlelogout=()=>{
        setuser(null);
       localStorage.setItem("token","null");
    }
  return (
    <div className='relative z-10'>
    <div className='flex flex-row gap-2'>
      <Link to={"/airbnbyourhome"}>
        <div className='font-semibold text-sm hover:shadow-md hover:bg-neutral-100 p-3 rounded-full transition cursor-pointer'>
            Airbnb your home
        </div></Link>
        <div className='flex flex-row items-center justify-between border-[1px] p-2 rounded-full hover:bg-neutral-100 gap-2'>
            <div className='hover:bg-slate-50 transition cursor-pointer'>
             <AiOutlineMenu/>
            </div>
            <div className='hover:bg-slate-50 transition cursor-pointer' onClick={handleclick}>
                <Avatar/>
            </div>

        </div>
    </div>
    <div>
    <div>
      {open && token==="null" && (
        <div className='absolute border-[1px] p-2 rounded-md shadow-md w-[40vw] md:w-[90%] bg-white overflow-hidden right-0 top-12 text-sm'>
          <Link to="/login">
            <div className='py-3 px-4 hover:bg-neutral-100 transition font-semibold'>
              Login
            </div>
          </Link>
          <Link to="/signup">
            <div className='py-3 px-4 hover:bg-neutral-100 transition font-semibold'>
              Signup
            </div>
          </Link>
          <Link to="/signup">
            <div className='py-3 px-4 hover:bg-neutral-100 transition font-semibold'>
              Airbnb your home
            </div>
          </Link>
        </div>
      )}
      {
         open && token!=="null" && (
            <div className='absolute border-[1px] p-2 rounded-md shadow-md w-[40vw] md:w-[90%] bg-white overflow-hidden right-0 top-12 text-sm'>
              <button onClick={handlelogout} >
                <div className='py-3 px-4 hover:bg-neutral-100 transition font-semibold'>
                  Logout
                </div>
              </button>
              <Link to="/signup">
                <div className='py-3 px-4 hover:bg-neutral-100 transition font-semibold'>
                  Airbnb your home
                </div>
              </Link>
            </div>
          )}

      
   
    </div>
  
    </div>
    </div>
  )
}

export default UserMenu