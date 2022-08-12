import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LoginBtn from '../components/LoginBtn'

import { useSession } from 'next-auth/react'
import LandingPage from '../components/LandingPage'

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <div className="max-h-screen">
      <Head>
        <title>Planet!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session ? (
        <LandingPage />
      ) : (
        <main className="flex flex-col space-between max-h-screen ">
          <Header />
          <LoginBtn />
          <button className="p-2 border" onClick={() => console.log(session)}>
            PRINT SESSION
          </button>
          <Footer />
        </main>
      )}
    </div>
  )
}

export default Home
