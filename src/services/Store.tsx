import { create } from "zustand";

interface IUser {
  user:any;
  setUser: (user: any) => void;
  clearUser: () => void;
}

const useUserStore = create<IUser>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
