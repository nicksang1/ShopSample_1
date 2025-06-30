import "./assets/main.css";

import vuetify from "./plugins/MyVuetify";
// import vuetify from './plugins/vuetify' // can't use this conflict with normal one

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);

app.use(createPinia());

const auth = useAuthStore();
auth.loadToken();

app.use(router);
app.use(vuetify);

app.mount("#app");
