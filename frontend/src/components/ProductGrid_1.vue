<template>
  <v-container>
    <h1 class="text-h4 mb-6">Our Products</h1>

    <v-row dense>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="h-100" hover>
          <v-img :src="product.image" height="200px" cover></v-img>

          <v-card-title>{{ product.name }}</v-card-title>

          <v-card-subtitle class="text-green"> {{ product.price }}฿ </v-card-subtitle>

          <v-card-text>{{ product.description }}</v-card-text>
          <v-card-text>In Stock: {{ product.stock }}</v-card-text>

          <v-card-actions>
            <!-- <v-btn color="primary" variant="flat">View</v-btn> -->
            <v-spacer></v-spacer>
            <v-btn icon @click="cart.addToCart(product)">
              <v-icon>bi bi-cart-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getProducts } from "@/api/product.js";
import { cart } from "@/stores/cart.js";

const products = ref([]);

onMounted(async () => {
  const raw = await getProducts();

  products.value = raw.map((item, index) => ({
    id: item._id,
    name: item.product_name,
    price: item.price,
    stock: item.quantity,
    description: item.description || "No description",
    image: `https://picsum.photos/300/200?random=${index + 1}`,
  }));
});
</script>
