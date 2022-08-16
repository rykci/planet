import React, { useContext } from 'react'
//import { UserCircleIcon, GlobeIcon } from '@heroicons/react/solid'
import { UserCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'

interface ButtonProps {
  plusAction: () => void
}

function Header({ plusAction }: ButtonProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b-2">
      <UserCircleIcon className="w-12 h-12 hover:cursor-pointer font-lightrounded-full" />

      <h1 className="font-bold text-3xl text-center">Planets</h1>

      <PlusCircleIcon
        onClick={plusAction}
        className="w-12 h-12 hover:cursor-pointer font-lightrounded-full"
      />
    </div>
  )
}

export default Header
