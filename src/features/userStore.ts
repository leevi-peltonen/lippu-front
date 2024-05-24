import { create } from 'zustand'

interface UserState {
    userId: string
    setUserId: (userId: string) => void
}

const useUserStore = create<UserState>()((set) => ({
    userId: '',
    setUserId: (userId: string) => set({ userId }),
}))

export default useUserStore