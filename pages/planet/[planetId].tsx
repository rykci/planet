import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { db } from '../../firebase/firebase'
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'

import planetMap from '../../planetMap'

function PlanetRoom() {
  const router = useRouter()
  const [planet, setPlanet] = useState(Object())

  const { planetId } = router.query

  useEffect(() => {
    if (!planetId) return
    const planetRef = doc(db, `planets/${planetId}`)

    const unsub = onSnapshot(planetRef, (snapshot) => {
      setPlanet(snapshot.data())
    })
    return () => unsub()
  }, [])

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <div className="bg-blue-100 flex items-center py-4 relative">
        <ChevronLeftIcon
          onClick={() => router.push('/')}
          className="h-12 cursor-pointer"
        />
        <img className="" src={`/planet-icons/${planetMap[planet.type]}`} />
        <div className="font-semibold text-lg px-6"> {planet.name} </div>
        <PlusCircleIcon className="h-12 absolute right-3 cursor-pointer" />
      </div>
    </div>
  )
}

export default PlanetRoom
