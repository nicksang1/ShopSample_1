<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center">
    <v-icon icon="mdi-shield-lock" color="red" size="100" class="mb-4" />

    <h1 class="text-h3 font-weight-bold mb-2">Access Denied</h1>
    <p class="text-body-1 mb-6">
      You do not have permission to view this page.<br />
      Please contact your administrator if you believe this is a mistake.
    </p>

    <v-btn prepend-icon="bi bi-arrow-left" size="large" @click="goHome" class="rounded-pill px-6">
      Back to Home
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
  router.push({ name: "home" });
}
</script>

<style scoped>
h1 {
  color: #d32f2f;
}

v-container {
  background: radial-gradient(circle, #f8f8f8, #e0e0e0);
}
</style>
