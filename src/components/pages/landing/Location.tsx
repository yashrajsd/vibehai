import React, { useState, useEffect, useContext } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useNavigate } from 'react-router-dom'
import NavigationIcon from '@mui/icons-material/Navigation';
import { RegistrationContext } from '../../../context/RegistrationContext'

// Custom icon setup
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
})

// Component to update map view when location changes
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

interface Location {
  location: number[]; 
  setLocation: (location: number[]) => void;
}

export default function UserLocationMap() {
  const [position, setPosition] = useState<[number, number] | null>(null)
  const [loading, setLoading] = useState(true)
  const {setLocation} = useContext(RegistrationContext) as Location
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude])
          setLocation([pos.coords.latitude, pos.coords.longitude])
          setLoading(false)
        },
        (err) => {
          setError(`Error: ${err.message}`)
          setLoading(false)
        }
      )
    } else {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen aldrich-regular text-red-500">{error}</div>
  }

  return (
    <div className="h-[50vh] w-[50vw] flex justify-content-center items-center flex-col">
        <div className='flex w-full items-center gap-[1rem] mb-[1rem]'>
            <span>
                <NavigationIcon className='text-white' style={{fontSize:'3rem'}}/>
            </span>
            <span className='aldrich-regular '>
                <h1 className='text-white text-left text-[1.4rem]'>Is this your currect loction?</h1>
                <p className='text-white text-[0.8rem] text-left'>We match with the nearest users for better connections</p>
            </span>
        </div>
      {position ? (
        <MapContainer center={position} className='rounded-sm' zoom={13} style={{ height: '100%', width: '100%'}} 
        scrollWheelZoom={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        boxZoom={false}
        zoomControl={false}>
          <ChangeView center={position} zoom={16} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}>
            <Popup>
              You are here! <br /> Latitude: {position[0].toFixed(4)} <br /> Longitude: {position[1].toFixed(4)}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div className="flex justify-center items-center h-full">Unable to determine location</div>
      )}
    <button onClick={()=>{navigate('/userinfo')}}  className={`w-[50vw] mt-[0.5rem] rounded-sm aldrich-regular bg-[#FBFBFB] p-[1rem] rounded-small text-black`}>Confirm Location</button>  
    </div>
  )
}