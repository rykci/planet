import React from 'react'
import { useRouter } from 'next/router'

function WrongPlanet() {
  const router = useRouter()

  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-center gap-6">
      <div className="text-xl text-center">
        Looks like you do not have access to this planet.
      </div>
      <button
        onClick={() => {
          router.push('/')
        }}
        className="bg-planet-300 border-planet-300 text-white w-1/2 p-2 pl-4 pr-4 rounded-md border-2 enabled:hover:bg-planet-400 enabled:hover:border-planet-400 font-bold text-lg mb-20"
      >
        Return Home
      </button>
    </div>
  )
}

export default WrongPlanet
