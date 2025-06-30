<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import AppFooter from "./components/AppFooter.vue";
// import NavDrawer from "./components/NavDrawer.vue";
import AppBar from "./components/AppBar.vue";
import { useAuthStore } from "./stores/auth";
// import HelloWorld from "./components/HelloWorld.vue";

// Init auth store
const auth = useAuthStore();

onMounted(() => {
  auth.loadToken();
});
</script>

<template>
  <v-app>
    <AppBar />

    <v-main>
      <!-- Optional: NavDrawer here -->

      <router-view v-slot="{ Component }">
        <v-slide-x-transition mode="out-in">
          <component :is="Component" />
        </v-slide-x-transition>
      </router-view>
    </v-main>

    <AppFooter app class="app-footer" />
  </v-app>
</template>

<style scoped>
.router-content {
  display: flex;
  flex-direction: column;
}

.nav-drawer {
  z-index: 1;
}

.app-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.v-application {
  background-color: transparent !important;
}
</style>
