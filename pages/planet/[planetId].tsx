import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { ChevronLeftIcon } from '@heroicons/react/outline'
import { PlusCircleIcon, MenuIcon } from '@heroicons/react/solid'
import { db } from '../../firebase/firebase'
import { doc, updateDoc, onSnapshot, Timestamp } from 'firebase/firestore'

import Loading from '../../components/Loading'
import WrongPlanet from '../../components/WrongPlanet'
import planetMap from '../../planetMap'
import { AuthContext } from '../../context/auth'

interface ChatObject {
  from: string
  content: string
  timestamp: Date
}

function PlanetRoom() {
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const [planet, setPlanet] = useState(Object())
  const [loading, setLoading] = useState(true)
  const [addingUser, setAddingUser] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [text, setText] = useState('')

  const { planetId } = router.query

  useEffect(() => {
    if (!planetId) return
    const planetRef = doc(db, `planets`, planetId as string)

    const unsub = onSnapshot(planetRef, (snapshot) => {
      setPlanet(snapshot.data())
      setLoading(false)
    })

    return () => unsub()
  }, [])

  const sendChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const timestamp = Timestamp.fromDate(new Date())
    const chat = {
      from: user.uid,
      content: text,
      timestamp,
    }

    const newChat = [...planet.chat, chat]

    const planetRef = doc(db, `planets`, planet.id)
    try {
      await updateDoc(planetRef, {
        lastUpdate: timestamp,
        chat: newChat,
      })
      setText('')
    } catch (err) {
      console.log(err)
    }
  }

  const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newMembers = [...planet.members, userInput]

    const planetRef = doc(db, `planets`, planetId as string)
    try {
      await updateDoc(planetRef, {
        members: newMembers,
      })
      setUserInput('')
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  if (!user) return <WrongPlanet />
  if (loading) return <Loading />
  if (!planet || !planet.members?.includes(user.uid)) return <WrongPlanet />

  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-between">
      <div className=" flex items-center py-4 relative border-b">
        <ChevronLeftIcon
          onClick={() => router.push('/')}
          className="h-12 cursor-pointer transition-all hover:translate-x-1"
        />
        <img className="" src={`/planet-icons/${planetMap[planet?.type]}`} />
        <div className="font-semibold text-lg px-6"> {planet?.name} </div>
        <MenuIcon
          onClick={() => setAddingUser(!addingUser)}
          className="h-12 absolute right-3 cursor-pointer"
        />
      </div>
      {addingUser ? (
        <form className="flex" onSubmit={addUser}>
          <input
            className="p-3 border-2 border-y-0 flex-grow-1 w-full"
            placeholder="User ID"
            onChange={handleChange}
            value={userInput}
          />
          <button className="bg-blue-500 hover:border-blue-600 hover:bg-blue-600 border-blue-500 text-white p-3 px-6 self-end">
            Add
          </button>
        </form>
      ) : (
        <></>
      )}
      <div className="flex flex-col justify-start flex-1 p-6 gap-4 overflow-y-scroll relative">
        {planet.chat.map((message: ChatObject) => (
          <div
            className={`${
              user.uid == message.from
                ? 'bg-planet-300 text-white ml-auto'
                : 'bg-white'
            } border p-2 rounded-xl px-4 w-fit flex`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={sendChat} className="flex p-4 gap-4 w-full">
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
          placeholder="Aa"
          className="p-2 px-4 rounded-full flex-1 focus:outline-planet-100"
        />
        <button
          type="submit"
          className="bg-planet-300 hover:bg-planet-400 text-white rounded-xl px-4"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default PlanetRoom
