import { create } from "zustand";
import axios from "axios";
const useAuthStore = create((set) => ({
  email: "",
  password: "",
  user: {},
  loggedIn: false,

  setter: (keys, value) => {
    set({ [keys]: value });
  },

  login: async () => {
    try {
      const email = useAuthStore.getState().email;
      const password = useAuthStore.getState().password;
      const loggedIn = useAuthStore.getState().loggedIn;
      const res = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      set({ loggedIn: true });
      console.log(res);
    } catch (err) {
      console.log("login Error:", err.message);
    }
  },
  checkAuth: async () => {
    try {
      await axios.get("/check-auth", { withCredentials: true });
      set({ loggedIn: true });
    } catch (e) {
      set({ loggedIn: false });
    }
  },
}));

export default useAuthStore;
