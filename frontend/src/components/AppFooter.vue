<template>
  <v-footer
    class="d-flex align-center justify-center flex-wrap py-0"
    color="transparent"
    rounded="large"
  >
    <v-col cols="auto">
      <v-btn
        class="overflow-btn"
        icon="bi bi-house"
        variant="elevated"
        @click="$router.push('/home')"
      />
    </v-col>
    <v-col cols="auto">
      <v-btn
        class="overflow-btn"
        icon="bi bi-person-vcard"
        variant="elevated"
        @click="$router.push('/about')"
      />
    </v-col>
    <v-col cols="auto" style="position: relative">
      <v-btn
        class="overflow-btn"
        icon="bi bi-cart"
        variant="elevated"
        @click="$router.push('/checkout')"
      />

      <div
        v-if="notificationCount > 0"
        style="
          position: absolute;
          top: -40%;
          left: 51%;
          transform: translate(-50%);
          background-color: red;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 12px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          user-select: none;
          z-index: 10;
        "
      >
        {{ notificationCount }}
      </div>
    </v-col>

    <div class="flex-1-0-100 text-end mt-2">
      {{ new Date().getFullYear() }} — <strong>V 0.0.3</strong>
    </div>
  </v-footer>
</template>

<script setup>
import { computed } from "vue";
import { cart } from "@/stores/cart";
const notificationCount = computed(() => cart.itemCount);
</script>

<style scoped>
.overflow-btn {
  margin-top: -50px;
  z-index: 1;
  position: relative;

  width: 75px;
  height: 75px;

  font-size: 25px;
}
</style>
