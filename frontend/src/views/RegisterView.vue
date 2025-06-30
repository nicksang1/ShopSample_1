<template>
  <v-container class="d-flex justify-center">
    <v-card class="pa-4 border glass" width="500" hover>
      <div class="text-center mb-4">
        <i class="bi bi-person-plus" style="font-size: 80px"></i>
        <div class="text-h6 mt-2">Register New Account</div>
      </div>

      <v-card-text>
        <v-form @submit.prevent="handleRegister">
          <v-text-field v-model="form.username" label="Username" required variant="outlined" />
          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            required
            variant="outlined"
          />
          <v-text-field v-model="form.firstName" label="First Name" required variant="outlined" />
          <v-text-field v-model="form.lastName" label="Last Name" required variant="outlined" />
          <v-row dense>
            <v-col cols="6">
              <v-text-field
                v-model="form.age"
                label="Age"
                type="number"
                :rules="[(v) => v >= 1 || 'Age must be 1 or greater']"
                required
                variant="outlined"
              />
            </v-col>

            <v-col cols="6">
              <v-combobox
                v-model="form.gender"
                label="Gender"
                :items="['Male', 'Female', 'Other']"
                required
                variant="outlined"
              />
            </v-col>
          </v-row>
          <v-switch
            v-model="form.role"
            :label="`Role: ${form.role}`"
            false-value="user"
            true-value="admin"
            hide-details
            color="green"
            required
            variant="outlined"
          />
          <!-- Default role is user -->
          <v-alert v-if="error" type="error" class="mt-3" dense>
            {{ error }}
          </v-alert>
          <v-row class="mt-4" dense>
            <v-col cols="6">
              <v-btn to="/login" prepend-icon="bi bi-chevron-left" variant="outlined" block
                >Back to Login</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn type="submit" append-icon="bi bi-person-plus" variant="outlined" color="primary" block>Register</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createUser } from "@/api/user";

const router = useRouter();
const form = ref({
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  age: null,
  gender: "",
  role: "user", // always default to user
});

const error = ref("");

const handleRegister = async () => {
  error.value = "";
  try {
    const payload = {
      ...form.value,
      age: Number(form.value.age),
    };
    await createUser(payload);
    router.push("/login");
  } catch (err) {
    error.value = err?.response?.data?.message || "Registration failed. Please try again.";
  }
};
</script>
