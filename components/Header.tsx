import React from 'react'
//import { UserCircleIcon, GlobeIcon } from '@heroicons/react/solid'
import { UserCircleIcon, GlobeIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'

function Header() {
  const { data: session } = useSession()
  return (
    <div className="flex items-center justify-between p-4 border-b-2">
      <img
        src={session?.user?.image || undefined}
        className="w-10 h-10 hover:cursor-pointer font-light rounded-full"
      />

      <h1 className="font-bold text-3xl text-center">Planets</h1>

      <GlobeIcon className="w-12 h-12 hover:cursor-pointer font-lightrounded-full" />
    </div>
  )
}

export default Header