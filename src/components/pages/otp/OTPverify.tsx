import React, { useContext, useRef, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import axios from 'axios';
import { RegistrationContext } from '../../../context/RegistrationContext';
import { useNavigate } from 'react-router-dom';
import ChangeNumber from '../../UI/popup/ChangeNumber';

interface RegistrationContextType {
    phoneNumber: string;
    username: string;
    age: number;
    ageRange: number;
    location:number[]
}


const OTPverify: React.FC = () => {
    const [change,setChange] = useState(false);
    const { phoneNumber, username, age, ageRange, location } = useContext(RegistrationContext) as RegistrationContextType;
    const [otp, setOtp] = useState<string[]>(new Array(4).fill("")); 
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]); 
    const navigate = useNavigate();

    useEffect(() => {
        console.log(location);
        const getOTP = async () => {
          if (location && location.length === 2) {
            try {
              const response = await axios.post(
                'http://localhost:3001/api/auth/verify',
                { 
                  phoneNumber,
                  username,
                  age,
                  ageRange,
                  latitude: location[0],
                  longitude: location[1],
                },
                {
                  headers: {
                    'Content-Type': 'application/json', 
                  },
                }
              );
              console.log("OTP sent successfully: ", response.data);
            } catch (error: any) {
              console.log("Error message: " + error.message);
            }
          } else {
            console.log("Invalid location data");
          }
        };
      
        if (phoneNumber) {
          getOTP();
        }
      }, [phoneNumber, location]);
      
    const handleVerification=async()=>{
      if(otp.length==4){
        const OTP =otp.join('');
        try{
          const responce = await axios.post('http://localhost:3001/api/auth/register',{
          phoneNumber,OTP
          },
          {
            headers: {
              'Content-Type': 'application/json', 
            },
          })
          if(responce.status==400){
            alert("Working!!")
            navigate('/')
          }else{
            alert("Error status "+responce.status)
          }
        }catch(err){
          console.error(err);
        }
      }
    }

    // Handle input change
    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value;
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);


            if (index < 3 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        } else {
            element.value = ''; 
        }
    };

    // Handle backspace
    const handleBackspace = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];

            // If the current box is empty, move to the previous box
            if (otp[index] === "" && index > 0) {
                inputRefs.current[index - 1]?.focus();
            } else {
                // Clear current box value and move focus if needed
                newOtp[index] = "";
                setOtp(newOtp);
                inputRefs.current[index]?.focus();
            }
        }
    };

    return (
        <div className='w-full h-full flex justify-center relative items-center'>
            {change && (<ChangeNumber setChange={setChange}/>)}
            <div className='w-[40vw] aldrich-regular gap-[2.5rem] flex flex-col justify-center items-center h-[50vh] border-[1px] border-[#282828]'>
                <p className='text-center text-white'>Enter the OTP</p>
                <p className='text-white text-[1.5rem] cursor-pointer' onClick={()=>{setChange(true)}}>{phoneNumber}</p>
                <div className='flex w-[80%] justify-between'>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            className='w-[5rem] h-[5rem] text-center text-white bg-transparent border-[1px] border-[#282828]'
                            value={digit}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
                            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleBackspace(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                        />
                    ))}
                </div>
                <button onClick={handleVerification} disabled={otp[3]==""}  className={`${otp[3]=="" && ('opacity-[0.5]')} w-[80%] aldrich-regular bg-[#FBFBFB] rounded-sm p-[1rem] rounded-small`}>Verify</button>
            </div>
        </div>
    );
};

export default OTPverify;





