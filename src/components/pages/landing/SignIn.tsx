import React, { useContext } from 'react'
import logo from '../../../assets/vb.png'
import { RegistrationContext } from '../../../context/RegistrationContext'
import { useNavigate } from 'react-router-dom'


const SignIn = () => {
    const {phoneNumber,updatePhoneNumber} = useContext(RegistrationContext)
    const navigate = useNavigate();

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
                <div className='flex w-[24vw] mb-[1rem] items-center gap-[1rem]'>
                    <span>
                    <img src={logo} alt="Logo" className='h-[2.7rem]' />
                    </span>
                    <span className='text-left aldrich-regular'>
                        <h1 className='text-white'>Welcome Back</h1>
                        <p className='text-[#9A9797] text-[0.8rem]'>Find genuine connection with live matching</p>
                    </span>
                </div>
                <div className='w-[24vw] flex flex-col gap-[1rem] p-[1rem] border-[1px] border-[#282828]'>
                    <input onChange={(e)=>{updatePhoneNumber(e.target.value)}} type='number' value={phoneNumber} placeholder='Your Number' className='w-full p-[1rem] bg-transparent text-white border-[1px] border-[#282828] text-center focus:outline-none aldrich-regular'/>
                    <button disabled={phoneNumber.length !== 10}  className={`${phoneNumber.length!=10 && ('opacity-[0.5]')} w-full aldrich-regular bg-[#FBFBFB] p-[1rem] rounded-small`} onClick={()=>{navigate('/otpverify')}}>Get Started</button>
                </div>
                <p className='text-white aldrich-regular text-[0.8rem] mt-[1rem]'>
                    Don't have an account? <span className='text-[#3C4CDC] cursor-pointer' onClick={()=>{navigate('/')}}>Sign Up</span>
                </p>
            </div>
    )
}

export default SignIn