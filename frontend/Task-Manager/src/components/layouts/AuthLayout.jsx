import React from 'react'



const AuthLayout = ({ children }) => {
  return <div className='flex'>
    <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-3xl font-medium text-black'>Sauf Task Manager</h2>
        {children}
    </div>
  </div>
};

export default AuthLayout
