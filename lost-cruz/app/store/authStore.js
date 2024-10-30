import {create} from "zustand";

const useAuthStore = create((set) => ({
    user:typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user-info")) : null,
    login:(user) => set({user}),
    logout:() => set({user:null}), // changed statusbar to set
    setUser: (user) => set({user})
}))

export default useAuthStore;