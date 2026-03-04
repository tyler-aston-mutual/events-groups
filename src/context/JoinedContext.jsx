import { createContext, useContext, useState, useCallback } from 'react'

const INITIAL_JOINED = new Set([3, 4, 5])

const JoinedContext = createContext(null)

export function JoinedProvider({ children }) {
  const [joinedIds, setJoinedIds] = useState(INITIAL_JOINED)
  const [newlyJoinedId, setNewlyJoinedId] = useState(null)

  const addJoinedId = useCallback((id) => {
    setJoinedIds(prev => new Set([...prev, id]))
    setNewlyJoinedId(id)
  }, [])

  const isJoined = useCallback((id) => joinedIds.has(id), [joinedIds])

  const clearNewlyJoined = useCallback(() => setNewlyJoinedId(null), [])

  return (
    <JoinedContext.Provider value={{
      joinedIds, addJoinedId, isJoined, newlyJoinedId, clearNewlyJoined,
    }}>
      {children}
    </JoinedContext.Provider>
  )
}

export function useJoined() {
  const ctx = useContext(JoinedContext)
  if (!ctx) throw new Error('useJoined must be used within <JoinedProvider>')
  return ctx
}
