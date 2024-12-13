import { create } from "zustand";

interface IUser {
  user: any;
  clear_user: any;
  set_user: any;
}

export const useUserStore = create<IUser>((set, get) => ({
  user: null,
  set_user: (new_user: any) => {
    set({
      user: new_user,
    });
  },
  clear_user: () => {
    set({ user: null });
  },
}));
