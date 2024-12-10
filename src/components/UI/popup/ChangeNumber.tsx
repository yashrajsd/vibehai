import { RegistrationContext } from '../../../context/RegistrationContext';
import React, { useContext, useState } from 'react';

interface ChangeNumberProps {
    setChange: (change: boolean) => void;
}

const ChangeNumber = ({ setChange }: ChangeNumberProps) => {
    const { phoneNumber, updatePhoneNumber } = useContext(RegistrationContext);
    const [changedNumber,setChangedNumber] = useState<string>(phoneNumber);
    // Handler to update phone number on input change
    // const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     updatePhoneNumber(e.target.value); // Call updatePhoneNumber with the new value
    // };

    const saveChanges=()=>{
        updatePhoneNumber(changedNumber);
        setChange(false);
    }

    return (
        <div 
            className='w-full h-full absolute flex justify-center items-center z-[999] backdrop-blur-sm' 
            onClick={() => setChange(false)}
        >
            <div 
                className='w-[20rem] h-[15rem] border-[1px] flex flex-col justify-center items-center border-[#282828] rounded-sm bg-[#141414]' 
                onClick={(e) => e.stopPropagation()} 
            >
                <input
                    value={changedNumber}
                    placeholder='Change Number'
                    type='number'
                    onChange={(e)=>{setChangedNumber(e.target.value)}}
                    className='w-[80%] p-[1rem] aldrich-regular text-white bg-[#141414] border-[1px] border-[#282828] outline-none'
                />
                <button
                    onClick={saveChanges}
                    disabled={changedNumber.length !== 10}
                    className={`${
                        changedNumber.length !== 10 ? 'opacity-50' : ''
                    }  aldrich-regular w-[80%] rounded-sm bg-[#FBFBFB] p-[1rem] mt-[1rem] mx-auto block rounded-small`}
                >
                    Recieve OTP
                </button>
            </div>
        </div>
    );
};

export default ChangeNumber;
