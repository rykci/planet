import type { NextPage } from 'next'
import { useContext } from 'react'
import Head from 'next/head'

import LandingPage from '../components/LandingPage'
import Planets from '../components/Planets'
import { AuthContext } from '../context/auth'

const Home: NextPage = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className="max-h-screen">
      <Head>
        <title>Planet!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!user ? <LandingPage /> : <Planets />}
    </div>
  )
}

export default Home
