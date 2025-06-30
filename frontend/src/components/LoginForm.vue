<template>
  <v-container class="d-flex justify-center">
    <v-card class="pa-4 border" width="400" hover>
      <!-- <v-card-title>Login</v-card-title> -->
      <div class="text-center">
        <i class="bi bi-shield-lock" style="font-size: 100px"></i>
      </div>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            prepend-inner-icon="bi bi-person"
            v-model="username"
            label="Username"
            type="text"
            required
            variant="outlined"
          ></v-text-field>

          <v-text-field
            prepend-inner-icon="bi bi-lock"
            v-model="password"
            label="Password"
            type="password"
            required
            variant="outlined"
          ></v-text-field>

          <v-row class="mt-4" dense>
            <v-col cols="6">
              <v-btn to="/register" append-icon="bi bi-person-plus" variant="outlined" block
                >Register</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn
                type="submit"
                append-icon="bi bi-box-arrow-in-right"
                variant="outlined"
                color="primary"
                block
                >Login</v-btn
              >
            </v-col>
          </v-row>
          <v-alert v-if="error" type="error" class="mt-3" dense>
            {{ error }}
          </v-alert>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuthStore } from "@/stores/auth";
import { login } from "@/api/auth";

const username = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

// Import the auth store
const auth = useAuthStore();

const handleLogin = async () => {
  // console.log(username.value, password.value);
  error.value = "";
  try {
    const data = await login(username.value, password.value);
    // console.log(data.success, data.token);
    if (data.success && data.token) {
      auth.setToken(data.token);
      router.push("/home");
    } else {
      error.value = data.message || "Invalid username or password.";
    }
  } catch (err) {
    error.value = err?.response?.data?.message || "An error occurred.";
  }
};
</script>
