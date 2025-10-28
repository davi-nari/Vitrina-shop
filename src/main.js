import { createApp } from "vue";
import "@/assets/style/main.scss";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import { createPinia } from "pinia";
import router from "@/router";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(autoAnimatePlugin);
app.use(router);
app.mount("#app");
