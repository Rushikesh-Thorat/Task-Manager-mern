import React from 'react'
import UI_IMG from "../../assets/Images/saufBg.png"

const AuthLayout = ({ children }) => {
  return (
    <div className="flex relative">
      {/* Left Content */}
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 z-10'>
        <h2 className='text-3xl font-medium text-black'>Sauf Task Manager</h2>
        {children}
      </div>

      {/* Right Fixed Image */}
      <div className="hidden md:block fixed top-0 right-0 w-[40vw] h-screen">
        <img 
          src={UI_IMG} 
          className='w-full h-full object-cover' 
          alt="UI Background" 
        />
      </div>
    </div>
  );
};

export default AuthLayout;
