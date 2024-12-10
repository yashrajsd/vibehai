import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Protected from './protected/ProtectedRoute';
import OTPverify from './components/pages/otp/OTPverify';
import SignUp from './components/pages/landing/SignUp';
import UserInfo from './components/pages/landing/UserInfo';
import Preferences from './components/pages/landing/Preferences';
import SignIn from './components/pages/landing/SignIn';
import UserLocationMap from './components/pages/landing/Location';
import Interests from './components/pages/landing/Interests';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='h-[86vh] overflow-hidden'>
        <Routes>
          <Route path="/" element={<Landing />}>
            <Route path='/' element={<SignUp/>}/>
            <Route path="userinfo" element={<Protected Page={UserInfo}/>} />
            <Route path="login" element={<SignIn/>} />
            <Route path="preferences" element={<Protected Page={Preferences}/>} />
            <Route path='location' element={<Protected Page={UserLocationMap}/>} />
            <Route path='interests' element={<Protected Page={Interests}/>}/>
          </Route>
          <Route element={<Protected Page={OTPverify}/>} path="/otpverify" />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
