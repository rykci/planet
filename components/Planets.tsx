import React, { useContext, useState } from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'

import { auth, db } from '../firebase/firebase'
import { signOut } from 'firebase/auth'
import { collection, doc, updateDoc, addDoc } from 'firebase/firestore'
import { AuthContext } from '../context/auth'

function Planets() {
  const { user } = useContext(AuthContext)
  const [addingPlanet, setAddingPlanet] = useState(false)
  const [planetName, setPlanetName] = useState('')

  const createPlanet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await addDoc(collection(db, 'planets'), {
        planetName,
        members: [user.uid],
      })

      //console.log(result.id)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanetName(e.target.value)
  }

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
      <button
        className="p-2 border"
        onClick={async () => {
          await updateDoc(doc(db, 'users', auth.currentUser!.uid), {
            isOnline: false,
          })
          await signOut(auth)
        }}
      >
        SIGN OUT
      </button>
      <button className="p-2 border" onClick={() => console.log(user)}>
        PRINT USER
      </button>
      <Footer />
    </main>
  )
}

export default Planets
