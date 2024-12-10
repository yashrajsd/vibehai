import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const interests = [
  "Travel", "Cooking", "Sports", "Music", "Movies", "Reading", "Photography", "Art", "Gaming", "Fitness",
  "Dancing", "Yoga", "Hiking", "Cycling", "Swimming", "Meditation", "Gardening", "Pets", "Technology", "Fashion",
  "Food", "Wine", "Coffee", "Tea", "Craft Beer", "Cocktails", "Baking", "Volunteering", "Languages", "History",
  "Science", "Politics", "Philosophy", "Astronomy", "Nature", "Environment", "DIY", "Crafts", "Writing", "Blogging",
  "Podcasts", "Singing", "Instruments", "Theater", "Comedy", "Festivals", "Concerts", "Museums", "Galleries", "Nightlife"
]

const InterestRow = ({ rowInterests, onSelect, selectedInterests }:any) => {
  const ref = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="flex overflow-x-scroll scrollbar-hide mb-4"
      whileTap={{ cursor: "grabbing" }}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <motion.div
        drag="x"
        dragConstraints={ref}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        className="flex space-x-4 p-1"
      >
        {rowInterests.map((interest:any) => (
          <button
            key={interest}
            onClick={() => !isDragging && onSelect(interest)}
            className={`px-4 py-2 rounded-full poppins-medium text-sm  border-[#282828] border-[1px] whitespace-nowrap ${
              selectedInterests.includes(interest)
                ? 'bg-white text-black'
                : 'bg-[#141414] text-white hover:bg-secondary/10'
            }`}
          >
            {interest}
          </button>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function Interests() {
  const [selectedInterests, setSelectedInterests] = useState([])
  const navigate = useNavigate();
  const handleSelect = (interest:any) => {
    setSelectedInterests((prev:any) =>
      prev.includes(interest)
        ? prev.filter((i:any) => i !== interest)
        : [...prev, interest]
    )
  }

  const handleRemove = (interest:any) => {
    setSelectedInterests((prev) => prev.filter((i) => i !== interest))
  }

  const rows = Array.from({ length: 5 }, (_, i) =>
    interests.slice(i * 10, (i + 1) * 10)
  )

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6 aldrich-regular text-white">Choose Your Interests</h2>
      <div>
      {rows.map((rowInterests, index) => (
        <InterestRow
          key={index}
          rowInterests={rowInterests}
          onSelect={handleSelect}
          selectedInterests={selectedInterests}
        />
      ))}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 aldrich-regular text-white">Selected Interests:</h3>
        <div className="flex flex-wrap gap-2 poppins-medium text-black">
          {selectedInterests.map((interest) => (
            <span
              key={interest}
              className="bg-white border-[#282828] border-[1px]  px-3 py-1 rounded-full text-sm flex items-center"
            >
              {interest}
              <button
                onClick={() => handleRemove(interest)}
                className="ml-2  focus:outline-none"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
      <button onClick={()=>{navigate('/otpverify')}}  className={`w-[50vw] mt-[0.5rem] rounded-sm aldrich-regular bg-[#FBFBFB] p-[1rem] rounded-small text-black`}>Continue</button>  
    </div>
  )
}