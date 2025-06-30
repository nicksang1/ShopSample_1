<template>
  <v-container class="py-10" max-width="600px">
    <v-card>
      <template v-if="!selected">
        <h1 class="text-h4 mb-6 text-center">Admin Menu</h1>
        <v-row justify="center" align="center" dense>
          <v-col cols="12" sm="6">
            <v-card class="pa-4 text-center" hover @click="selected = 'user'">
              <v-icon size="48" class="mb-2">bi bi-person</v-icon>
              <div class="text-h6">User Management</div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card class="pa-4 text-center" hover @click="selected = 'product'">
              <v-icon size="48" class="mb-2">bi bi-box2</v-icon>
              <div class="text-h6">Product Management</div>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <!-- Show CRUD page -->
      <template v-else>
        <v-btn
          @click="selected = null"
          prepend-icon="bi bi-arrow-left"
          class="mb-4"
          variant="outlined"
        >
        </v-btn>
        <CrudTableUI :type="selected" />
      </template>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import CrudTableUI from "@/components/CrudTableUI.vue";

const selected = ref(null);
</script>
