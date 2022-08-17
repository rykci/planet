import React, { useState } from 'react'
//import { UserCircleIcon, GlobeIcon } from '@heroicons/react/solid'
import {
  UserCircleIcon,
  LoginIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid'
import { LoginIcon as LogoutIcon } from '@heroicons/react/outline'
import { auth, db } from '../firebase/firebase'
import { signOut } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

interface ButtonProps {
  plusAction: () => void
}

function Header({ plusAction }: ButtonProps) {
  const [buttonHover, setButtonHover] = useState(false)

  const handleSignOut = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser!.uid), {
      isOnline: false,
    })
    await signOut(auth)
  }

  return (
    <div className="flex items-center justify-between p-4 border-b-2">
      {buttonHover ? (
        <LogoutIcon
          onMouseLeave={() => setButtonHover(false)}
          onClick={handleSignOut}
          className="w-12 h-12 hover:cursor-pointer font-lightrounded-full"
        />
      ) : (
        <LoginIcon
          onMouseEnter={() => setButtonHover(true)}
          onClick={handleSignOut}
          className="w-12 h-12 hover:cursor-pointer font-lightrounded-full"
        />
      )}

      <h1 className="font-bold text-3xl text-center">Planets</h1>

      <PlusCircleIcon
        onClick={plusAction}
        className="w-12 h-12 hover:cursor-pointer font-lightrounded-full"
      />
    </div>
  )
}

export default Header
