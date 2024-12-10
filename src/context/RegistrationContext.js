import React, { createContext, useState } from 'react';

const RegistrationContext = createContext();

const RegistrationProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username,setuserName] = useState('');
  const [age,setAge] = useState(null);
  const [gender,setGender] = useState('');
  const [location,setLocation] = useState(null);

  const updatePhoneNumber = (number) => {
    setPhoneNumber(number);
  };

  const updateName = (name)=>{
    setuserName(name);
  }

  const updateAge=(age)=>{
    setAge(age);
  }

  const updateGender=(gender)=>{
    setGender(gender);
  }


  const updateLocation=()=>{
    
  }

  return (
    <RegistrationContext.Provider value={{ phoneNumber, updatePhoneNumber ,updateGender,gender,updateAge,age,updateName,username,setLocation,location}}>
      {children}
    </RegistrationContext.Provider>
  );
};

export { RegistrationProvider, RegistrationContext };
