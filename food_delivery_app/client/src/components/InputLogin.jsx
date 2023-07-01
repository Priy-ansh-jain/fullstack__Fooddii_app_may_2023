import { motion } from 'framer-motion'
import React, {useState} from 'react'
import { fadeInOut } from '../animations'

const InputLogin = ({ placeHolder, icon, inputState, inputStateFunc, type, isSignUp }) => {

  const [isFocus, setIsFocus] =useState(false)
  
  return (
    <motion.div 
    {...fadeInOut}
     className={`flex items-center justigy-center gap-4 bg-lightOverlay backdrop-blur-md rounded-md ml-1 w-full ${isFocus ? "shadow-md shadow-red-400" : "shadow-none"}`}>
      {icon}
        <input
        type={type}
        placeholder={placeHolder}
        className="w-full h-full bg-transparent text-stone-700
 text-lg font-semibold border-none outline-none py-1"
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        
        />
    </motion.div>
  )
}

export default InputLogin
