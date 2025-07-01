<template>
  <v-app-bar app :title="isAdmin ? 'Vite App Admin Mode' : 'My Vite App'">
    <v-spacer />

    <div
      v-if="isAuthenticated"
      class="position-absolute"
      style="left: 50%; transform: translateX(-50%); width: 100%; padding-inline: 30%"
    >
      <v-text-field
        variant="outlined"
        dense
        hide-details
        placeholder="Search..."
        prepend-inner-icon="bi bi-search"
      />
    </div>
    <v-btn
      v-if="isAuthenticated"
      variant="text"
      icon="bi bi-box-seam"
      style="white-space: nowrap"
      @click="onBoxBtnClick"
      hover
    >
    </v-btn>
    <!-- Always show avatar button -->
    <v-menu v-if="isAuthenticated" offset-y close-on-content-click transition="scale-transition">
      <template #activator="{ props }">
        <v-btn text v-bind="props" aria-label="User menu" class="d-flex align-center">
          <span class="mr-2">{{ auth.user?.username }}</span>
          <v-avatar size="32">
            <template v-if="!imageError">
              <v-img :src="imageUrl" alt="Profile Picture" cover @error="imageError = true" />
            </template>
            <template v-else>
              <v-icon size="32">bi bi-question-circle</v-icon>
            </template>
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <!-- <v-list-item link @click="onProfileClick">
          <v-list-item-title>
            <v-icon start>bi bi-pencil-square</v-icon>
            Profile
          </v-list-item-title>
        </v-list-item> -->

        <!-- Manage (Admin only) -->
        <v-list-item v-if="isAdmin" link @click="onManageClick">
          <v-list-item-title>
            <v-icon start>bi bi-gear</v-icon>
            Manage
          </v-list-item-title>
        </v-list-item>

        <!-- Logout -->
        <v-list-item link @click="onLogoutClick">
          <v-list-item-title>
            <v-icon start>bi bi-box-arrow-right</v-icon>
            Logout
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- If not authenticated, clicking avatar redirects to login -->
    <v-btn v-else text @click="goToLogin" aria-label="Login" class="d-flex align-center">
      <span class="mr-2">Login</span>
      <!-- replace "test" with "Login" or what you want -->
      <v-avatar size="32">
        <i class="bi bi-person-circle" style="font-size: 32px"></i>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { watch, computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();
const isAuthenticated = computed(() => auth.isAuthenticated);
const isAdmin = computed(() => auth.isAdmin);

const imageError = ref(false);

// Create a reactive version number to bust the cache when user changes
const imageVersion = ref(Date.now());

const imageUrl = computed(() => {
  return `http://localhost:3000/uploads/profiles/${auth.user?.username}.jpg?v=${imageVersion.value}`;
});

// Watch the username to reset image error and update the cache buster
watch(
  () => auth.user?.username,
  (newUsername, oldUsername) => {
    if (newUsername !== oldUsername) {
      imageError.value = false; // Reset error state for new image
      imageVersion.value = Date.now(); // Update version to force reload
    }
  }
);

// console.log(auth.user);

onMounted(() => {
  auth.loadToken();
});

function onProfileClick() {
  router.push({ name: "profile" }); // Adjust route name as needed
}

function onManageClick() {
  router.push({ name: "manage" }); // Adjust route name as needed
}

function onLogoutClick() {
  auth.logout();
  router.push({ name: "login" });
}

function goToLogin() {
  router.push({ name: "login" }); // Adjust route name as needed
}

function onBoxBtnClick() {
  router.push({ name: "order" }); // Adjust route name as needed
}
</script>
