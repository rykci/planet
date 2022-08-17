import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Footer from '../components/Footer'
import Header from '../components/Header'
import planetMap from '../planetMap'

import { auth, db } from '../firebase/firebase'
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'
import { AuthContext } from '../context/auth'

function Planets() {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const [planetList, setPlanetList] = useState(Array())
  const [addingPlanet, setAddingPlanet] = useState(false)
  const [planetName, setPlanetName] = useState('')

  const planetRef = collection(db, 'planets')

  useEffect(() => {
    const q = query(planetRef, where('members', 'array-contains', user.uid))

    const unsub = onSnapshot(q, (querySnapshot) => {
      let usersPlanets = Array()
      querySnapshot.forEach((planet) => {
        usersPlanets.push(planet.data())
      })
      setPlanetList(usersPlanets)
    })
    return () => unsub()
  }, [])

  const createPlanet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const newPlanetRef = doc(planetRef)
      setDoc(newPlanetRef, {
        name: planetName,
        id: newPlanetRef.id,
        members: [user.uid],
        type: Math.floor(Math.random() * planetMap.length),
      })

      router.push(`planet/${newPlanetRef.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanetName(e.target.value)
  }

  if (!user) {
    router.push('/')
    return <></>
  } else
    return (
      <main className="flex flex-col space-between max-h-screen h-screen bg-gray-100">
        <Header plusAction={() => setAddingPlanet(!addingPlanet)} />
        {addingPlanet ? (
          <form className="flex" onSubmit={createPlanet}>
            <input
              className="p-3 border-2 border-y-0 flex-grow-1 w-full"
              placeholder="Planet Name"
              onChange={handleChange}
              value={planetName}
            />
            <button className="bg-blue-500 hover:border-blue-600 hover:bg-blue-600 border-blue-500 text-white p-3 px-6 self-end">
              Create
            </button>
          </form>
        ) : (
          <></>
        )}

        <div className="overflow-y-scroll flex-1 ">
          {planetList.map((planet) => (
            <div
              onClick={() => router.push(`planet/${planet.id}`)}
              key={planet.id}
              className="border-b py-4 flex items-center hover:bg-gray-200 cursor-pointer"
            >
              <img
                className="px-6"
                src={`/planet-icons/${planetMap[planet.type]}`}
              />
              <div className="text-xl">{planet.name}</div>
            </div>
          ))}
        </div>
        <Footer />
      </main>
    )
}

export default Planets
