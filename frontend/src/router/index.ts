import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode"; // <-- import jwt-decode // its has no default export
import HomeView from "../views/HomeView.vue";
import LoginPage from "../views/LoginPage.vue";
import { useAuthStore } from "@/stores/auth";
import OrderView from "@/views/OrderView.vue";
import CrudTableUI from "@/components/CrudTableUI.vue";
import RegisterView from "@/views/RegisterView.vue";
import GradeCalcView from "@/views/GradeCalcView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", name: "login", component: LoginPage },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      // meta: { requiresAuth: true },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
      meta: { requiresAuth: true },
    },
    // Catch-all route to redirect unmatched paths to the home page
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
    {
      path: "/checkout",
      name: "checkout",
      meta: { requiresAuth: true },
      component: () => import("../views/CheckoutView.vue"),
    },
    { path: "/order", name: "order", meta: { requiresAuth: true }, component: OrderView },
    {
      path: "/manage",
      name: "manage",
      meta: { requiresAuth: true, requiresAdmin: true },
      component: () => import("../views/ManageView.vue"),
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: () => import("../views/UnauthorizedView.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
    },
    { path: "/grade", name: "grade", component: GradeCalcView },
  ],
});

// Auto-login guard using Pinia store
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  // Load token from localStorage if needed (once per app boot)
  if (!auth.token) {
    auth.loadToken();
  }

  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (to.name === "login" && auth.isAuthenticated) {
    // console.log(auth.user);
    return next("/home");
  }

  if (requiresAuth) {
    // console.log(auth.user);
    if (!auth.token) {
      // Not authenticated
      return next("/login");
    }

    try {
      const currentTime = Math.floor(Date.now() / 1000);
      const decoded = jwtDecode(auth.token);
      // console.log(auth.token);
      if (decoded.exp && decoded.exp < currentTime) {
        auth.logout();
        return next("/login");
      }
      // Check for admin access if required
      if (requiresAdmin && !auth.isAdmin) {
        return next("/unauthorized"); // or show an "unauthorized" page
      }

      // Token valid
      return next();
    } catch (e) {
      auth.logout(); // Handle corrupted token
      return next("/login");
    }
  }

  return next();
});

export default router;
