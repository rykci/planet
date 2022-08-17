import React, { useContext } from 'react'
//import { UserCircleIcon, GlobeIcon } from '@heroicons/react/solid'
import { UserCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { auth, db } from '../firebase/firebase'
import { signOut } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

interface ButtonProps {
  plusAction: () => void
}

function Header({ plusAction }: ButtonProps) {
  const handleSignOut = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser!.uid), {
      isOnline: false,
    })
    await signOut(auth)
  }

  return (
    <div className="flex items-center justify-between p-4 border-b-2">
      <UserCircleIcon
        onClick={handleSignOut}
        className="w-12 h-12 hover:cursor-pointer font-lightrounded-full"
      />

      <h1 className="font-bold text-3xl text-center">Planets</h1>

      <PlusCircleIcon
        onClick={plusAction}
        className="w-12 h-12 hover:cursor-pointer font-lightrounded-full"
      />
    </div>
  )
}

export default Header
