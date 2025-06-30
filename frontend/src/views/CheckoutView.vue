<script setup>
import { ref } from "vue";
import { cart } from "@/stores/cart";
import { createOrder } from "@/api/order";
import { useAuthStore } from "@/stores/auth"; // Import user store

const user = useAuthStore();
// console.log(user.user.firstname)

const shipping = ref({
  name: `${user.user.firstname} ${user.user.lastname}`,
  address: "",
  city: "",
  zip: "",
});

const dialogMessage = ref("");
const showDialog = ref(false);


const placeOrder = async () => {
  if (!shipping.value.name) {
    dialogMessage.value = "Please enter your name before placing an order.";
    showDialog.value = true;
    return;
  }

  if (cart.items.length === 0) {
    dialogMessage.value = "Your cart is empty.";
    showDialog.value = true;
    return;
  }

  const payload = {
    buyer_name: shipping.value.name,
    buyer_id: user.user.id,
    items: cart.items.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    })),
  };

  try {
    const result = await createOrder(payload);
    dialogMessage.value = "Order placed!\n\n" + JSON.stringify(result, null, 2);
    showDialog.value = true;

    // Clear cart and form
    cart.items.length = 0;
    shipping.value = {
      name: "",
      address: "",
      city: "",
      zip: "",
    };
  } catch (err) {
    dialogMessage.value = "Failed to place order.";
    showDialog.value = true;
    console.error(err);
  }
};
</script>

<template>
  <v-container class="py-10">
    <v-row>
      <!-- Cart Items -->
      <v-col cols="12" md="8">
        <template v-if="cart.items.length > 0">
          <v-card class="mb-4" variant="outlined" v-for="(item, index) in cart.items" :key="index">
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-subtitle>
              Price: ฿{{ item.price.toFixed(2) }} × {{ item.quantity }} = ฿{{
                (item.price * item.quantity).toFixed(2)
              }}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn icon size="small" @click="cart.decreaseQty(item.id)">
                <v-icon>bi bi-dash-circle</v-icon>
              </v-btn>
              <v-btn icon size="small" @click="cart.increaseQty(item.id)">
                <v-icon>bi bi-plus-circle</v-icon>
              </v-btn>
              <v-spacer />
              <v-btn icon color="red" size="small" @click="cart.removeItem(item.id)">
                <v-icon>bi bi-trash</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
        <template v-else>
          <div class="text-center">
            <v-img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No items"
              max-width="200"
              class="mx-auto"
              style="filter: grayscale(100%); margin-top: 0%; opacity: 50%; user-select: none"
            />
            <p class="mt-2">No items in your cart</p>
          </div>
        </template>
      </v-col>

      <!-- Summary & Form -->
      <v-col cols="12" md="4">
        <v-card class="mb-4" variant="outlined">
          <v-card-title>Order Summary</v-card-title>
          <v-card-text>
            <p>Subtotal: ฿{{ cart.subtotal.toFixed(2) }}</p>
            <p>Tax (7%): ฿{{ cart.tax.toFixed(2) }}</p>
            <p>
              <strong>Total: ฿{{ cart.total.toFixed(2) }}</strong>
            </p>
          </v-card-text>
        </v-card>

        <v-card class="mb-4" variant="outlined">
          <v-card-title>Shipping Info</v-card-title>
          <v-card-text>
            <v-text-field v-model="shipping.name" label="Name" variant="outlined" />
            <v-text-field v-model="shipping.address" label="Address" variant="outlined" />
            <v-text-field v-model="shipping.city" label="City" variant="outlined" />
            <v-text-field v-model="shipping.zip" label="ZIP Code" variant="outlined" />
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" @click="placeOrder">Place Order</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Show dialog -->
    <v-dialog v-model="showDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Notification</v-card-title>
        <v-card-text>
          <pre style="white-space: pre-wrap">{{ dialogMessage }}</pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
