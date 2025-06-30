<!-- components/OrderDialog.vue -->
<template>
  <v-dialog v-model="modelValue" max-width="600">
    <v-card>
      <v-card-title>
        Order Details
        <v-spacer />
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text v-if="order">
        <p><strong>Order ID:</strong> {{ order._id }}</p>
        <p><strong>Customer:</strong> {{ order.buyer_name }}</p>
        <p><strong>Total Price:</strong> ฿{{ order.total_price.toLocaleString() }}</p>
        <p>
          <strong>Items:</strong> {{ order.items.length }} item{{
            order.items.length > 1 ? "s" : ""
          }}
        </p>
        <ul>
          <li v-for="(item, index) in order.items" :key="index">
            {{ item.name }} — Quantity: {{ item.quantity }}
          </li>
        </ul>
        <p><strong>Date:</strong> {{ formatDate(order.createdAt) }}</p>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: Boolean,
  order: Object,
});
const emit = defineEmits(["update:modelValue"]);

const close = () => {
  emit("update:modelValue", false);
};

const formatDate = (iso) => new Date(iso).toLocaleString();
</script>
