import { createContext, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { auth } from '../firebase/firebase'
import { onAuthStateChanged } from '@firebase/auth'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
  }, [])
  if (loading) return <Loading />

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export { AuthContext }

export default AuthProvider
