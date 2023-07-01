import React from 'react'
import { NavLink } from 'react-router-dom';
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { MdShoppingCart } from "../assets/icon";
import { UserSelector } from "react-redux";

const header = () => {
  const user = userSelector((state) => state.user);
  return (
    <header className='fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between overflow-hidden flex-1'>
      <NavLink to={"/"} className="flex items-center justify-center gap-2">
        <h1 className='text-orange-600 flex flex-1 p-5 text-2xl font-semibold font-sans '>Veg-Foody</h1>
      </NavLink>
      <nav className='flex items-center justify-center bg-slate-50'>
        <ul className='hidden md:flex items-center justify-center gap-2 p-2 text-black font-normal '>
          <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to={"/"}>Home</NavLink>
          <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to={"menu"}>Menu</NavLink>
          {/* <navLink to={"food"}>Food</navLink> */}
          <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to={"services"}>Services</NavLink>
          <NavLink className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles} to={"AboutUs"}>About Us</NavLink>
        </ul>
        <motion.div {...buttonClick} className='relative cursor-pointer'>
          <MdShoppingCart className='text-xl text-black mr-4 ' />
          <div className='w-4 h-4 rounded-full bg-red-500 flex items-center justify-center -mt-8 ml-2'>
            <p className='text-[10px]'>2</p>
          </div>
        </motion.div>
        {/* if the user is ther tan we have to display  */}
        {user ? <></> : <>

        </>}
      </nav>
    </header>
  )
}

export default header



// <header>
// <nav class="header__nav" className='flex  overflow-hidden'>
//   <div class="header__logo" className='flex flex-1 p-[20px]'>
//     <h4>Veg-Foody</h4>
//     <div class="header__logo-overlay" className="absolute inset-x-0 w-[100%] bg-yellow-600 z-[-1]"></div>
//   </div>
//   <ul class="header__menu">
//     <li><a href="#menu">Menu</a></li>
//     <li><a href="#food">Food</a></li>
//     <li><a href="#services">Services</a></li>
//     <li><a href="#About-us">About Us</a></li>
//     <li>
//       <img src="assets/search.svg" alt="search" />
//     </li>
//   </ul>
//   <!-- mobile devices -->
//   <ul class="header__menu-mobile">
//     <li>
//       <img
//         src="
//       assets/menu.svg"
//         alt="menu"
//       />
//     </li>
//   </ul>
// </nav>
// </header>