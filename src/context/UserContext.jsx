import { createContext, useContext, useState, useMemo } from 'react'
import axios from 'axios'

const BASE_URL = 'https://mock-backend-hintro.vercel.app'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('u1')

  const client = useMemo(() => axios.create({
    baseURL: BASE_URL,
    headers: { 'x-user-id': userId }
  }), [userId])

  return (
    <UserContext.Provider value={{ userId, setUserId, client }}>
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext)
