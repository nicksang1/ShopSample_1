<script setup>
import { ref, computed, watch } from "vue";
import { getProducts, createProduct, deleteProduct, updateProduct } from "@/api/product";
import { getUsers, createUser, deleteUser, updateUser } from "@/api/user";

const props = defineProps({ type: String });
const title = computed(() => (props.type === "user" ? "User" : "Product"));

const headers = computed(() => {
  if (props.type === "user") {
    return [
      { title: "First Name", key: "firstName" },
      { title: "Last Name", key: "lastName" },
      { title: "Age", key: "age" },
      { title: "Actions", key: "actions", sortable: false },
    ];
  } else {
    return [
      { title: "Product Name", key: "product_name" },
      { title: "Price", key: "price" },
      { title: "Quantity", key: "quantity" },
      { title: "Actions", key: "actions", sortable: false },
    ];
  }
});

const items = ref([]);
const dialog = ref(false);
const editedItem = ref({});

watch(
  () => props.type,
  () => {
    fetchItems();
  },
  { immediate: true }
);

async function fetchItems() {
  if (props.type === "user") {
    const users = await getUsers();
    items.value = users.map((u) => ({
      _id: u._id?.$oid || u._id, // Support both formats
      firstName: u.firstName,
      lastName: u.lastName,
      age: u.age,
    }));
  } else {
    const products = await getProducts();
    items.value = products.map((p) => ({
      _id: p._id?.$oid || p._id, // String or ObjectId here prevent undefined
      product_name: p.product_name,
      price: p.price,
      quantity: p.quantity,
    }));
  }
}

function openDialog(item = null) {
  if (item) {
    editedItem.value = { ...item };
  } else {
    editedItem.value =
      props.type === "user"
        ? { firstName: "", lastName: "", age: null }
        : { product_name: "", price: null, quantity: null };
  }
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
  editedItem.value = {};
}

async function saveItem() {
  // console.log(editedItem.value._id);
  try {
    if (props.type === "product") {
      const payload = {
        product_name: editedItem.value.product_name,
        price: Number(editedItem.value.price),
        quantity: Number(editedItem.value.quantity),
      };

      if (editedItem.value._id) {
        // console.log(editedItem.value);
        // Update existing product
        await updateProduct(editedItem.value._id, payload);
      } else {
        // Create new product
        await createProduct(payload);
      }
    } else {
      // console.warn("User save not implemented yet");
      const payload = {
        username: editedItem.value.username,
        password: editedItem.value.password,
        firstName: editedItem.value.firstName,
        lastName: editedItem.value.lastName,
        age: Number(editedItem.value.age),
        gender: editedItem.value.gender,
      };
      if (editedItem.value._id) {
        await updateUser(editedItem.value._id, payload);
      } else {
        await createUser(payload);
      }
    }

    await fetchItems();
    closeDialog();
  } catch (err) {
    console.error("Save failed", err);
  }
}

async function deleteItem(id) {
  if (props.type === "product")
    // console.log(id);
    try {
      await deleteProduct(id); // call the backend API
      items.value = items.value.filter((i) => i._id !== id); // update frontend list
      console.log("Deleted item with ID:", id);
    } catch (error) {
      console.error("Error deleting item:", error);
      // optionally show a UI error message here
    }
  else {
    try {
      await deleteUser(id); // call the backend API
      items.value = items.value.filter((i) => i._id !== id); // update frontend list
      console.log("Deleted item with ID:", id);
    } catch (error) {
      console.error("Error deleting item:", error);
      // optionally show a UI error message here
    }
  }
}
</script>

<template>
  <v-container class="pa-4" max-width="900">
    <v-card>
      <v-card-title>
        {{ title }} Management
        <v-spacer />
        <v-btn @click="openDialog()" icon>
          <v-icon>
            {{ type === "user" ? "bi bi-person-add" : "bi bi-database-add" }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-data-table :headers="headers" :items="items" item-value="_id" class="elevation-1">
        <template #item.actions="{ item }">
          <v-btn icon variant="text" @click="openDialog(item)">
            <v-icon>bi bi-pencil</v-icon>
          </v-btn>
          <v-btn icon variant="text" @click="deleteItem(item._id)">
            <v-icon color="red">bi bi-trash</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h6"> {{ editedItem._id ? "Edit" : "Add" }} {{ title }} </span>
        </v-card-title>

        <v-card-text>
          <!-- User Fields -->
          <template v-if="type === 'user'">
            <v-text-field v-model="editedItem.username" label="Username" required />
            <v-text-field v-model="editedItem.password" label="Password" required />
            <v-text-field v-model="editedItem.firstName" label="First Name" required />
            <v-text-field v-model="editedItem.lastName" label="Last Name" required />
            <v-text-field v-model="editedItem.age" label="Age" type="number" required />
            <v-text-field v-model="editedItem.gender" label="Gender" required />
          </template>

          <!-- Product Fields -->
          <template v-else>
            <v-text-field v-model="editedItem.product_name" label="Product Name" required />
            <v-text-field v-model="editedItem.price" label="Price" type="number" required />
            <v-text-field v-model="editedItem.quantity" label="Quantity" type="number" required />
          </template>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog()">Cancel</v-btn>
          <v-btn color="primary" @click="saveItem()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
