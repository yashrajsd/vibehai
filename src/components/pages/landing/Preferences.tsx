import React, { useState } from 'react'
import { Heart, Coffee, Wine, Zap, Moon } from 'lucide-react'
import { useNavigate } from 'react-router-dom';



const PreferenceCard: React.FC<{
  icon: React.ReactNode,
  title: string,
  description: string,
  isSelected: boolean,
  onClick: () => void
}> = ({ icon, title, description, isSelected, onClick }) => (
  <div 
    className={`w-[18vw] h-[200px] cursor-pointer transition-all duration-300 transform hover:scale-105 ${
      isSelected ? 'bg-[#5465FF] text-white' : 'bg-[#141414] border-[1px]  border-[#282828] text-gray-300'
    }`}
    onClick={onClick}
  >
    <div className="flex flex-col items-center h-full justify-center gap-[0.5rem] px-[0.5rem]">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-center">{description}</p>
    </div>
  </div>
)

const Preferences = () => {
  const [preferences, setPreferences] = useState<string[]>([])
  const navigate = useNavigate();

  const togglePreference = (pref: string) => {
    setPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    )
  }

  const preferences_data = [
    { icon: <Heart className="animate-pulse" />, title: "Serious Relationship", description: "Looking for a long-term commitment", value: "serious" },
    { icon: <Coffee className="animate-bounce" />, title: "Casual Dating", description: "Keeping it light and fun", value: "casual" },
    { icon: <Wine className="animate-spin-slow" />, title: "Friends First", description: "Let's start as friends and see where it goes", value: "friends" },
    { icon: <Zap className="animate-ping" />, title: "One Night Stand", description: "Seeking a brief encounter", value: "one-night" },
    { icon: <Moon className="animate-twinkle" />, title: "Open to Anything", description: "Flexible and going with the flow", value: "open" },
  ]

  return (
    <div className='w-full h-full flex flex-col gap-[2rem] justify-center aldrich-regular text-white items-center'>
      <h2 className="text-2xl font-bold mb-4">What are you looking for?</h2>
      <p className="text-gray-400 mb-6">Select all that apply. Be honest!</p>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {preferences_data.map((pref) => (
          <PreferenceCard
            key={pref.value}
            icon={pref.icon}
            title={pref.title}
            description={pref.description}
            isSelected={preferences.includes(pref.value)}
            onClick={() => togglePreference(pref.value)}
          />
        ))}
      </div>
      <button 
        onClick={() => {navigate('/interests')}}
        disabled={preferences.length === 0}
        className={`w-[20vw] aldrich-regular p-[1rem] rounded-md text-black transition-colors duration-300
          ${preferences.length > 0 ? 'bg-[#5465FF] hover:bg-[#4354EE] text-white' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        {preferences.length > 0 ? "Let's Go!" : "Select at least one preference"}
      </button>
    </div>
  )
}

export default Preferences