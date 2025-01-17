import { create } from 'zustand'

type User = {
  id: string
  name: string
  roles: string[]
}

interface AuthStore {
  user: User | null
  login: () => void
  logout: () => void
}

const authStore = create<AuthStore>((set) => ({
  user: null,
  login: () =>
    set({
      user: { id: '1', name: 'Lekan Okeowo', roles: ['admin'] }
    }),
  logout: () => set({ user: null })
}))

export default authStore
