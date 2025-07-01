<template>
  <v-container class="pa-4" max-width="50%">
    <v-card variant="outlined">
      <v-card-title class="text-h5 justify-center" style="font-weight: bold; color: #4caf50">
        🎉 Secret grade calculator unlocked! 🎉
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="score"
          label="Enter score (0-100)"
          type="number"
          :rules="scoreRules"
          clearable
          @input="validateScore"
          variant="outlined"
          dense
        ></v-text-field>

        <v-alert
          v-if="error"
          type="error"
          dense
          class="mt-2"
          border="left"
          colored-border
          elevation="2"
        >
          {{ error }}
        </v-alert>

        <v-alert
          v-else-if="score !== null && score !== ''"
          type="success"
          dense
          class="mt-2"
          border="left"
          colored-border
          elevation="2"
        >
          Grade: <strong>{{ grade }}</strong>
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";

const score = ref(null);
const error = ref("");

const scoreRules = [
  (v) => (v === null || v === "" ? true : !isNaN(v) || "Must be a number"),
  (v) =>
    v === null || v === "" ? true : (v >= 0 && v <= 100) || "Score must be between 0 and 100",
];

function validateScore() {
  if (score.value === null || score.value === "") {
    error.value = "";
    return;
  }
  if (isNaN(score.value)) {
    error.value = "Please enter a valid number.";
  } else if (score.value < 0 || score.value > 100) {
    error.value = "Score must be between 0 and 100.";
  } else {
    error.value = "";
  }
}

const grade = computed(() => {
  if (error.value || score.value === null || score.value === "") return "";

  const s = Number(score.value);
  if (s >= 80) return "A";
  if (s >= 70) return "B";
  if (s >= 60) return "C";
  if (s >= 50) return "D";
  return "F";
});
</script>
