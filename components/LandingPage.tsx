import React, { useState } from 'react'
import { EyeOffIcon, XIcon } from '@heroicons/react/solid'
import { auth, db } from '../firebase/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { doc, setDoc, updateDoc, Timestamp } from 'firebase/firestore'

function LandingPage() {
  const [showModal, setShowModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [data, setData] = useState({
    username: '',
    password: '',
    newUsername: '',
    newPassword: '',
    newPassword2: '',
    logInError: '',
    signUpError: '',
    loading: false,
  })

  const {
    username,
    password,
    newUsername,
    newPassword,
    newPassword2,
    logInError,
    signUpError,
    loading,
  } = data

  const EMPTY_FIELD_ERROR = 'All fields are required'
  const PASSWORD_MISMATCH_ERROR = 'Passwords must match'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setData({ ...data, logInError: '', loading: true })

    // verify login credentials
    if (!username || !password) {
      setData({ ...data, logInError: EMPTY_FIELD_ERROR })
    }

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        `${username}@planet.io`,
        password,
      )
      await updateDoc(doc(db, 'users', result.user.uid), {
        isOnline: true,
      })
      setData({
        username: '',
        password: '',
        newUsername: '',
        newPassword: '',
        newPassword2: '',
        logInError: '',
        signUpError: '',
        loading: false,
      })
    } catch (err) {
      setData({
        ...data,
        logInError: err instanceof Error ? err.message : 'Unexpected error',
        loading: false,
      })
    }
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setData({ ...data, signUpError: '', loading: true })

    if (!newUsername || !newPassword || !newPassword2) {
      setData({ ...data, signUpError: EMPTY_FIELD_ERROR })
    } else if (newPassword !== newPassword2) {
      setData({ ...data, signUpError: PASSWORD_MISMATCH_ERROR })
    } else {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          `${newUsername}@planet.io`,
          newPassword,
        )
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          username: newUsername,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
        })
        setData({
          username: '',
          password: '',
          newUsername: '',
          newPassword: '',
          newPassword2: '',
          logInError: '',
          signUpError: '',
          loading: false,
        })
        setShowModal(false)
      } catch (err) {
        setData({
          ...data,
          signUpError: err instanceof Error ? err.message : 'Unexpected error',
          loading: false,
        })
      }
      //setShowModal(false)
    }
  }

  return (
    <div>
      <div
        className={`${
          showModal ? 'opacity-20' : ''
        } flex flex-col h-screen items-center bg-gray-100 pt-8 md:flex-row md:justify-around lg:justify-evenly`}
      >
        <div className="flex flex-col items-center md:items-start md:pb-20">
          <img
            className="h-28 md:-ml-8 md:-mb-2"
            //src="/logo.svg"
            src="/planet-rough-logo.png"
            placeholder="LOGO"
          />
          <div className="mt-6 leading-tight text-2xl text-center w-96 mb-10 lg:text-3xl lg:w-[27rem]">
            Join your friends around the planet.
          </div>
        </div>
        <form
          onSubmit={handleLogIn}
          className="flex flex-col rounded-md items-center justify-center gap-4 bg-white shadow-2xl p-5 w-96 md:mb-10"
        >
          <input
            disabled={showModal || loading}
            className={`${
              logInError && !username ? 'border-red-500' : ''
            } w-full border p-3 rounded-md`}
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <div
            className={`${
              logInError && !password ? 'border-red-500 ' : ''
            } border focus-within:border-black focus-within:border-2 w-full flex justify-center items-center rounded-md`}
          >
            <input
              disabled={showModal || loading}
              className="w-full focus:outline-none p-3"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={handleChange}
            />
            <EyeOffIcon
              onClick={() => {
                if (!showModal) setShowPassword(!showPassword)
              }}
              className={`${
                showModal ? '' : 'cursor-pointer'
              } h-6 pr-3  stroke-2 text-gray-400 `}
            />
          </div>

          <p className="text-center w-full">{logInError ? logInError : ''}</p>

          <button
            disabled={showModal || loading}
            type="submit"
            className="bg-planet-300 border-planet-300 text-white w-full p-2 pl-4 pr-4 rounded-md border-2 enabled:hover:bg-planet-400 enabled:hover:border-planet-400 font-bold text-lg"
          >
            Log In
          </button>

          <div className="m-4 w-full border-t"></div>

          <button
            disabled={showModal || loading}
            onClick={(e) => {
              e.preventDefault()
              setData({ ...data, signUpError: '' })
              setShowModal(true)
            }}
            className="bg-green-500 border-green-500 p-3 pl-4 pr-4 rounded-lg border-2 enabled:hover:bg-green-600 enabled:hover:border-green-600 font-bold  text-white mb-3"
          >
            Create new account
          </button>
        </form>
      </div>
      <div
        className={`${
          showModal ? '' : 'hidden'
        } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col rounded-md items-center justify-center  bg-white shadow-2xl`}
      >
        <div className="self-start space-y-1 p-5 pb-0 pt-3 relative w-full">
          <h1 className="font-bold  text-3xl">Sign Up</h1>
          <XIcon
            onClick={() => setShowModal(false)}
            className="h-6 stroke-1 cursor-pointer absolute right-3 top-3"
          />
          <h2 className=" text-gray-400">It’s quick and easy.</h2>
        </div>

        <div className="m-4 w-full border-t"></div>

        <form
          onSubmit={handleSignUp}
          className="flex flex-col p-5 pt-1 w-96 gap-4 justify-center align-middle"
        >
          <input
            disabled={loading}
            className={`${
              signUpError && !newUsername ? 'border-red-500' : ''
            } w-full border p-3 rounded-md`}
            placeholder="Username"
            name="newUsername"
            value={newUsername}
            onChange={handleChange}
          />
          <input
            disabled={loading}
            className={`${
              signUpError == PASSWORD_MISMATCH_ERROR ||
              (signUpError && !newPassword)
                ? 'border-red-500'
                : ''
            } w-full border p-3 rounded-md`}
            placeholder="Password"
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
          />
          <input
            disabled={loading}
            className={`${
              signUpError == PASSWORD_MISMATCH_ERROR ||
              (signUpError && !newPassword2)
                ? 'border-red-500'
                : ''
            } w-full border p-3 rounded-md`}
            placeholder="Confirm Your Password"
            type="password"
            name="newPassword2"
            value={newPassword2}
            onChange={handleChange}
          />

          <p className="text-center w-full">{signUpError ? signUpError : ''}</p>

          <button
            disabled={loading}
            className="bg-green-500 border-green-500 rounded-lg  hover:bg-green-600 hover:border-green-600 font-bold p-2 mx-auto w-1/2  text-white mb-3"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default LandingPage
