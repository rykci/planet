import React, { useContext } from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'

import { auth, db } from '../firebase/firebase'
import { signOut } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { AuthContext } from '../context/auth'

function Planets() {
  const { user } = useContext(AuthContext)
  return (
    <main className="flex flex-col space-between max-h-screen h-screen bg-gray-100">
      <Header />
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
