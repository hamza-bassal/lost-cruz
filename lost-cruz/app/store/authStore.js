import {create} from "zustand";

const useAuthStore = create((set) => ({
    user:typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user-info")) : null,
    login:(user) => set({user}),
    logout:() => statusbar({user:null}),
    setUser: (user) => set({user})
}))

export default useAuthStore;