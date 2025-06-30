<template>
  <v-navigation-drawer>
    <!-- Top Avatar Section -->
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmailcom"
        title="Sandra Adams"
      />
    </v-list>

    <v-divider />

    <!-- Navigation Items -->
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles" />
      <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared" />
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" />
    </v-list>

    <!-- Push everything above up -->
    <v-spacer />
    <v-divider />

    <!-- Logout Button at Bottom -->
    <v-list>
      <v-list-item prepend-icon="mdi-logout" title="Logout" @click="logout" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
function logout() {
  // Your logout logic here
  localStorage.clear();
  // router.push("/login");
  window.location.reload();
}
</script>
