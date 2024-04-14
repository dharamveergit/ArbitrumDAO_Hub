import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface IStore {
  token: any;
  token2: any;
  setToken: (token: string) => void;
  setToken2: (token: string) => void;
}

export const useStorage = create<IStore>()(
  devtools(
    persist(
      (set) => ({
        token: {
          time: 0,
        },
        setToken: (token) => set({ token }),
        token2: {
          time: 0,
        },
        setToken2: (token2) => set({ token2 }),
      }),
      {
        name: "arbitrum-hub",
        getStorage: () => localStorage,
      },
    ),
  ),
);
