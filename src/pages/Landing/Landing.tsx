import { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import SignUp from '../../components/pages/landing/SignUp';
import SignIn from '../../components/pages/landing/SignIn';
import UserInfo from '../../components/pages/landing/UserInfo';
import Preferences from '../../components/pages/landing/Preferences';
import { motion } from 'framer-motion';
import Protected from '../../protected/ProtectedRoute';
import UserLocationMap from '../../components/pages/landing/Location';
import Interests from '../../components/pages/landing/Interests';

const Landing = () => {
    const circles = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <div className='h-[86vh] w-full overflow-hidden flex justify-center items-center relative'>
            {circles.map((num, index) => {
                const size = `${100 + 10 * index}vh`;
                const opacity = 0.1 * num;

                return (
                    <motion.div
                        key={index}
                        initial={{ borderColor: '#303030' }}
                        animate={{ borderColor: '#1A1A1A' }}
                        transition={{
                            duration: 5,
                            delay: num / 8,
                            repeat: Infinity,
                        }}
                        style={{
                            width: size,
                            height: size,
                            opacity: opacity,
                            borderColor: '#303030',
                            zIndex: -99,
                        }}
                        className="rounded-full absolute border-[1px]"
                    />
                );
            })}

                <Routes>
                    <Route path="/" element={<SignUp/>} />
                    <Route path="userinfo" element={<Protected Page={UserInfo}/>} />
                    <Route path="login" element={<SignIn/>} />
                    <Route path="preferences" element={<Protected Page={Preferences}/>} />
                    <Route path='location' element={<Protected Page={UserLocationMap}/>} />
                    <Route path='interests' element={<Protected Page={Interests}/>}/>
                </Routes>
        </div>
    );
};

export default Landing;
