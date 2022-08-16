import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Header from '../components/Header'

import LandingPage from '../components/LandingPage'
import { auth, db } from '../firebase/firebase'
import { signOut } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

const Home: NextPage = () => {
  console.log(auth.currentUser)

  return (
    <div className="max-h-screen">
      <Head>
        <title>Planet!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!auth.currentUser ? (
        <LandingPage />
      ) : (
        <main className="flex flex-col space-between max-h-screen">
          <Header />
          <button
            className="p-2 border"
            onClick={async () => {
              await updateDoc(doc(db, 'users', auth.currentUser!.uid), {
                isOnline: false,
              })
              await signOut(auth)
            }}
          >
            SIGN OUT
          </button>
          <button
            className="p-2 border"
            onClick={() => console.log(auth.currentUser)}
          >
            PRINT USER
          </button>
          <Footer />
        </main>
      )}
    </div>
  )
}

export default Home
