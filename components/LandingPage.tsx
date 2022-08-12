import React from 'react'
import { signIn } from 'next-auth/react'

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome to Planet!</h1>
      <button
        onClick={() => signIn()}
        className="p-1 pl-4 pr-4 rounded-xl border-2 hover:bg-slate-200"
      >
        Log In
      </button>
    </div>
  )
}

export default LandingPage
