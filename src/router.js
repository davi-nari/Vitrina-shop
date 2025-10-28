import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: Home,
      path: "/",
      name: "Home",
    },
    {
      component: () => import("@/views/Admin.vue"),
      path: "/admin",
      name: "Admin",
      redirect: { name: "admin-orders" },
      children: [
        {
          path: "orders",
          name: "admin-orders",
          component: () => import("@/components/Admin/Orders.vue"),
        },
        {
          path: "catalog",
          name: "admin-catalog",
          component: () => import("@/components/Admin/AdmCatalog.vue"),
        },
      ],
    },
  ],
});

export default router;
