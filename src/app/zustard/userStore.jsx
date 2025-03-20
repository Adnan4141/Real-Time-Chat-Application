import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set) => ({
  user: null,
  addUserInfo: ({data,token}) => {
    localStorage.setItem("token",token)
   set({ user: data, token });
  },
  removeUserInfo: () => {
    localStorage.removeItem("token")
    set({ user: null });
    useUserStore.persist.clearStorage();
  },
});


const useUserStore = create(
    devtools(
      persist(userStore,{
         name:"userInfo",
         getStorage: () => localStorage,
      })
    )
)



export default useUserStore;