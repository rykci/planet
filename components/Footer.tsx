import React from 'react'
import { useRouter } from 'next/router'
import { CalendarIcon, UserGroupIcon, GlobeIcon } from '@heroicons/react/solid'

function Footer() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-around p-4 w-screen border-t-2">
      <div className="flex flex-col items-center">
        <GlobeIcon className="w-10 h-10 hover:cursor-pointer hover:scale-125 duration-200 " />
        Planets
      </div>
      <div className="flex flex-col items-center">
        <UserGroupIcon
          onClick={() => {
            router.push('/people')
          }}
          className="w-10 h-10 hover:cursor-pointer hover:scale-125 duration-200 "
        />
        People
      </div>
      <div className="flex flex-col items-center">
        <CalendarIcon className="w-10 h-10 hover:cursor-pointer hover:scale-125 duration-200 " />
        Schedule
      </div>
    </div>
  )
}

export default Footer
