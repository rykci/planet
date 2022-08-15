import React from 'react'
import { signIn } from 'next-auth/react'

function LandingPage() {
  return (
    <div className="flex flex-col h-screen items-center bg-gray-100 pt-8 md:flex-row md:justify-around ">
      <div className="flex flex-col items-center md:items-start md:pb-20">
        <img
          className="h-28 md:-ml-8 md:-mb-2"
          src="/logo.svg"
          placeholder="LOGO"
        />
        <div className="leading-tight text-2xl text-center w-96 mb-10 md:text-left">
          Connect with friends and the world around you on Facebook.
        </div>
      </div>
      <form className="flex flex-col rounded-md items-center justify-center gap-4 bg-white shadow-2xl p-5 w-96">
        <input className="w-full border p-3 rounded-md" placeholder="Email" />
        <input
          className="w-full border p-3 rounded-md"
          placeholder="Password"
        />

        <button
          onClick={() => signIn()}
          className="bg-blue-500 border-blue-500 text-white w-full p-2 pl-4 pr-4 rounded-md border-2 hover:bg-blue-600 hover:border-blue-600 font-bold text-lg"
        >
          Log In
        </button>

        <div className="m-4 w-full border-t"></div>

        <button
          onClick={() => signIn()}
          className="bg-green-500 border-green-500 p-3 pl-4 pr-4 rounded-lg border-2 hover:bg-green-600 hover:border-green-600 font-bold  text-white mb-3"
        >
          Create new account
        </button>
      </form>
    </div>
  )
}

export default LandingPage
