// stores/auth.ts
import { defineStore } from "pinia";
import { decodeToken, type JwtPayload } from "@/composables/useJwt";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null as string | null,
    user: null as JwtPayload | null,
  }),
  actions: {
    loadToken() {
      const stored = localStorage.getItem("token");
      if (stored) {
        const payload = decodeToken(stored);
        const now = Math.floor(Date.now() / 1000);

        if (payload?.exp && payload?.exp > now) {
          this.token = stored;
          this.user = payload;
        } else {
          this.logout(); // clear token if expired
        }
      }
    },
    setToken(newToken: string) {
      this.token = newToken;
      this.user = decodeToken(newToken);
      localStorage.setItem("token", newToken);
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "admin",
  },
});
