<template>
  <v-container class="pa-4" max-width="1000px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Orders List</span>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="orders"
        :loading="loading"
        class="elevation-1"
        dense
        hover
      >
        <template #item="{ item }">
          <tr @click="viewOrder(item)" style="cursor: pointer">
            <td>{{ item._id }}</td>
            <td>{{ item.buyer_name }}</td>
            <td>฿{{ item.total_price.toLocaleString() }}</td>
            <td>{{ item.items.length }} item{{ item.items.length > 1 ? "s" : "" }}</td>
            <td>{{ formatDate(item.createdAt) }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title> Order Details </v-card-title>

        <v-card-text v-if="selectedOrder">
          <p><strong>Order ID:</strong> {{ selectedOrder._id }}</p>
          <p><strong>Customer:</strong> {{ selectedOrder.buyer_name }}</p>
          <p><strong>Total Price:</strong> ฿{{ selectedOrder.total_price.toLocaleString() }}</p>

          <p><strong>Items:</strong> {{ selectedOrder.items.length }}</p>
          <v-divider class="my-2" />
          <ul>
            <li v-for="(item, index) in selectedOrder.items" :key="index">
              <p><strong>Product Name:</strong> {{ item.product_name }}</p>
              <p><strong>Quantity:</strong> {{ item.quantity }}</p>
              <p><strong>Price:</strong> ฿{{ item.price.toLocaleString() }}</p>
              <!-- <v-divider class="my-2" /> -->
            </li>
          </ul>
          <v-divider class="my-2" />
          <p><strong>Date:</strong> {{ formatDate(selectedOrder.createdAt) }}</p>
        </v-card-text>

        <v-card-actions>
          <v-btn text @click="dialog = false" color="red">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
// import { useRouter } from "vue-router";
import { getOrders } from "@/api/order";

// Dialog State
const dialog = ref(false);
const selectedOrder = ref(null);

// Router Incase of page change
// const router = useRouter();
const orders = ref([]);
// Loading State
const loading = ref(false);

const headers = [
  { text: "Order ID", value: "_id" },
  { text: "Customer Name", value: "buyer_name" },
  { text: "Total Price", value: "total_price" },
  { text: "Items", value: "items" },
  { text: "Date", value: "createdAt" },
];

onMounted(async () => {
  loading.value = true;
  try {
    const raw = await getOrders();
    orders.value = raw;
  } catch (err) {
    console.error("Error loading orders:", err);
  } finally {
    loading.value = false;
  }
});

const viewOrder = (order) => {
  selectedOrder.value = order;
  dialog.value = true;
};

const formatDate = (iso) => new Date(iso).toLocaleString();
</script>
