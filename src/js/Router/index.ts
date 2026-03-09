import { createRouter, createWebHistory } from "vue-router";
import Home from "@/js/Pages/Home.vue";
import WeightBattle from "@/js/Pages/WeightBattle.vue";
import Search from "../Pages/Search.vue";

const routes = [
  {
    path: "/",
    name: "home_page",
    component: Home,
  },
  {
    path: "/weight-battle",
    name: "weight_battle_page",
    component: WeightBattle,
  },
  {
    path: "/search",
    name: "search_page",
    component: Search,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
