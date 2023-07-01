import { motion } from 'framer-motion'
import React from 'react'
import { fadeInOut } from '../animations'
import {FaCheck} from "../assets/icon"
import { BsExclamationTriangle } from 'react-icons/bs'
import { CgDanger} from "react-icons/cg"
import { FcInfo } from 'react-icons/fc'


const Alert = ({type, message}) => {
if(type === "warning"){
  return(
     <motion.div {...fadeInOut} className='fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-orange-300 shadow-md flex items-center gap-2'>
      <FaCheck className='text-xl text-blue-200'/>
      <BsExclamationTriangle className='text-xl text-orange-400'/>
      <p className='text-xl text-orange-700'>{message}</p> 
     </motion.div>
  )
}
if(type === "danger"){
  return(
     <motion.div {...fadeInOut} className='fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-red-300 shadow-md flex items-center gap-2'>
      < CgDanger className='text-xl text-red-400'/>
      <p className='text-xl text-red-700'>{message}</p> 
     </motion.div>
  )
}
if(type === "info"){
  return(
     <motion.div {...fadeInOut} className='fixed z-50 top-32 right-12 px-4 py-2 rounded-md backdrop-blur-sm bg-blue-300 shadow-md flex items-center gap-2'>
      <FcInfo className='text-xl text-blue-400'/>
      <p className='text-xl text-blue-700'>{message}</p> 
     </motion.div>
  )
}

}

export default Alert
