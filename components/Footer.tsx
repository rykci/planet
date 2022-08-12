import React from 'react'
import {
  CalendarIcon,
  UserGroupIcon,
  GlobeIcon,
} from '@heroicons/react/outline'

function Footer() {
  return (
    <div className="flex items-center justify-around p-4 absolute bottom-0 w-screen border-t-2">
      <div className="flex flex-col items-center">
        <GlobeIcon className="w-10 h-10 hover:cursor-pointer hover:scale-125 duration-200 " />
        Planets
      </div>
      <div className="flex flex-col items-center">
        <UserGroupIcon className="w-10 h-10 hover:cursor-pointer hover:scale-125 duration-200 " />
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
