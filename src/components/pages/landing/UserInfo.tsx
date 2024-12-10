import React, { useContext, useState } from 'react'
import InfoIcon from '@mui/icons-material/Info';
import { RegistrationContext } from '../../../context/RegistrationContext';
import { useNavigate } from 'react-router-dom';

const UserInfo= () => {
    const {username,updateName,gender,updateGender} = useContext(RegistrationContext);
    const navigate = useNavigate();

  return (
    <div className='w-full h-full flex flex-col gap-[2rem] justify-center aldrich-regular text-white items-center'>
        <div className='flex w-[20vw] items-center gap-[0.5rem] '>
        <InfoIcon/>
        <p>Fill Basic Info</p>
        </div>
        <div>
        <input placeholder='Your Name' value={username} onChange={(e)=>{updateName(e.target.value)}} className='w-[20vw] p-[1rem] bg-transparent text-white border-[1px] border-[#282828] text-center focus:outline-none aldrich-regular'/>
        <div className="flex w-[20vw] mt-[0.5rem] items-center">
        <input
            type="checkbox"
            id="hideName"
            className="mr-2 bg-[#FBFBFB] checked:bg-[#5465FF] cursor-pointer"
        />
        <label htmlFor="hideName" className='text-[0.8rem] text-[#969696]'>Keep your name hidden?</label>
        </div>
        </div>
        <div className='w-[20vw] flex flex-col gap-[1rem]'>
            <p className='text-left'>What's your birth date?</p>
            <input type='date' className='text-white focus:outline-none bg-transparent p-[1rem] w-[20vw] border-[1px] border-[#282828]'/>
        </div>
        <div className='w-[20vw] flex flex-col gap-[1rem]'>
        <p className='text-left'>What's your Gender?</p>
        <select 
              value={gender} 
              onChange={(e) => updateGender(e.target.value)}
              className='appearance-none text-white focus:outline-none bg-transparent p-[1rem] w-[20vw] border-[1px] border-[#282828]'
            >
              <option className='bg-[#141414]' value="" disabled>Select gender</option>
              <option className='bg-[#141414]' value="male">Male</option>
              <option className='bg-[#141414]' value="female">Female</option>
              <option className='bg-[#141414]' value="non-binary">Non-binary</option>
              <option className='bg-[#141414]' value="other">Other</option>
            </select>
        </div>
        <button onClick={()=>{navigate('/preferences')}}  className={`w-[20vw] aldrich-regular bg-[#FBFBFB] p-[1rem] rounded-small text-black`}>Create Account</button>
    </div>
  )
}

export default UserInfo