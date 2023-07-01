import React from 'react'
import "../assets/css/Loader.css"
const MainLoader = () => {
  return (
    <div className ='flex items-center justify-center container'>
     <svg width = "100" height= "100" viewBox='0 0 300 300'>

     </svg>
     <defs>
      <linearGradient
      id="gradient-fill"
      gradientUnits="userSpaceOnUse"
      xl="0"
      y1="300"
      x2="300"
      y2="0"
      >
        <stop offset ="0%">
        <animate
        attributeName="stop-color"
        values="#00E06B;#CB0255;#00E06B"
        dur="5s"
        repeatCount="idefinite"
        />
        </stop>
        <stop offset ="100%">
        <animate
        attributeName="stop-color"
        values="#04AFC8p;#8904C5;#04AFC8"
        dur="8s"
        repeatCount="idefinite"
        />
        </stop>
        </linearGradient>
        <clipPath id="clip">
          <rect
          className='square s1'
          x="0">

          </rect>

        </clipPath>
        </defs>
     
    
 
    </div>
  )
}

export default MainLoader
