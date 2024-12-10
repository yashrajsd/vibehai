import React from 'react'
import logo from '../../assets/vb.png';

const Navbar = () => {
  return (
    <div className='w-full h-[7vh] px-[2rem] flex items-center justify-between border-solid border-[#313131] border-b-[1px]'>
        <span className='h-full flex gap-[0.5rem] justify-center items-center'>
          <img src={logo} alt="Logo" className='h-[50%]' />
          <h3 className='text-white poppins-semibold'>Vibe Hai</h3>
        </span>
        <span className='h-full flex gap-[0.5rem] text-[1rem] justify-center items-center'>
          <ul>
            <li><p className='text-[#969696] poppins-medium text-[0.8rem]'>How it works?</p></li>
          </ul>
        </span>
    </div>
  )
}

export default Navbar